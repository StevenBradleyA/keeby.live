import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const favoriteRouter = createTRPCRouter({
    checkIfListingIsFavorited: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { userId, listingId } = input;

            const isFavorited = await ctx.prisma.userFavorites.findUnique({
                where: {
                    userId_listingId: {
                        userId: userId,
                        listingId: listingId,
                    },
                },
                select: {
                    id: true,
                },
            });
            return isFavorited;
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.id === input.userId) {
                return ctx.prisma.userFavorites.create({
                    data: {
                        userId: input.userId,
                        listingId: input.listingId,
                    },
                });
            }

            throw new Error("You must be logged in to perform this action.");
        }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.id === input.userId) {
                return ctx.prisma.userFavorites.delete({
                    where: {
                        id: input.id,
                    },
                });
            }
            throw new Error("You must be logged in to perform this action.");
        }),
});
