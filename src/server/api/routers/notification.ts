import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: userId }) => {
            return await ctx.prisma.notification.findMany({
                where: {
                    userId: userId,
                },
            });
        }),

    update: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                status: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId, status } = input;

            if (ctx.session?.user.id !== userId) {
                throw new Error("Invalid credentials");
            }

            return await ctx.prisma.notification.update({
                where: {
                    id: id,
                },
                data: {
                    status: status,
                },
            });
        }),
});
