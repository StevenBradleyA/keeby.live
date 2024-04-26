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
                    receiverId: userId,
                },
                include: {
                    sender: {
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
                    sender: {
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
                senderId: z.string(),
                receiverId: z.string(),
                listingTransactionId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, senderId, receiverId, listingTransactionId } = input;

            if (ctx.session.user.id !== input.senderId) {
                throw new Error("Invalid credentials");
            }

            return await ctx.prisma.message.create({
                data: {
                    text: text,
                    senderId: senderId,
                    receiverId: receiverId,
                    listingTransactionId: listingTransactionId,
                },
            });
        }),
});
