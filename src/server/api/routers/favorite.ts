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

    // create: protectedProcedure.input({
    //     z.object({
    //         userId: z.string()

    //     })
    // })
});
