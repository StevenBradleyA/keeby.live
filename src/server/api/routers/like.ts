import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const commentLikeRouter = createTRPCRouter({
    getUserLikes: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(({ input, ctx }) => {
            return ctx.prisma.commentLike.findMany({
                where: {
                    userId: input.userId,
                },
                select: { commentId: true },
            });
        }),

    toggleLike: publicProcedure
        .input(
            z.object({
                commentId: z.string(),
                userId: z.string(),
                isLiked: z.boolean(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { commentId, userId, isLiked } = input;
            if (isLiked) {
                await ctx.prisma.commentLike.deleteMany({
                    where: { commentId: commentId, userId: userId },
                });
            } else {
                await ctx.prisma.commentLike.create({
                    data: {
                        userId: userId,
                        commentId: commentId,
                    },
                });
            }

            return { success: true };
        }),

    // getAmountByTypeId: publicProcedure
    //     .input(
    //         z.object({
    //             type: z.string(),
    //             typeId: z.string(),
    //         })
    //     )
    //     .query(({ ctx, input }) => {
    //         return ctx.prisma.like.count({
    //             where: { type: input.type, typeId: input.typeId },
    //         });
    //     }),
    // checkisLiked: publicProcedure
    //     .input(
    //         z.object({
    //             userId: z.string(),
    //             type: z.string(),
    //             typeId: z.string(),
    //         })
    //     )
    //     .query(async ({ ctx, input }) => {
    //         const like = await ctx.prisma.like.findFirst({
    //             where: {
    //                 userId: input.userId,
    //                 type: input.type,
    //                 typeId: input.typeId,
    //             },
    //             select: {
    //                 id: true,
    //             },
    //         });
    //         return like ? like.id : null;
    //     }),

    // create: protectedProcedure
    //     .input(
    //         z.object({
    //             userId: z.string(),
    //             type: z.string(),
    //             typeId: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         if (ctx.session.user.id === input.userId) {
    //             const createLike = await ctx.prisma.like.create({
    //                 data: input,
    //             });
    //             return createLike;
    //         }
    //         throw new Error("Invalid userId");
    //     }),
    // delete: protectedProcedure
    //     .input(
    //         z.object({
    //             id: z.string(),
    //             userId: z.string(),
    //             type: z.string(),
    //             typeId: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         if (ctx.session.user.id === input.userId) {
    //             await ctx.prisma.like.delete({ where: { id: input.id } });

    //             return "Successfully deleted";
    //         }

    //         throw new Error("Invalid userId");
    //     }),
});
