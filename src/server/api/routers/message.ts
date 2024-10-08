import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const messageRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: userId }) => {
            return await ctx.db.message.findMany({
                where: {
                    OR: [{ userId: userId }, { recipientId: userId }],
                },
                include: {
                    user: {
                        select: {
                            username: true,
                            profile: true,
                        },
                    },
                    recipient: {
                        select: {
                            username: true,
                            profile: true,
                        },
                    },
                    listingTransaction: {
                        select: {
                            agreedPrice: true,
                            listing: {
                                select: {
                                    title: true,
                                },
                            },
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                distinct: ["listingTransactionId"],
            });
        }),

    getAllByTransactionId: publicProcedure
        .input(z.string())
        .query(async ({ ctx, input: transactionId }) => {
            return await ctx.db.message.findMany({
                where: {
                    listingTransactionId: transactionId,
                },
                include: {
                    user: {
                        select: { profile: true },
                    },
                },

                orderBy: {
                    createdAt: "asc",
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                recipientId: z.string(),
                userId: z.string(),
                listingTransactionId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { text, userId, recipientId, listingTransactionId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid credentials");
            }
            if (recipientId === userId) {
                throw new Error("Cannot send message to yourself");
            }

            await ctx.db.message.create({
                data: {
                    text: text,
                    userId: userId,
                    recipientId: recipientId,
                    listingTransactionId: listingTransactionId,
                },
            });

            await ctx.db.notification.create({
                data: {
                    userId: recipientId,
                    text: `You received a new message!`,
                    type: "MESSAGE",
                    status: "UNREAD",
                },
            });
        }),
});
