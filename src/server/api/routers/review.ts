import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    getAllEligibleByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const reviewsForBuyers = await ctx.db.listingTransaction.findMany({
                where: {
                    buyerId: userId,
                    reviews: {
                        none: {
                            userId: userId,
                        },
                    },
                },
                select: {
                    id: true,
                    listing: {
                        select: {
                            title: true,
                        },
                    },
                    updatedAt: true,
                    seller: {
                        select: {
                            id: true,
                            username: true,
                            profile: true,
                        },
                    },
                },
            });

            const reviewsForSellers = await ctx.db.listingTransaction.findMany({
                where: {
                    sellerId: userId,
                    reviews: {
                        none: {
                            userId: userId,
                        },
                    },
                },
                select: {
                    id: true,
                    listing: {
                        select: {
                            title: true,
                        },
                    },
                    updatedAt: true,
                    buyer: {
                        select: {
                            id: true,
                            username: true,
                            profile: true,
                        },
                    },
                },
            });
            return { reviewsForSellers, reviewsForBuyers };
        }),

    getAllReceivedAndSentByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const receivedReviews = await ctx.db.review.findMany({
                where: { recipientId: userId },
                include: {
                    user: {
                        select: { username: true, profile: true },
                    },
                },
            });
            const myReviews = await ctx.db.review.findMany({
                where: { userId: userId },
                include: {
                    recipient: {
                        select: { username: true, profile: true },
                    },
                },
            });

            return { receivedReviews, myReviews };
        }),
    getAllSentByUserId: publicProcedure
        .input(z.string())
        .query(({ input: userId, ctx }) => {
            return ctx.db.review.findMany({
                where: { userId: userId },
                include: {
                    recipient: {
                        select: { username: true, profile: true },
                    },
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                transactionId: z.string(),
                text: z.string(),
                starRating: z.number(),
                userId: z.string(),
                recipientId: z.string(),
                type: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                text,
                starRating,
                userId,
                recipientId,
                transactionId,
                type,
            } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            const transactionCheck = await ctx.db.listingTransaction.findFirst({
                where: {
                    id: transactionId,
                    reviews: {
                        none: {
                            userId: userId,
                        },
                    },
                },
            });
            if (!transactionCheck) {
                throw new Error("Review already exists for this transaction");
            }

            await ctx.db.review.create({
                data: {
                    transactionId: transactionId,
                    userId: userId,
                    text: text,
                    recipientId: recipientId,
                    starRating: starRating,
                    type: type,
                },
            });

            await ctx.db.notification.create({
                data: {
                    userId: recipientId,
                    text: `You received a review!`,
                    type: "REVIEW",
                    status: "UNREAD",
                },
            });

            // todo tag unlocks
            // review below 5 stars give the recipient the unlock - wet pancakes
            // then notify  about new tags new tag ... unlocked!
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                text: z.string(),
                starRating: z.number(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, text, starRating, userId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            return await ctx.db.review.update({
                where: {
                    id: id,
                },
                data: {
                    text: text,
                    starRating: starRating,
                },
            });
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            const { id, userId } = input;
            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            await ctx.db.review.delete({ where: { id: id } });

            return "Successfully deleted";
        }),
});

// getAllReceivedByUserId: publicProcedure
//     .input(z.string())
//     .query(({ input: userId, ctx }) => {
//         return ctx.prisma.review.findMany({
//             where: { sellerId: userId },
//             include: {
//                 user: {
//                     select: { username: true, profile: true },
//                 },
//             },
//         });
//     }),
