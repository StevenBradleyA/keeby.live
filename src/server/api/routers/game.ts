import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const gameRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.game.findMany();
    }),
    getByKeebId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.db.game.findMany({
            where: { keebId: input },
        });
    }),

    getAllGames: publicProcedure
        .input(
            z.object({
                id: z.string().optional(),
                page: z.string().optional(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { id, page } = input;

            const limit = 12;
            const currentPage = parseInt(page || "1", 10);
            const cumulativeTake = currentPage * limit;

            const getLeaderboards = await ctx.db.game.findMany({
                include: {
                    user: {
                        select: {
                            username: true,
                        },
                    },
                },
                orderBy: {
                    wpm: "desc",
                },
                take: cumulativeTake,
            });

            if (id) {
                const userTopWpm = await ctx.db.game.findFirst({
                    where: { id: id },
                    orderBy: {
                        wpm: "desc",
                    },
                    select: {
                        wpm: true,
                    },
                });
                if (userTopWpm) {
                    const userRankNumber =
                        (await ctx.db.game.count({
                            where: {
                                wpm: {
                                    gt: userTopWpm.wpm,
                                },
                            },
                        })) + 1;
                    return {
                        getLeaderboards,
                        userRankNumber,
                    };
                }
            }

            return {
                getLeaderboards,
            };
        }),

    // todo add fun tags like hitting sub 1 wpm or something rankedy ranked boi or ranked demon
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
            let totalGamesPlayed = 0;
            let rankedAverageWpm = 0;
            let totalAverageWpm = 0;
            let totalAverageAccuracy = 0;

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

            // the game is created here...

            const gameResults = await ctx.db.game.findUnique({
                where: { id: newGame.id },
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
                                    id: true,
                                    name: true,
                                    image: true,
                                    minWpm: true,
                                    maxWpm: true,
                                    standing: true,
                                },
                            },
                            _count: {
                                select: {
                                    games: true,
                                },
                            },
                        },
                    },
                },
            });

            const aggregatedResults = await ctx.db.game.aggregate({
                where: {
                    userId: userId,
                    mode: mode,
                    keebId: keebId,
                },
                _avg: {
                    wpm: true,
                    accuracy: true,
                },
                _count: true,
            });

            totalGamesPlayed = aggregatedResults._count;
            totalAverageWpm = aggregatedResults._avg?.wpm || 0;
            totalAverageAccuracy = aggregatedResults._avg?.accuracy || 0;

            if (
                gameResults &&
                (gameResults.user.rank === null ||
                    gameResults.user._count.games < 10)
            ) {
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

            if (gameResults && gameResults.user._count.games >= 10) {
                const topGames = await ctx.db.game.findMany({
                    where: {
                        userId: userId,
                        mode: "ranked",
                    },
                    orderBy: {
                        wpm: "desc",
                    },
                    take: 10,
                });

                if (topGames.length > 0) {
                    rankedAverageWpm =
                        topGames.reduce((acc, game) => acc + game.wpm, 0) /
                        topGames.length;
                } else {
                    // Handle the case where there are no games (optional)
                    throw new Error("No games found for the user.");
                }

                if (isNaN(rankedAverageWpm)) {
                    throw new Error(
                        "Average ranked WPM calculation resulted in an invalid number.",
                    );
                }

                const ranks = await ctx.db.rank.findMany({
                    where: {
                        minWpm: {
                            lte: rankedAverageWpm,
                        },
                        maxWpm: {
                            gte: rankedAverageWpm,
                        },
                    },
                });

                if (ranks.length === 1 && ranks[0]) {
                    const userRankId = ranks[0].id;
                    const userRankName = ranks[0].name;

                    if (
                        gameResults.user.rank &&
                        gameResults.user.rank.id !== userRankId
                    ) {
                        // Update user's rank
                        await ctx.db.user.update({
                            where: { id: userId },
                            data: { rankId: userRankId },
                        });

                        rankChange = true;

                        // Update the rank in gameResults
                        gameResults.user.rank = {
                            id: userRankId,
                            name: userRankName,
                            image: ranks[0].image,
                            minWpm: ranks[0].minWpm,
                            maxWpm: ranks[0].maxWpm,
                            standing: ranks[0].standing,
                        };

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
                }

                return {
                    gameResults,
                    totalAverageWpm,
                    totalAverageAccuracy,
                    rankChange,
                    totalGamesPlayed,
                    rankedAverageWpm,
                };
            }
        }),
});
