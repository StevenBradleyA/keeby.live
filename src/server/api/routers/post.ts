import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany();
    }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                text: z.string(),
                price: z.number(),
                stock: z.number(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const newPost = await ctx.prisma.post.create({ data: input });

                return newPost;
            }

            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                title: z.string().optional(),
                text: z.string().optional(),
                price: z.number().optional(),
                stock: z.number().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedPost = await ctx.prisma.post.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
                });

                return updatedPost;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.post.delete({ where: { id: input.id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
