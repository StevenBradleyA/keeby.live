import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import type { Game } from "@prisma/client";

type GameResult = Game & {
    keeb: {
        id: string;
        name: string;
        keycaps: string;
        switches: string;
    } | null;
    user: {
        rank: {
            name: string;
            image: string;
            minWpm: number;
            maxWpm: number;
            standing: number;
        } | null;
    };
};

type GameStatistics = {
    id: string;
    wpm: number;
    accuracy: number;
};

type GameResultsResponse = {
    gameResults: GameResult | null;
    allGameResults: GameStatistics[];
    averageWpm: number;
    averageAccuracy: number;
};

export const gameRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.game.findMany();
    }),
    getByKeebId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.db.game.findMany({
            where: { keebId: input },
        });
    }),

    getGameResults: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                mode: z.string(),
                keebId: z.string(),
            }),
        )
        .query(async ({ input, ctx }): Promise<GameResultsResponse> => {
            const { id, userId, mode, keebId } = input;

            const gameResults = await ctx.db.game.findUnique({
                where: { id: id },
                include: {
                    keeb: {
                        select: {
                            id: true,
                            name: true,
                            keycaps: true,
                            switches: true,
                        },
                    },
                    user: {
                        select: {
                            rank: {
                                select: {
                                    name: true,
                                    image: true,
                                    minWpm: true,
                                    maxWpm: true,
                                    standing: true,
                                },
                            },
                        },
                    },
                },
            });

            const allGameResults = await ctx.db.game.findMany({
                where: {
                    userId: userId,
                    mode: mode,
                    keebId: keebId,
                },
                select: {
                    id: true,
                    wpm: true,
                    accuracy: true,
                },
            });

            const totalGamesPlayed = allGameResults.length;

            let averageWpm = 0;
            let averageAccuracy = 0;

            if (totalGamesPlayed > 0) {
                averageWpm =
                    allGameResults.reduce((acc, game) => acc + game.wpm, 0) /
                    totalGamesPlayed;
                averageAccuracy =
                    allGameResults.reduce(
                        (acc, game) => acc + game.accuracy,
                        0,
                    ) / totalGamesPlayed;
            }

            return { gameResults, allGameResults, averageWpm, averageAccuracy };
        }),

    // todo add fun tags like hitting sub 1 wpm or something speedy speed boi or speed demon
    // todo 300 wpm no accuracy or something -- storm trooper aim -- eurobeat intensifies idkkk

    create: protectedProcedure
        .input(
            z.object({
                wpm: z.number(),
                pureWpm: z.number(),
                accuracy: z.number(),
                mode: z.string(),
                userId: z.string(),
                keebId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { wpm, pureWpm, accuracy, mode, userId, keebId } = input;
            let validKeebId = keebId;
            let rankChange = false;

            if (
                !ctx.session.user.hasProfile ||
                ctx.session.user.id !== userId
            ) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            const keebCheck = await ctx.db.keeb.findFirst({
                where: {
                    id: keebId,
                },
            });

            if (!keebCheck) {
                const newKeeb = await ctx.db.keeb.findFirst({
                    where: {
                        userId: userId,
                    },
                });

                if (newKeeb) {
                    validKeebId = newKeeb.id;
                } else {
                    // Handle the case where the user has no valid keebs
                    throw new Error("No valid keyboard found for this user.");
                }
            }

            const createData = {
                wpm,
                pureWpm,
                accuracy,
                mode,
                userId,
                keebId: validKeebId,
            };

            const newGame = await ctx.db.game.create({
                data: createData,
            });

            const player = await ctx.db.user.findUnique({
                where: { id: userId },
                select: {
                    rank: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                    _count: {
                        select: {
                            games: true,
                        },
                    },
                },
            });
            if (!player) {
                throw new Error("User ID not found");
            }

            if (player && (player.rank === null || player._count.games < 10)) {
                const unranked = await ctx.db.rank.findUnique({
                    where: {
                        name: "Unranked",
                    },
                    select: {
                        id: true,
                    },
                });

                if (unranked) {
                    await ctx.db.user.update({
                        where: { id: userId },
                        data: { rankId: unranked.id },
                    });
                }
            }

            if (player && player._count.games >= 10) {
                const topGames = await ctx.db.game.findMany({
                    where: {
                        userId: userId,
                        mode: "speed",
                    },
                    orderBy: {
                        wpm: "desc",
                    },
                    take: 10,
                });
                let averageWpm = 0;

                if (topGames.length > 0) {
                    averageWpm =
                        topGames.reduce((acc, game) => acc + game.wpm, 0) /
                        topGames.length;
                } else {
                    // Handle the case where there are no games (optional)
                    throw new Error("No games found for the user.");
                }

                if (isNaN(averageWpm)) {
                    throw new Error(
                        "Average WPM calculation resulted in an invalid number.",
                    );
                }

                const ranks = await ctx.db.rank.findMany({
                    where: {
                        minWpm: {
                            lte: averageWpm,
                        },
                        maxWpm: {
                            gte: averageWpm,
                        },
                    },
                });

                // Assuming ranks are exclusive and the query returns exactly one rank
                if (ranks.length === 1 && ranks[0]) {
                    const userRankId = ranks[0].id;
                    const userRankName = ranks[0].name;

                    if (player.rank && player.rank.id !== userRankId) {
                        // Update user's rank
                        await ctx.db.user.update({
                            where: { id: userId },
                            data: { rankId: userRankId },
                        });

                        rankChange = true;

                        // find tag associated with rank
                        const existingRankTag = await ctx.db.tag.findUnique({
                            where: {
                                name: userRankName,
                            },
                        });
                        if (existingRankTag) {
                            // check if user owns tag...
                            const doesUserOwnTag = await ctx.db.user.findUnique(
                                {
                                    where: { id: userId },
                                    select: {
                                        tags: {
                                            where: {
                                                id: existingRankTag.id,
                                            },
                                            select: {
                                                id: true,
                                            },
                                        },
                                    },
                                },
                            );

                            if (
                                doesUserOwnTag &&
                                doesUserOwnTag.tags.length === 0
                            ) {
                                // If the user does not already have this tag, associate the tag with the user
                                await ctx.db.user.update({
                                    where: { id: userId },
                                    data: {
                                        tags: {
                                            connect: {
                                                id: existingRankTag.id,
                                            },
                                        },
                                    },
                                });

                                await ctx.db.notification.create({
                                    data: {
                                        userId: userId,
                                        text: `New tag unlocked!`,
                                        type: "TAG",
                                        status: "UNREAD",
                                    },
                                });
                            }
                        }
                    }

                    return {
                        gameId: newGame.id,
                        averageWpm: averageWpm,
                        rankChange: rankChange,
                    };
                }

                return { gameId: newGame.id, rankChange: rankChange };
            }
        }),
});
