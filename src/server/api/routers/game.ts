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

    create: protectedProcedure
        .input(
            z.object({
                wpm: z.number(),
                mode: z.string(),
                userId: z.string(),
                keebId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (
                ctx.session.user.hasProfile &&
                ctx.session.user.id === input.userId
            ) {
                const newGame = await ctx.prisma.game.create({
                    data: input,
                });

                return newGame;
            }

            throw new Error("Invalid userId");
        }),
});
