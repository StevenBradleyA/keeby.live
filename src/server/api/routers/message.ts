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
            return await ctx.prisma.message.findMany({
                where: {
                    OR: [{ buyerId: userId }, { sellerId: userId }],
                },
                include: {
                    buyer: {
                        select: {
                            username: true,
                            profile: true,
                        },
                    },
                    seller: {
                        select: {
                            username: true,
                            profile: true,
                        },
                    },
                    listingTransaction: {
                        select: {
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
            return await ctx.prisma.message.findMany({
                where: {
                    listingTransactionId: transactionId,
                },
                include: {
                    seller: {
                        select: {
                            username: true,
                            paypalEmail: true,
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
                    createdAt: "asc",
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                buyerId: z.string(),
                sellerId: z.string(),
                listingTransactionId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, buyerId, sellerId, listingTransactionId } = input;

            if (ctx.session.user.id !== (buyerId || sellerId)) {
                throw new Error("Invalid credentials");
            }
            const isBuyer = ctx.session.user.id === buyerId;
            const recipientId = isBuyer === true ? sellerId : buyerId;

            await ctx.prisma.message.create({
                data: {
                    text: text,
                    buyerId: buyerId,
                    sellerId: sellerId,
                    listingTransactionId: listingTransactionId,
                },
            });

            await ctx.prisma.notification.create({
                data: {
                    userId: recipientId,
                    text: `You received a new message!`,
                    type: "MESSAGE",
                    status: "UNREAD",
                },
            });
        }),
});
