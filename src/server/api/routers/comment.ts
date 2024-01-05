import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const commentRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.comment.findMany();
    }),
    getAllByTypeId: publicProcedure
        .input(
            z.object({
                type: z.string(),
                typeId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.comment.findMany({
                where: { type: input.type, typeId: input.typeId },
                include: {
                    user: {
                        select: { id: true, username: true, profile: true },
                    },
                },
            });
        }),
    getAllWithReplies: publicProcedure
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
                    parentId: null, // Fetch only top-level comments
                },
                include: {
                    user: {
                        select: { id: true, username: true, profile: true },
                    },
                    replies: {
                        // Include replies
                        include: {
                            user: {
                                select: {
                                    id: true,
                                    username: true,
                                    profile: true,
                                },
                            },
                            // Optionally, include nested replies
                            replies: {
                                include: {
                                    user: {
                                        select: {
                                            id: true,
                                            username: true,
                                            profile: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
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
            // Check if the user creating the comment is the logged-in user
            if (ctx.session.user.id !== input.userId) {
                throw new Error("Invalid userId");
            }

            // Validate parentId if provided (ensure it refers to an existing comment)
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
            z.object({ id: z.string(), userId: z.string(), postId: z.string() })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.comment.delete({ where: { id: input.id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
