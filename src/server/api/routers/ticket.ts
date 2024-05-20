import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

// todo assign tags at certain ranks in keeb type

export const ticketRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.ticket.findMany();
    }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                text: z.string(),
                email: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            const { userId, text, email } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid Credentials");
            }
            return ctx.prisma.ticket.create({
                data: {
                    userId: userId,
                    text: text,
                    email: email,
                },
            });
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            if (ctx.session.user.isAdmin) {
                return ctx.prisma.ticket.delete({
                    where: { id: id },
                });
            } else {
                throw new Error("Invalid Credentials");
            }
        }),
});
