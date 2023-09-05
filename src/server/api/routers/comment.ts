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

    getByPostId: publicProcedure.input(z.string()).query(({ ctx, input }) => {
        return ctx.prisma.comment.findMany({
            where: { postId: input },
            include: {
                user: { select: { name: true } },
            },
        });
    }),

    create: protectedProcedure
        .input(
            z.object({
                text: z.string(),
                userId: z.string(),
                postId: z.string(),
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
