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
        return ctx.prisma.game.findMany();
    }),
    getByKeebId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.game.findMany({
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
            })
        )
        .query(async ({ input, ctx }): Promise<GameResultsResponse> => {
            const { id, userId, mode, keebId } = input;

            const gameResults = await ctx.prisma.game.findUnique({
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
                                },
                            },
                        },
                    },
                },
            });

            const allGameResults = await ctx.prisma.game.findMany({
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
                        0
                    ) / totalGamesPlayed;
            }

            return { gameResults, allGameResults, averageWpm, averageAccuracy };
        }),

    create: protectedProcedure
        .input(
            z.object({
                wpm: z.number(),
                pureWpm: z.number(),
                accuracy: z.number(),
                mode: z.string(),
                userId: z.string(),
                keebId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { wpm, pureWpm, accuracy, mode, userId, keebId } = input;
            if (
                ctx.session.user.hasProfile &&
                ctx.session.user.id === input.userId
            ) {
                const createData = {
                    wpm,
                    pureWpm,
                    accuracy,
                    mode,
                    userId,
                    keebId,
                };

                const newGame = await ctx.prisma.game.create({
                    data: createData,
                });

                const player = await ctx.prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        rank: {
                            select: {
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

                if (
                    player &&
                    (player.rank === null || player._count.games < 10)
                ) {
                    const unranked = await ctx.prisma.rank.findUnique({
                        where: {
                            name: "Unranked",
                        },
                        select: {
                            id: true,
                        },
                    });

                    if (unranked) {
                        await ctx.prisma.user.update({
                            where: { id: userId },
                            data: { rankId: unranked.id },
                        });
                    }
                }

                // check top 10 highest wpm games with mode speed ... (all ranked game modes)
                //  assign a rank based on the top average 10 wpm games
                if (player && player._count.games >= 10) {
                    const topGames = await ctx.prisma.game.findMany({
                        where: {
                            userId: userId,
                            mode: "speed", // change later for other ranked modes
                        },
                        orderBy: {
                            wpm: "desc",
                        },
                        take: 10,
                    });

                    const averageWpm =
                        topGames.reduce((acc, game) => acc + game.wpm, 0) /
                        topGames.length;

                    const ranks = await ctx.prisma.rank.findMany({
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

                        // Update user's rank
                        await ctx.prisma.user.update({
                            where: { id: userId },
                            data: { rankId: userRankId },
                        });
                    }

                    return {gameId: newGame.id, averageWpm: averageWpm }
                }
                // probably want to return a boolean if a user gets assigned a new rank or something so we can send a hot toast when they rank up!
                

                return {gameId: newGame.id};
            }

            throw new Error("Invalid userId");
        }),
});
