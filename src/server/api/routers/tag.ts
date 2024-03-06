import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";

export const tagRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.tag.findMany();
    }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.isAdmin) {
                return ctx.prisma.tag.create({
                    data: {
                        name: input.name,
                        description: input.description,
                    },
                });
            }

            throw new Error("You must be admin to perform this action.");
        }),

    // delete
});
