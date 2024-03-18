import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

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
        .query(async ({ input, ctx }) => {
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

                return newGame.id;
            }

            throw new Error("Invalid userId");
        }),
});
