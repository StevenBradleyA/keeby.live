import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
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

    createPostLike: publicProcedure
        .input(
            z.object({
                postId: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { postId, userId } = input;

            await ctx.prisma.postLike.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });

            return { success: true };
        }),

    deletePostLike: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, userId } = input;

            if (userId === ctx.session?.user.id || ctx.session?.user.isAdmin) {
                await ctx.prisma.postLike.delete({
                    where: {
                        id: id,
                    },
                });
                return { success: true };
            }
        }),
});
