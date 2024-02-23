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

            const isFavorited = await ctx.prisma.userFavorites.findFirst({
                where: {
                    userId: userId,
                    listingId: listingId,
                },
                select: {
                    id: true,
                },
            });
            return isFavorited;
        }),
    checkIfPostIsFavorited: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                postId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { userId, postId } = input;

            const isFavorited = await ctx.prisma.userFavorites.findFirst({
                where: {
                    userId: userId,
                    postId: postId,
                },
                select: {
                    id: true,
                },
            });
            return isFavorited;
        }),

    getAllFavoriteListings: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.userFavorites.findMany({
                where: {
                    userId: input.userId,
                },
                include: {
                    listing: {
                        select: {
                            id: true,
                            title: true,
                            price: true,
                            switchType: true,
                            images: {
                                where: {
                                    resourceType: "LISTINGPREVIEW",
                                },
                                select: { id: true, link: true },
                            },
                        },
                    },
                },
            });
        }),

    createListingFavorite: protectedProcedure
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
    createPostFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                postId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.id === input.userId) {
                return ctx.prisma.userFavorites.create({
                    data: {
                        userId: input.userId,
                        postId: input.postId,
                    },
                });
            }

            throw new Error("You must be logged in to perform this action.");
        }),
    deleteListingFavorite: protectedProcedure
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
    deletePostFavorite: protectedProcedure
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
