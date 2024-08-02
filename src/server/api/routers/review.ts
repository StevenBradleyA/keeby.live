import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    getAllEligibleByUserId: publicProcedure
        .input(z.string())
        .query(({ input: userId, ctx }) => {
            return ctx.prisma.listing.findMany({
                where: {
                    buyerId: userId,
                    status: "SOLD",
                    reviews: {
                        none: {
                            userId: userId,
                        },
                    },
                },
                select: {
                    id: true,
                    title: true,

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
        }),

    getAllReceivedByUserId: publicProcedure
        .input(z.string())
        .query(({ input: userId, ctx }) => {
            return ctx.prisma.review.findMany({
                where: { sellerId: userId },
                include: {
                    user: {
                        select: { username: true, profile: true },
                    },
                },
            });
        }),
    getAllReceivedAndSentByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const receivedReviews = await ctx.db.review.findMany({
                where: { sellerId: userId },
                include: {
                    user: {
                        select: { username: true, profile: true },
                    },
                },
            });
            const sentReviews = await ctx.db.review.findMany({
                where: { userId: userId },
                include: {
                    seller: {
                        select: { username: true, profile: true },
                    },
                },
            });

            return { receivedReviews, sentReviews };
        }),
    getAllSentByUserId: publicProcedure
        .input(z.string())
        .query(({ input: userId, ctx }) => {
            return ctx.prisma.review.findMany({
                where: { userId: userId },
                include: {
                    seller: {
                        select: { username: true, profile: true },
                    },
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                starRating: z.number(),
                userId: z.string(),
                sellerId: z.string(),
                listingId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { text, starRating, userId, sellerId, listingId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            await ctx.db.review.create({
                data: {
                    text: text,
                    starRating: starRating,
                    sellerId: sellerId,
                    listingId: listingId,
                    userId: userId,
                },
            });
            await ctx.db.notification.create({
                data: {
                    userId: sellerId,
                    text: `You received a seller review!`,
                    type: "REVIEW",
                    status: "UNREAD",
                },
            });
            // todo create new tags maybe
            // review 5 stars - seller pro
            // review below - wet pancakes
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
