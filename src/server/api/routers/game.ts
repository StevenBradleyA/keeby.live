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
            })
        )
        .query(({ input, ctx }) => {
            const { id } = input;

            return ctx.prisma.game.findUnique({
                where: { id: id },
            });

            // want to display last game info
            // also want to display all user previous games... rank etc...
            // total games played for speed mode... 

            // keeb info 
            // 
            // user info
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
