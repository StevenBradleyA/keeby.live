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
            })
        )
        .query(async ({ ctx, input }) => {
            const { typeId, userId, type } = input;

            if (type === "listing") {
                const allComments = await ctx.prisma.comment.findMany({
                    where: {
                        listingId: typeId,
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
                });
                if (userId) {
                    const userLikes = await ctx.prisma.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id
                        ),
                    }));

                    return commentsWithLikes;
                }

                return allComments;
            } else if (type === "post") {
                const allComments = await ctx.prisma.comment.findMany({
                    where: {
                        postId: typeId,
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
                });
                if (userId) {
                    const userLikes = await ctx.prisma.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id
                        ),
                    }));

                    return commentsWithLikes;
                }

                return allComments;
            }
        }),
    getAllReplysByTypeId: publicProcedure
        .input(
            z.object({
                typeId: z.string(),
                type: z.string(),
                userId: z.string().optional(),
                parentId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { typeId, type, userId, parentId } = input;

            if (type === "listing") {
                const allComments = await ctx.prisma.comment.findMany({
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
                    const userLikes = await ctx.prisma.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id
                        ),
                    }));

                    return commentsWithLikes;
                }

                return allComments;
            } else if (type === "post") {
                const allComments = await ctx.prisma.comment.findMany({
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
                    const userLikes = await ctx.prisma.commentLike.findMany({
                        where: {
                            userId: userId,
                        },
                        select: { commentId: true },
                    });

                    const commentsWithLikes = allComments.map((comment) => ({
                        ...comment,
                        isLiked: userLikes.some(
                            (like) => like.commentId === comment.id
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, userId, typeId, type } = input;

            if (ctx.session.user.id === input.userId) {
                if (type === "listing") {
                    const newComment = await ctx.prisma.comment.create({
                        data: {
                            text: text,
                            userId: userId,
                            listingId: typeId,
                        },
                    });
                    return newComment;
                }
                if (type === "post") {
                    const newComment = await ctx.prisma.comment.create({
                        data: {
                            text: text,
                            userId: userId,
                            postId: typeId,
                        },
                    });
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { text, userId, type, typeId, parentId, referencedUser } =
                input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }

            // parentID validation --- (ensure it refers to an existing comment)
            // if (parentId) {
            //     const exists = await ctx.prisma.comment.findUnique({
            //         where: { id: parentId },
            //         select: { id: true },
            //     });
            //     if (!exists) {
            //         throw new Error("Invalid parentId");
            //     }
            // }

            if (type === "listing") {
                const newComment = await ctx.prisma.comment.create({
                    data: {
                        text: text,
                        userId: userId,
                        listingId: typeId,
                        parentId: parentId,
                        referencedUser: referencedUser || null,
                    },
                });

                return newComment;
            }

            if (type === "post") {
                const newComment = await ctx.prisma.comment.create({
                    data: {
                        text: text,
                        userId: userId,
                        postId: typeId,
                        parentId: parentId,
                        referencedUser: referencedUser || null,
                    },
                });

                return newComment;
            }
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedComment = await ctx.prisma.comment.update({
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, parentId, userId } = input;
            if (ctx.session.user.id === userId || ctx.session.user.isAdmin) {
                // Top-level comment
                if (!parentId) {
                    // ---- get all replies
                    // const replies = await ctx.prisma.comment.findMany({
                    //     where: { parentId: id },
                    //     select: { id: true },
                    // });

                    // const replyIds = replies.map((reply) => reply.id);

                    // --- Delete all likes associated with the replies
                    // await ctx.prisma.commentLike.deleteMany({
                    //     where: { commentId: { in: replyIds } },
                    // });

                    // --- Delete all likes associated with the top-level comment
                    // await ctx.prisma.commentLike.deleteMany({
                    //     where: { commentId: id },
                    // });

                    // -- Delete all replies
                    await ctx.prisma.comment.deleteMany({
                        where: { parentId: id },
                    });

                    // - Finally, delete the top-level comment itself
                    return ctx.prisma.comment.delete({ where: { id: id } });
                } else {
                    // Not a top-level comment, delete its likes and then the comment itself
                    // await ctx.prisma.commentLike.deleteMany({
                    //     where: { commentId: id },
                    // });

                    return ctx.prisma.comment.delete({ where: { id: id } });
                }
            }

            throw new Error("Invalid userId");
        }),

    // prisma transaction test. this makes it so that if the operation partially fails it wont go through. Definetly want to implement this for images and lots of stuff if it works
    // delete: protectedProcedure
    //     .input(
    //         z.object({
    //             id: z.string(),
    //             userId: z.string(),
    //             parentId: z.string().optional(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         const { id, parentId, userId } = input;

    //         if (ctx.session.user.id !== userId) {
    //             throw new Error("Invalid userId");
    //         }

    //         // Wrap your operations in a transaction
    //         return ctx.prisma.$transaction(async (prisma) => {
    //             if (!parentId) {
    //                 // Top-level comment

    //                 // Get all replies
    //                 const replies = await prisma.comment.findMany({
    //                     where: { parentId: id },
    //                     select: { id: true },
    //                 });

    //                 const replyIds = replies.map((reply) => reply.id);

    //                 // Delete all likes associated with the replies
    //                 await prisma.like.deleteMany({
    //                     where: { type: "COMMENT", typeId: { in: replyIds } },
    //                 });

    //                 // Delete all likes associated with the top-level comment
    //                 await prisma.like.deleteMany({
    //                     where: { type: "COMMENT", typeId: id },
    //                 });

    //                 // Delete all replies
    //                 await prisma.comment.deleteMany({
    //                     where: { parentId: id },
    //                 });

    //                 // Delete the top-level comment itself
    //                 return prisma.comment.delete({ where: { id: id } });
    //             } else {
    //                 // Not a top-level comment, delete its likes and then the comment itself
    //                 await prisma.like.deleteMany({
    //                     where: { type: "COMMENT", typeId: id },
    //                 });

    //                 return prisma.comment.delete({ where: { id: id } });
    //             }
    //         });
    //     }),
});
