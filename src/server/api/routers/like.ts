import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const commentLikeRouter = createTRPCRouter({
    getUserCommentLikes: publicProcedure
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

    toggleCommentLike: publicProcedure
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

    togglePostLike: publicProcedure
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
});
