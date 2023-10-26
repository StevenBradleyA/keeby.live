import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const keebRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.keeb.findMany();
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const createKeeb = await ctx.prisma.keeb.create({
                    data: input,
                });

                return { createKeeb };
            }
            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedKeeb = await ctx.prisma.keeb.update({
                    where: { id: input.id },
                    data: input,
                });

                return updatedKeeb;
            }
            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.keeb.delete({
                    where: { id: input.id },
                });
                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
