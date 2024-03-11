import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import type { Post, Images, Listing } from "@prisma/client";

// type ExtendedPost = Post & {
//     images: Images[];
//     _count: {
//         comments: number;
//         postLikes: number;
//     };
//     previewIndex?: number;
// };

interface ListingImage {
    id: string;
    link: string;
}

type ExtendedListing = Listing & {
    _count: {
        comments: number;
    };
    images: ListingImage[];
};

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

            const isFavorited = await ctx.prisma.favorites.findFirst({
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

            const isFavorited = await ctx.prisma.favorites.findFirst({
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
            return ctx.prisma.favorites
                .findMany({
                    where: {
                        userId: input.userId,
                        listingId: { not: null },
                        postId: null,
                    },
                    select: {
                        listing: {
                            include: {
                                _count: {
                                    select: { comments: true },
                                },
                                images: {
                                    where: { resourceType: "LISTINGPREVIEW" },
                                    select: { id: true, link: true },
                                },
                            },
                        },
                    },
                })
                .then((favorites) => {
                    if (favorites.length === 0) {
                        return null;
                    }
                    return favorites.map(
                        (favorite) => favorite.listing as ExtendedListing
                    );
                });
        }),
    // getAllFavoritePosts: publicProcedure
    //     .input(
    //         z.object({
    //             userId: z.string(),
    //         })
    //     )
    //     .query(({ ctx, input })  => {
    //         return ctx.prisma.favorites.findMany({
    //             where: {
    //                 userId: input.userId,
    //             },
    //             include: {
    //                 images: true,
    //                 _count: {
    //                     select: { comments: true, postLikes: true },
    //                 },
    //             },
    //         });
    //     }),

    createListingFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.id === input.userId) {
                return ctx.prisma.favorites.create({
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
                return ctx.prisma.favorites.create({
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
                return ctx.prisma.favorites.delete({
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
                return ctx.prisma.favorites.delete({
                    where: {
                        id: input.id,
                    },
                });
            }
            throw new Error("You must be logged in to perform this action.");
        }),
});
