import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const notificationRouter = createTRPCRouter({
    getCountByUserId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: userId }) => {
            return await ctx.db.notification.count({
                where: {
                    userId: userId,
                },
            });
        }),

    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: userId }) => {
            return await ctx.db.notification.findMany({
                where: {
                    userId: userId,
                },
            });
        }),
    getOfferNotificationsByUserId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: userId }) => {
            return await ctx.db.notification.findFirst({
                where: {
                    userId: userId,
                    type: "OFFER",
                },
            });
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                status: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId, status } = input;

            if (ctx.session?.user.id !== userId) {
                throw new Error("Invalid credentials");
            }

            return await ctx.db.notification.update({
                where: {
                    id: id,
                },
                data: {
                    status: status,
                },
            });
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid credentials");
            }

            return await ctx.db.notification.delete({
                where: {
                    id: id,
                },
            });
        }),
});
