import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const reviewRouter = createTRPCRouter({
    getByPostId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.review.findMany({
            where: { listingId: input },
            include: {
                user: { select: { name: true } },
            },
        });
    }),

    getByUserId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.review.findMany({ where: { userId: input } });
    }),

    getAllEligibleByUserId: publicProcedure
        .input(z.string())
        .query(({ input: userId, ctx }) => {
            return ctx.prisma.listing.findMany({
                where: {
                    buyerId: userId,
                },
                select: {
                    id: true, 
                    title: true,
                    seller: {
                        select: {
                            id: true,
                            username: true,
                        },
                    },
                },
            });
        }),


    hasReviewed: publicProcedure
        .input(
            z.object({ listingId: z.string(), userId: z.string().optional() })
        )
        .query(({ input: { listingId, userId }, ctx }) => {
            if (!userId) return null;
            return ctx.prisma.review.findFirst({
                where: { listingId, userId },
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, starRating, userId, sellerId, listingId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            return await ctx.prisma.review.create({
                data: {
                    text: text,
                    starRating: starRating,
                    sellerId: sellerId,
                    listingId: listingId,
                    userId: userId,
                },
            });
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string(),
                starRating: z.number(),
                userId: z.string(),
                sellerId: z.string(),
                listingId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, text, starRating, userId, sellerId, listingId } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            return await ctx.prisma.review.update({
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
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.review.delete({ where: { id: input.id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
