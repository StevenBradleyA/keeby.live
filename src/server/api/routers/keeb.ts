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
                return await ctx.prisma.keeb.create({ data: input });
            }
            throw new Error("Invalid userId");
        }),
});
