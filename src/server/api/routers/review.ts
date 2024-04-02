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

    hasReviewed: publicProcedure
        .input(z.object({ listingId: z.string(), userId: z.string().optional() }))
        .query(({ input: { listingId, userId }, ctx }) => {
            if (!userId) return null;
            return ctx.prisma.review.findFirst({ where: { listingId, userId } });
        }),

    // create: protectedProcedure
    //     .input(
    //         z.object({
    //             text: z.string(),
    //             starRating: z.number(),
    //             userId: z.string(),
    //             listingId: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
        
    //         if (ctx.session.user.id === input.userId) {
    //             const newReview = await ctx.prisma.review.create({
    //                 data: input,
    //             });

    //             return newReview;
    //         }

    //         throw new Error("Invalid userId");
    //     }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                listingId: z.string(),
                text: z.string().optional(),
                starRating: z.number().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedReview = await ctx.prisma.review.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
                });

                return updatedReview;
            }

            throw new Error("Invalid userId");
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
