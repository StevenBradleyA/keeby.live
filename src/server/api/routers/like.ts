import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const likeRouter = createTRPCRouter({
    getUserCommentLikes: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(({ input, ctx }) => {
            return ctx.db.commentLike.findMany({
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
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { commentId, userId, isLiked, ownerId } = input;
            if (isLiked) {
                await ctx.db.commentLike.deleteMany({
                    where: { commentId: commentId, userId: userId },
                });
                await ctx.db.user.update({
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
                await ctx.db.commentLike.create({
                    data: {
                        userId: userId,
                        commentId: commentId,
                    },
                });
                await ctx.db.user.update({
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
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { postId, userId, ownerId } = input;

            if (
                !(userId === ctx.session?.user.id || ctx.session?.user.isAdmin)
            ) {
                throw new Error(
                    "You are not authorized to perform this action.",
                );
            }

            const existingLike = await ctx.db.postLike.findFirst({
                where: {
                    userId: userId,
                    postId: postId,
                },
            });

            if (existingLike) {
                throw new Error("You have already liked this post.");
            }

            await ctx.db.postLike.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });
            await ctx.db.user.update({
                where: {
                    id: ownerId,
                },
                data: {
                    internetPoints: {
                        increment: 1,
                    },
                },
            });

            return {
                success: true,
                message: "Post successfully liked.",
            };
        }),

    deletePostLike: publicProcedure
        .input(
            z.object({
                postId: z.string(),
                userId: z.string(),
                ownerId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { postId, userId, ownerId } = input;

            if (
                !(userId === ctx.session?.user.id || ctx.session?.user.isAdmin)
            ) {
                throw new Error(
                    "You are not authorized to perform this action.",
                );
            }

            const like = await ctx.db.postLike.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                },
                select: {
                    id: true,
                },
            });

            if (!like) {
                throw new Error("Like not found.");
            }

            await ctx.db.postLike.delete({
                where: {
                    id: like.id,
                },
            });

            await ctx.db.user.update({
                where: {
                    id: ownerId,
                },
                data: {
                    internetPoints: {
                        decrement: 1,
                    },
                },
            });

            return {
                success: true,
                message: "Like successfully removed.",
            };
        }),
});
