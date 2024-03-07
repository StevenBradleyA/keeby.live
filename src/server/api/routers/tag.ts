import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

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

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                description: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.isAdmin) {
                return ctx.prisma.tag.update({
                    where: { id: input.id },
                    data: {
                        name: input.name,
                        description: input.description,
                    },
                });
            }

            throw new Error(
                "You do not have permission to perform this action"
            );
        }),
    delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
        if (!ctx.session.user.isAdmin) {
            throw new Error(
                "You do not have permission to perform this action"
            );
        }
        return ctx.prisma.tag.delete({
            where: { id: input },
        });
    }),
});
