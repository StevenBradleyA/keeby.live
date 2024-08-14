import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    getAllByTypeId: publicProcedure
        .input(
            z.object({
                type: z.string(),
                typeId: z.string(),
                userId: z.string().optional(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).nullish(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { typeId, userId, type, cursor } = input;

            const limit = input.limit ?? 20;

            const commentType =
                type === "listing" ? { listingId: typeId } : { postId: typeId };

            const comments = await ctx.db.comment.findMany({
                where: {
                    ...commentType,
                    parentId: null,
                },
                include: {
                    user: {
                        select: { id: true, username: true, profile: true },
                    },
                    _count: {
                        select: {
                            commentLike: true,
                            replies: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: limit + 1,
                skip: cursor ? 1 : 0,
                cursor: cursor ? { id: cursor } : undefined,
            });
            const popularComments = comments.sort(
                (a, b) =>
                    b._count.commentLike +
                    b._count.replies -
                    (a._count.commentLike + a._count.replies),
            );

            if (userId) {
                const userLikes = await ctx.db.commentLike.findMany({
                    where: {
                        userId: userId,
                    },
                    select: { commentId: true },
                    take: limit + 1,
                    skip: cursor ? 1 : 0,
                    cursor: cursor ? { id: cursor } : undefined,
                });

                const commentsWithLikes = popularComments.map((comment) => ({
                    ...comment,
                    isLiked: userLikes.some(
                        (like) => like.commentId === comment.id,
                    ),
                }));

                let nextCursor: typeof cursor | undefined = undefined;
                if (commentsWithLikes.length > limit) {
                    const nextItem = commentsWithLikes.pop();
                    if (nextItem !== undefined) {
                        nextCursor = nextItem.id;
                    }
                }

                return { comments: commentsWithLikes, nextCursor };
            }

            let nextCursor: typeof cursor | undefined = undefined;
            if (popularComments.length > limit) {
                const nextItem = popularComments.pop();
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id;
                }
            }
            return { comments: popularComments, nextCursor };
        }),
    getAllReplysByTypeId: publicProcedure
        .input(
            z.object({
                typeId: z.string(),
                type: z.string(),
                userId: z.string().optional(),
                parentId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { typeId, type, userId, parentId } = input;

            if (type === "listing") {
                const allComments = await ctx.db.comment.findMany({
                    where: {
                        listingId: typeId,
                        parentId: parentId,
                    },
                    include: {
                        user: {
                            select: { id: true, username: true, profile: true },
                        },
                        _count: {
                            select: {
                                commentLike: true,
                            },
                        },
                    },
                });
                if (userId) {
                    const userLikes = await ctx.db.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id,
                        ),
                    }));

                    return commentsWithLikes;
                }

                return allComments;
            } else if (type === "post") {
                const allComments = await ctx.db.comment.findMany({
                    where: {
                        postId: typeId,
                        parentId: parentId,
                    },
                    include: {
                        user: {
                            select: { id: true, username: true, profile: true },
                        },
                        _count: {
                            select: {
                                commentLike: true,
                            },
                        },
                    },
                });
                if (userId) {
                    const userLikes = await ctx.db.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id,
                        ),
                    }));

                    return commentsWithLikes;
                }

                return allComments;
            }
        }),
    createComment: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                userId: z.string(),
                typeId: z.string(),
                type: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { text, userId, typeId, type } = input;

            if (ctx.session.user.id === input.userId) {
                if (type === "listing") {
                    const newComment = await ctx.db.comment.create({
                        data: {
                            text: text,
                            userId: userId,
                            listingId: typeId,
                        },
                    });
                    const listingCheck = await ctx.db.listing.findUnique({
                        where: {
                            id: typeId,
                        },
                        select: {
                            title: true,
                            sellerId: true,
                        },
                    });
                    if (listingCheck) {
                        await ctx.db.notification.create({
                            data: {
                                userId: listingCheck.sellerId,
                                text: `New Comment on ${listingCheck.title}!`,
                                status: "UNREAD",
                                type: "LISTINGCOMMENT",
                                typeId: `${typeId}`,
                            },
                        });
                    }
                    return newComment;
                }
                if (type === "post") {
                    const newComment = await ctx.db.comment.create({
                        data: {
                            text: text,
                            userId: userId,
                            postId: typeId,
                        },
                    });

                    const postCheck = await ctx.db.post.findUnique({
                        where: {
                            id: typeId,
                        },
                        select: {
                            title: true,
                            userId: true,
                        },
                    });
                    if (postCheck) {
                        await ctx.db.notification.create({
                            data: {
                                userId: postCheck.userId,
                                text: `New Comment on ${postCheck.title}!`,
                                status: "UNREAD",
                                type: "POSTCOMMENT",
                                typeId: `${typeId}`,
                            },
                        });
                    }

                    return newComment;
                }
            }
            throw new Error("Invalid userId");
        }),

    createReply: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                userId: z.string(),
                type: z.string(),
                typeId: z.string(),
                parentId: z.string(),
                referencedUser: z.string().optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { text, userId, type, typeId, parentId, referencedUser } =
                input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            if (type === "listing") {
                const newComment = await ctx.db.comment.create({
                    data: {
                        text: text,
                        userId: userId,
                        listingId: typeId,
                        parentId: parentId,
                        referencedUser: referencedUser || null,
                    },
                });
                const listingCheck = await ctx.db.listing.findUnique({
                    where: {
                        id: typeId,
                    },
                    select: {
                        title: true,
                        sellerId: true,
                    },
                });
                if (listingCheck) {
                    await ctx.db.notification.create({
                        data: {
                            userId: listingCheck.sellerId,
                            text: `New Comment on ${listingCheck.title}!`,
                            status: "UNREAD",
                            type: "LISTINGCOMMENT",
                            typeId: `${typeId}`,
                        },
                    });
                }
                return newComment;
            }

            if (type === "post") {
                const newComment = await ctx.db.comment.create({
                    data: {
                        text: text,
                        userId: userId,
                        postId: typeId,
                        parentId: parentId,
                        referencedUser: referencedUser || null,
                    },
                });
                const postCheck = await ctx.db.post.findUnique({
                    where: {
                        id: typeId,
                    },
                    select: {
                        title: true,
                        userId: true,
                    },
                });
                if (postCheck) {
                    await ctx.db.notification.create({
                        data: {
                            userId: postCheck.userId,
                            text: `New Comment on ${postCheck.title}!`,
                            type: "POSTCOMMENT",
                            typeId: `${typeId}`,
                            status: "UNREAD",
                        },
                    });
                }
                return newComment;
            }
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedComment = await ctx.db.comment.update({
                    where: {
                        id: input.id,
                    },
                    data: { text: input.text },
                });

                return updatedComment;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                parentId: z.string().optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, parentId, userId } = input;
            if (
                !(userId === ctx.session?.user.id || ctx.session?.user.isAdmin)
            ) {
                throw new Error(
                    "You are not authorized to perform this action.",
                );
            }
            // Top-level comment
            if (!parentId) {
                await ctx.db.comment.deleteMany({
                    where: { parentId: id },
                });

                await ctx.db.comment.delete({ where: { id: id } });
                return {
                    success: true,
                    message: "Comments successfully deleted.",
                };
            } else {
                // Not a top-level comment
                await ctx.db.comment.delete({ where: { id: id } });
                return {
                    success: true,
                    message: "Comment successfully deleted.",
                };
            }
        }),
});
