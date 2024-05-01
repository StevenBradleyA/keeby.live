import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";


// todo decide if we want to remove internet increment if userId matches post id cuz spamming would be a thing 
// downside is we get spamming or a lot of db calls for abuse, also can promote your listing by just spamming... 
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
                ownerId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { commentId, userId, isLiked, ownerId } = input;
            if (isLiked) {
                await ctx.prisma.commentLike.deleteMany({
                    where: { commentId: commentId, userId: userId },
                });
                await ctx.prisma.user.update({
                    data: {
                        internetPoints: {
                            decrement: 1,
                        },
                    },
                    where: {
                        id: ownerId,
                    },
                });
            } else {
                await ctx.prisma.commentLike.create({
                    data: {
                        userId: userId,
                        commentId: commentId,
                    },
                });
                await ctx.prisma.user.update({
                    data: {
                        internetPoints: {
                            increment: 1,
                        },
                    },
                    where: {
                        id: ownerId,
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
                ownerId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { postId, userId, ownerId } = input;

            await ctx.prisma.postLike.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });
            await ctx.prisma.user.update({
                where: {
                    id: ownerId,
                },
                data: {
                    internetPoints: {
                        increment: 1,
                    },
                },
            });

            return { success: true };
        }),

    deletePostLike: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                ownerId: z.string(),
            })
        )
        .mutation(async ({ ctx, input }) => {
            const { id, userId, ownerId } = input;

            if (userId === ctx.session?.user.id || ctx.session?.user.isAdmin) {
                await ctx.prisma.postLike.delete({
                    where: {
                        id: id,
                    },
                });

                await ctx.prisma.user.update({
                    where: {
                        id: ownerId,
                    },
                    data: {
                        internetPoints: {
                            decrement: 1,
                        },
                    },
                });

                return { success: true };
            }
        }),
});
