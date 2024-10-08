import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import type { Post, Images } from "@prisma/client";

type ExtendedPost = Post & {
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
};

export const favoriteRouter = createTRPCRouter({
    checkIfListingIsFavorited: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { userId, listingId } = input;

            const isFavorited = await ctx.db.favorites.findFirst({
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
            }),
        )
        .query(async ({ ctx, input }) => {
            const { userId, postId } = input;

            const isFavorited = await ctx.db.favorites.findFirst({
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

    getAllFavoritePosts: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const posts = await ctx.db.favorites
                .findMany({
                    where: {
                        userId: input.userId,
                        listingId: null,
                        postId: { not: null },
                    },
                    select: {
                        post: {
                            include: {
                                _count: {
                                    select: { comments: true, postLikes: true },
                                },
                                images: true,
                            },
                        },
                    },
                })
                .then((favorites) => {
                    if (favorites.length === 0) {
                        return null;
                    }
                    return favorites.map(
                        (favorite) => favorite.post as ExtendedPost,
                    );
                });

            if (posts && posts.length > 0) {
                posts.forEach((post) => {
                    post.images.sort((a, b) => {
                        if (
                            a.resourceType === "POSTPREVIEW" &&
                            b.resourceType !== "POSTPREVIEW"
                        ) {
                            return -1;
                        } else if (
                            a.resourceType !== "POSTPREVIEW" &&
                            b.resourceType === "POSTPREVIEW"
                        ) {
                            return 1;
                        }
                        return 0;
                    });
                });
            }

            return posts;
        }),

    createListingFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, listingId } = input;
            if (ctx.session.user.id !== userId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            const existingFavorite = await ctx.db.favorites.findFirst({
                where: {
                    userId: userId,
                    listingId: listingId,
                },
            });

            if (existingFavorite) {
                throw new Error("You have already favorited this post.");
            }

            await ctx.db.favorites.create({
                data: {
                    userId: userId,
                    listingId: listingId,
                },
            });

            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            if (listingCheck) {
                await ctx.db.user.update({
                    where: {
                        id: listingCheck.sellerId,
                    },
                    data: {
                        internetPoints: {
                            increment: 1,
                        },
                    },
                });
            }
            return {
                success: true,
                message: "Post successfully favorited.",
            };
        }),
    createPostFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                postId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, postId } = input;
            if (ctx.session.user.id !== userId) {
                throw new Error(
                    "You must be logged in to perform this action.",
                );
            }

            const existingFavorite = await ctx.db.favorites.findFirst({
                where: {
                    userId: userId,
                    postId: postId,
                },
            });

            if (existingFavorite) {
                throw new Error("You have already favorited this post.");
            }

            await ctx.db.favorites.create({
                data: {
                    userId: userId,
                    postId: postId,
                },
            });

            const postCheck = await ctx.db.post.findUnique({
                where: {
                    id: postId,
                },
            });
            if (postCheck) {
                await ctx.db.user.update({
                    where: {
                        id: postCheck.userId,
                    },
                    data: {
                        internetPoints: {
                            increment: 1,
                        },
                    },
                });
            }
            return {
                success: true,
                message: "Post successfully favorited.",
            };
        }),
    deleteListingFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                listingId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, listingId } = input;

            if (
                !(userId === ctx.session?.user.id || ctx.session?.user.isAdmin)
            ) {
                throw new Error(
                    "You are not authorized to perform this action.",
                );
            }

            const favorite = await ctx.db.favorites.findFirst({
                where: {
                    listingId: listingId,
                    userId: userId,
                },
                select: {
                    id: true,
                },
            });

            if (!favorite) {
                throw new Error("Favorite not found.");
            }

            await ctx.db.favorites.delete({
                where: {
                    id: favorite.id,
                },
            });
            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            if (listingCheck) {
                await ctx.db.user.update({
                    where: {
                        id: listingCheck.sellerId,
                    },
                    data: {
                        internetPoints: {
                            decrement: 1,
                        },
                    },
                });
            }

            return {
                success: true,
                message: "Favorite successfully removed.",
            };
        }),
    deletePostFavorite: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                postId: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, postId } = input;

            if (
                !(userId === ctx.session?.user.id || ctx.session?.user.isAdmin)
            ) {
                throw new Error(
                    "You are not authorized to perform this action.",
                );
            }

            const favorite = await ctx.db.favorites.findFirst({
                where: {
                    postId: postId,
                    userId: userId,
                },
                select: {
                    id: true,
                },
            });

            if (!favorite) {
                throw new Error("Favorite not found.");
            }

            await ctx.db.favorites.delete({
                where: {
                    id: favorite.id,
                },
            });
            const postCheck = await ctx.db.post.findUnique({
                where: {
                    id: postId,
                },
            });
            if (postCheck) {
                await ctx.db.user.update({
                    where: {
                        id: postCheck.userId,
                    },
                    data: {
                        internetPoints: {
                            decrement: 1,
                        },
                    },
                });
            }

            return {
                success: true,
                message: "Favorite successfully removed.",
            };
        }),
});

// getAllFavoriteListings: publicProcedure
//     .input(
//         z.object({
//             userId: z.string(),
//         }),
//     )
//     .query(async ({ ctx, input }) => {
//         return ctx.prisma.favorites
//             .findMany({
//                 where: {
//                     userId: input.userId,
//                     listingId: { not: null },
//                     postId: null,
//                 },
//                 select: {
//                     listing: {
//                         include: {
//                             _count: {
//                                 select: { comments: true },
//                             },
//                             images: {
//                                 where: { resourceType: "LISTINGPREVIEW" },
//                                 select: { id: true, link: true },
//                             },
//                         },
//                     },
//                 },
//             })
//             .then((favorites) => {
//                 if (favorites.length === 0) {
//                     return null;
//                 }
//                 return favorites.map(
//                     (favorite) => favorite.listing as ExtendedListing,
//                 );
//             });
//     }),
