import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const bookingRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.gCHBooking.findMany();
    }),

    getAllBookedDates: publicProcedure.query(async ({ ctx }) => {
        const bookedArr = await ctx.prisma.gCHBooking.findMany();

        return bookedArr.map((el) => el.date);
    }),

    getByDate: publicProcedure
        .input(z.date().optional())
        .query(({ input, ctx }) => {
            return ctx.prisma.gCHBooking.findFirst({
                where: { date: input },
            });
        }),

    getByUserId: protectedProcedure
        .input(z.string())
        .query(({ input, ctx }) => {
            return ctx.prisma.gCHBooking.findMany({ where: { userId: input } });
        }),

    create: protectedProcedure
        .input(
            z.object({
                date: z.date(),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const data = { ...input, status: "pending", type: "test" };
                const newBooking = await ctx.prisma.gCHBooking.create({
                    data,
                });

                return newBooking;
            }

            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                date: z.date().optional(),
                status: z.string().optional(),
                type: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedBooking = await ctx.prisma.gCHBooking.update({
                    where: {
                        id: input.id,
                    },
                    data: input,
                });

                return updatedBooking;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(z.object({ id: z.string(), userId: z.string() }))
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                await ctx.prisma.gCHBooking.delete({
                    where: { id: input.id },
                });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
