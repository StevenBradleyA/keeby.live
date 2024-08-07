import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const keebRouter = createTRPCRouter({
    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.keeb.findMany();
    // }),

    getAllByUserId: publicProcedure
        .input(z.string())
        .query(({ ctx, input }) => {
            return ctx.db.keeb.findMany({
                where: {
                    userId: input,
                },
            });
        }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const createKeeb = await ctx.db.keeb.create({
                    data: input,
                });

                return { createKeeb };
            }
            throw new Error("Invalid userId");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input.userId) {
                const updatedKeeb = await ctx.db.keeb.update({
                    where: { id: input.id },
                    data: input,
                });

                return updatedKeeb;
            }
            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId } = input;

            if (ctx.session.user.id === userId) {
                // we can't just delete a keeb we have to check to make sure they have more than one keeb
                // then we have to find a different keeb id and return it
                const keebs = await ctx.db.keeb.findMany({
                    where: { userId: userId },
                });

                if (keebs.length > 1) {
                    const newKeeb = keebs.find((keeb) => keeb.id !== id);

                    if (!newKeeb) {
                        throw new Error(
                            "Unable to find a new keyboard to assign.",
                        );
                    }

                    await ctx.db.keeb.delete({
                        where: { id: id },
                    });

                    return {
                        newKeebId: newKeeb.id,
                        newKeebName: newKeeb.name,
                    };
                } else {
                    throw new Error("User must have at least one keyboard");
                }
            }

            throw new Error("Invalid userId");
        }),
});
