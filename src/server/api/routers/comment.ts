import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.comment.findMany();
    // }),
    getAllByTypeId: publicProcedure
        .input(
            z.object({
                type: z.string(),
                typeId: z.string(),
                userId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const allComments = await ctx.prisma.comment.findMany({
                where: {
                    type: input.type,
                    typeId: input.typeId,
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

            const userLikes = await ctx.prisma.commentLike.findMany({
                where: {
                    userId: input.userId,
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
        }),

    getAllByTypeIdForViewers: publicProcedure
        .input(
            z.object({
                type: z.string(),
                typeId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.comment.findMany({
                where: {
                    type: input.type,
                    typeId: input.typeId,
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
        }),
    //TODO  we are going to need different routes depending if a user is signed in chief
    // TODO refactor so replies are fetched when the button is clicked not all the time. we need to be efficient and poggers
    // getAllWithReplies: publicProcedure
    // .input(
    //     z.object({
    //         type: z.string(),
    //         typeId: z.string(),
    //     })
    // )
    // .query(({ ctx, input }) => {
    //     return ctx.prisma.comment.findMany({
    //         where: {
    //             type: input.type,
    //             typeId: input.typeId,
    //             parentId: null,
    //         },
    //         include: {
    //             user: {
    //                 select: { id: true, username: true, profile: true },
    //             },
    //             _count: {
    //                 select: {
    //                     commentLike: true,
    //                 },
    //             },
    //             isLikedByUser: {
    //                 select: {
    //                     id: true,
    //                     where: {
    //                         userId: input.userId,
    //                     },
    //                 },
    //             },
    //             replies: {
    //                 include: {
    //                     user: {
    //                         select: {
    //                             id: true,
    //                             username: true,
    //                             profile: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     });
    // }),

    // getAllWithReplies: publicProcedure
    // .input(
    //     z.object({
    //         type: z.string(),
    //         typeId: z.string(),
    //     })
    // )
    // .query(({ ctx, input }) => {
    //     return ctx.prisma.comment.findMany({
    //         where: {
    //             type: input.type,
    //             typeId: input.typeId,
    //             parentId: null,
    //         },
    //         include: {
    //             user: {
    //                 select: { id: true, username: true, profile: true },
    //             },
    //             replies: {
    //                 include: {
    //                     user: {
    //                         select: {
    //                             id: true,
    //                             username: true,
    //                             profile: true,
    //                         },
    //                     },
    //                 },
    //             },
    //         },
    //     });
    // }),
    getAmountByTypeId: publicProcedure
        .input(
            z.object({
                type: z.string(),
                typeId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.comment.count({
                where: { type: input.type, typeId: input.typeId },
            });
        }),
    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                userId: z.string(),
                type: z.string(),
                typeId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const newComment = await ctx.prisma.comment.create({
                    data: input,
                });
                return newComment;
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
            if (ctx.session.user.id !== input.userId) {
                throw new Error("Invalid userId");
            }

            // parentID validation --- (ensure it refers to an existing comment)
            if (input.parentId) {
                const parentComment = await ctx.prisma.comment.findUnique({
                    where: { id: input.parentId },
                });
                if (!parentComment) {
                    throw new Error("Invalid parentId");
                }
            }

            const newComment = await ctx.prisma.comment.create({
                data: {
                    text: input.text,
                    userId: input.userId,
                    type: input.type,
                    typeId: input.typeId,
                    parentId: input.parentId,
                    referencedUser: input.referencedUser || null,
                },
            });

            return newComment;
        }),
    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                text: z.string().optional(),
                userId: z.string(),
                postId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedComment = await ctx.prisma.comment.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
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
            if (ctx.session.user.id === userId) {
                // Top-level comment
                if (!parentId) {
                    // ---- get all replies
                    const replies = await ctx.prisma.comment.findMany({
                        where: { parentId: id },
                        select: { id: true },
                    });

                    const replyIds = replies.map((reply) => reply.id);

                    // --- Delete all likes associated with the replies
                    await ctx.prisma.like.deleteMany({
                        where: { type: "COMMENT", typeId: { in: replyIds } },
                    });

                    // --- Delete all likes associated with the top-level comment
                    await ctx.prisma.like.deleteMany({
                        where: { type: "COMMENT", typeId: id },
                    });

                    // -- Delete all replies
                    await ctx.prisma.comment.deleteMany({
                        where: { parentId: id },
                    });

                    // - Finally, delete the top-level comment itself
                    return ctx.prisma.comment.delete({ where: { id: id } });
                } else {
                    // Not a top-level comment, delete its likes and then the comment itself
                    await ctx.prisma.like.deleteMany({
                        where: { type: "COMMENT", typeId: id },
                    });

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
