import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";
import type { Prisma, Listing, Images } from "@prisma/client";

type CreateData = {
    title: string;
    text: string;
    keycaps: string;
    switches: string;
    switchType: string;
    soundType: string;
    layoutType: string;
    pcbType: string;
    assemblyType: string;
    price: number;
    sellerId: string;
    status: string;
    soundTest?: string;
};
type UpdateData = {
    title: string;
    text: string;
    keycaps: string;
    switches: string;
    switchType: string;
    soundType: string;
    layoutType: string;
    pcbType: string;
    assemblyType: string;
    price: number;
    soundTest?: string;
};

interface PreviewListing extends Listing {
    _count: {
        comments: number;
        favorites: number;
    };
    images: ListingPreviewImage[];
    isFavorited?: boolean;
    favoriteId?: string;
    seller: {
        id: string;
        profile: string | null;
        username: string | null;
    };
}

interface PreviewFavoriteListings extends Listing {
    _count: {
        comments: number;
        favorites: number;
    };
    images: Images[];
    favorites: { id: string }[];
}
interface SellerListings extends Listing {
    _count: {
        comments: number;
        favorites: number;
    };
    images: Images[];
}

interface ListingPreviewImage {
    id: string;
    link: string;
}

interface ListingPage extends Listing {
    images: Images[];
    _count: {
        comments: number;
        favorites: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
        totalRatings?: number | null;
    };
    favorites?: {
        id: string;
    }[];
    isFavorited?: boolean;
    favoriteId?: string;
}

// type ExtendedListing = Listing & {
//     images: Images[];
//     _count: {
//         comments: number;
//     };
//     previewIndex: number;
// };

export const listingRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
            }),
        )
        .query(({ input, ctx }) => {
            const { searchQuery } = input;
            const whereFilters = {
                AND: [
                    searchQuery
                        ? {
                              OR: [
                                  {
                                      title: {
                                          contains: searchQuery,
                                      },
                                  },
                                  {
                                      text: {
                                          contains: searchQuery,
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };

            return ctx.db.listing.findMany({
                where: {
                    ...whereFilters,
                },
                select: {
                    id: true,
                    title: true,
                    sellerId: true,
                    images: {
                        where: {
                            resourceType: "LISTINGPREVIEW",
                        },
                    },
                },
                take: 50,
            });
        }),
    getAllByUserId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ input, ctx }): Promise<SellerListings[]> => {
            const { userId } = input;

            const allUserListings = await ctx.db.listing.findMany({
                where: {
                    sellerId: userId,
                },
                include: {
                    images: {
                        where: { resourceType: "LISTINGPREVIEW" },
                    },
                    _count: {
                        select: { comments: true, favorites: true },
                    },
                },
            });

            return allUserListings;
        }),
    getAllFavoritesByUserId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ input, ctx }): Promise<PreviewFavoriteListings[]> => {
            const { userId } = input;

            const allUserListings = await ctx.db.listing.findMany({
                where: {
                    favorites: {
                        some: {
                            userId: userId,
                        },
                    },
                },
                include: {
                    images: {
                        where: { resourceType: "LISTINGPREVIEW" },
                    },
                    _count: {
                        select: { comments: true, favorites: true },
                    },
                    favorites: {
                        where: {
                            userId: userId,
                        },
                        select: {
                            id: true,
                        },
                    },
                },
            });

            return allUserListings;
        }),
    getAllNewPreviewListings: publicProcedure
        .input(
            z.object({
                userId: z.string().optional(),
                listingId: z.string().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { userId, listingId } = input;

            const limit = 5;

            const listings: PreviewListing[] = await ctx.db.listing.findMany({
                where: {
                    id: {
                        not: listingId,
                    },
                },
                include: {
                    _count: {
                        select: {
                            comments: true,
                            favorites: true,
                        },
                    },
                    images: {
                        where: { resourceType: "LISTINGPREVIEW" },
                    },
                    seller: {
                        select: {
                            id: true,
                            profile: true,
                            username: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: limit,
            });

            if (userId) {
                const favoritesMap = new Map(
                    await ctx.db.favorites
                        .findMany({
                            where: {
                                userId: userId,
                                listingId: {
                                    in: listings.map((listing) => listing.id),
                                },
                            },
                            select: { listingId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [
                                result.listingId,
                                result.id,
                            ]),
                        ),
                );

                listings.forEach((listing) => {
                    listing.isFavorited = favoritesMap.has(listing.id);
                    listing.favoriteId = favoritesMap.get(listing.id);
                });
            }

            return {
                listings,
            };
        }),
    getAllPreviewListings: publicProcedure
        .input(
            z.object({
                filter: z.string().optional(),
                search: z.string().optional(),
                userId: z.string().optional(),
                page: z.string().optional(),
                switchType: z.string().optional(),
                soundType: z.string().optional(),
                assemblyType: z.string().optional(),
                pcbType: z.string().optional(),
                minPrice: z.string().optional(),
                maxPrice: z.string().optional(),
                priceOrder: z.string().optional(),
                layoutType: z.string().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const {
                search,
                soundType,
                switchType,
                layoutType,
                assemblyType,
                pcbType,
                minPrice: minPriceString,
                maxPrice: maxPriceString,
                filter,
                userId,
                page,
            } = input;

            const limit = 12;
            const currentPage = parseInt(page || "1", 10);
            const cumulativeTake = currentPage * limit;
            const minPrice = Number(minPriceString);
            const maxPrice = Number(maxPriceString);

            if (filter === "new") {
                const whereFilters: Prisma.ListingWhereInput = {
                    AND: [
                        soundType ? { soundType } : {},
                        switchType ? { switchType } : {},
                        assemblyType ? { assemblyType } : {},
                        pcbType ? { pcbType } : {},
                        soundType ? { soundType } : {},
                        layoutType ? { layoutType } : {},
                        minPrice ? { price: { gte: minPrice } } : {},
                        maxPrice ? { price: { lte: maxPrice } } : {},
                        search
                            ? {
                                  OR: [
                                      {
                                          title: {
                                              contains: search,
                                          },
                                      },
                                      {
                                          text: {
                                              contains: search,
                                          },
                                      },
                                  ],
                              }
                            : {},
                    ].filter((obj) => Object.keys(obj).length > 0),
                };

                const listings: PreviewListing[] =
                    await ctx.db.listing.findMany({
                        where: whereFilters,
                        include: {
                            _count: {
                                select: {
                                    comments: true,
                                    favorites: true,
                                },
                            },
                            images: {
                                where: { resourceType: "LISTINGPREVIEW" },
                            },
                            seller: {
                                select: {
                                    id: true,
                                    profile: true,
                                    username: true,
                                },
                            },
                        },
                        orderBy: { createdAt: "desc" },
                        //     orderBy: priceOrder
                        // ? priceOrder === "asc"
                        //     ? [{ price: "asc" }, { createdAt: "desc" }]
                        //     : [{ price: "desc" }, { createdAt: "desc" }]
                        // : [{ createdAt: "desc" }],
                        take: cumulativeTake,
                    });

                if (userId) {
                    const favoritesMap = new Map(
                        await ctx.db.favorites
                            .findMany({
                                where: {
                                    userId: userId,
                                    listingId: {
                                        in: listings.map(
                                            (listing) => listing.id,
                                        ),
                                    },
                                },
                                select: { listingId: true, id: true },
                            })
                            .then((results) =>
                                results.map((result) => [
                                    result.listingId,
                                    result.id,
                                ]),
                            ),
                    );

                    listings.forEach((listing) => {
                        listing.isFavorited = favoritesMap.has(listing.id);
                        listing.favoriteId = favoritesMap.get(listing.id);
                    });
                }

                return {
                    listings,
                };
            } else {
                const whereFilters: Prisma.ListingWhereInput = {
                    AND: [
                        soundType ? { soundType } : {},
                        switchType ? { switchType } : {},
                        assemblyType ? { assemblyType } : {},
                        pcbType ? { pcbType } : {},
                        soundType ? { soundType } : {},
                        layoutType ? { layoutType } : {},
                        minPrice ? { price: { gte: minPrice } } : {},
                        maxPrice ? { price: { lte: maxPrice } } : {},
                        search
                            ? {
                                  OR: [
                                      {
                                          title: {
                                              contains: search,
                                          },
                                      },
                                      {
                                          text: {
                                              contains: search,
                                          },
                                      },
                                  ],
                              }
                            : {},
                    ].filter((obj) => Object.keys(obj).length > 0),
                };

                const listings: PreviewListing[] =
                    await ctx.db.listing.findMany({
                        where: whereFilters,
                        include: {
                            _count: {
                                select: {
                                    comments: true,
                                    favorites: true,
                                },
                            },
                            images: {
                                where: { resourceType: "LISTINGPREVIEW" },
                            },
                            seller: {
                                select: {
                                    id: true,
                                    profile: true,
                                    username: true,
                                },
                            },
                        },
                        orderBy: [
                            { favorites: { _count: "desc" } },
                            { comments: { _count: "desc" } },
                            { createdAt: "desc" },
                        ],
                        //     orderBy: priceOrder
                        // ? priceOrder === "asc"
                        //     ? [{ price: "asc" }, { createdAt: "desc" }]
                        //     : [{ price: "desc" }, { createdAt: "desc" }]
                        // : [{ createdAt: "desc" }],
                        take: cumulativeTake,
                    });

                if (userId) {
                    const favoritesMap = new Map(
                        await ctx.db.favorites
                            .findMany({
                                where: {
                                    userId: userId,
                                    listingId: {
                                        in: listings.map(
                                            (listing) => listing.id,
                                        ),
                                    },
                                },
                                select: { listingId: true, id: true },
                            })
                            .then((results) =>
                                results.map((result) => [
                                    result.listingId,
                                    result.id,
                                ]),
                            ),
                    );

                    listings.forEach((listing) => {
                        listing.isFavorited = favoritesMap.has(listing.id);
                        listing.favoriteId = favoritesMap.get(listing.id);
                    });
                }

                return {
                    listings,
                };
            }
        }),

    getOneById: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string().optional(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { id, userId } = input;
            const listingWithImages: ListingPage | null =
                await ctx.db.listing.findUnique({
                    where: {
                        id: id,
                    },
                    include: {
                        images: true,
                        _count: {
                            select: { comments: true, favorites: true },
                        },
                        seller: {
                            select: {
                                id: true,
                                username: true,
                                profile: true,
                                selectedTag: true,
                            },
                        },
                        favorites: userId
                            ? {
                                  where: { userId: userId },
                                  select: { id: true },
                              }
                            : false,
                    },
                });
            // Add favorite details if a user ID was provided and favorites were fetched
            if (userId && listingWithImages) {
                listingWithImages.isFavorited =
                    listingWithImages.favorites &&
                    listingWithImages.favorites[0]
                        ? (listingWithImages.isFavorited = true)
                        : (listingWithImages.isFavorited = false);
                listingWithImages.favoriteId =
                    listingWithImages.favorites &&
                    listingWithImages.favorites[0]
                        ? (listingWithImages.favoriteId =
                              listingWithImages.favorites[0].id)
                        : (listingWithImages.favoriteId = undefined);
            }

            if (listingWithImages) {
                const averageStarRating = await ctx.db.review.aggregate({
                    where: {
                        type: "SELLER",
                        recipientId: listingWithImages.seller.id,
                    },
                    _avg: { starRating: true },
                    _count: {
                        starRating: true,
                    },
                });

                listingWithImages.seller.avgRating =
                    averageStarRating._avg.starRating;

                listingWithImages.seller.totalRatings =
                    averageStarRating._count.starRating;

                listingWithImages.images.sort((a, b) => {
                    if (
                        a.resourceType === "LISTINGPREVIEW" &&
                        b.resourceType !== "LISTINGPREVIEW"
                    ) {
                        return -1;
                    } else if (
                        a.resourceType !== "LISTINGPREVIEW" &&
                        b.resourceType === "LISTINGPREVIEW"
                    ) {
                        return 1;
                    }
                    return 0;
                });
            }

            return listingWithImages;
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                text: z.string(),
                price: z.number(),
                keycaps: z.string(),
                switches: z.string(),
                switchType: z.string(),
                soundType: z.string(),
                layoutType: z.string(),
                pcbType: z.string(),
                assemblyType: z.string(),
                soundTest: z.string().optional(),
                preview: z.number(),
                sellerId: z.string(),
                images: z.array(
                    z.object({
                        link: z.string(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                title,
                text,
                price,
                keycaps,
                switches,
                switchType,
                soundType,
                pcbType,
                layoutType,
                assemblyType,
                soundTest,
                preview,
                sellerId,
                images,
            } = input;
            if (ctx.session.user.id !== sellerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            const createData: CreateData = {
                title,
                text,
                keycaps,
                switches,
                switchType,
                soundType,
                layoutType,
                pcbType,
                assemblyType,
                price,
                sellerId,
                status: "ACTIVE",
            };
            if (soundTest) {
                createData.soundTest = soundTest;
            }

            const newListing = await ctx.db.listing.create({
                data: createData,
            });

            const createdImages = await Promise.all(
                images.map(async (image, i) => {
                    const imageType =
                        i === preview ? "LISTINGPREVIEW" : "LISTING";

                    return ctx.db.images.create({
                        data: {
                            link: image.link,
                            resourceType: imageType,
                            listingId: newListing.id,
                            userId: newListing.sellerId,
                        },
                    });
                }),
            );

            return {
                newListing,
                createdImages,
            };
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                text: z.string(),
                price: z.number(),
                keycaps: z.string(),
                switches: z.string(),
                switchType: z.string(),
                soundType: z.string(),
                layoutType: z.string(),
                pcbType: z.string(),
                assemblyType: z.string(),
                soundTest: z.string().optional(),
                preview: z.object({
                    source: z.string(),
                    index: z.number(),
                    id: z.string(),
                }),
                deleteImageIds: z.array(z.string()).optional(),
                sellerId: z.string(),
                images: z.array(
                    z.object({
                        link: z.string(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                id,
                title,
                text,
                price,
                keycaps,
                switches,
                switchType,
                soundType,
                pcbType,
                layoutType,
                assemblyType,
                soundTest,
                preview,
                sellerId,
                images,
                deleteImageIds,
            } = input;

            if (ctx.session.user.id !== sellerId) {
                throw new Error("invalid userId");
            }
            const listingCheck = await ctx.db.listing.findUnique({
                where: { id: id },
            });

            if (listingCheck) {
                if (
                    listingCheck.status === "SOLD" ||
                    listingCheck.status === "PENDING"
                ) {
                    throw new Error("Listing not active");
                }
            }

            const updateData: UpdateData = {
                title,
                text,
                keycaps,
                switches,
                switchType,
                soundType,
                layoutType,
                pcbType,
                assemblyType,
                price,
            };
            if (soundTest) {
                updateData.soundTest = soundTest;
            }

            const updatedListing = await ctx.db.listing.update({
                where: { id: id },
                data: updateData,
            });

            if (deleteImageIds && deleteImageIds.length > 0) {
                const images = await ctx.db.images.findMany({
                    where: {
                        id: { in: deleteImageIds },
                    },
                });
                const removeFilePromises = images.map(async (image) => {
                    try {
                        await removeFileFromS3(image.link);
                    } catch (err) {
                        console.error(`Failed to remove file from S3: `, err);
                        throw new Error(`Failed to remove file from S3: `);
                    }
                });

                await Promise.all(removeFilePromises);

                await ctx.db.images.deleteMany({
                    where: {
                        id: { in: deleteImageIds },
                    },
                });
            }

            await ctx.db.images.updateMany({
                where: {
                    listingId: id,
                    resourceType: "LISTINGPREVIEW",
                },
                data: {
                    resourceType: "LISTING",
                },
            });

            if (preview.source === "prev") {
                const newPreview = await ctx.db.images.findFirst({
                    where: {
                        id: preview.id,
                        listingId: id,
                    },
                });

                if (newPreview) {
                    await ctx.db.images.update({
                        where: {
                            id: newPreview.id,
                        },
                        data: {
                            resourceType: "LISTINGPREVIEW",
                        },
                    });
                }
            }

            if (images && images.length > 0) {
                await Promise.all(
                    images.map(async (image, i) => {
                        const imageType =
                            preview.source === "new" && preview.index === i
                                ? "LISTINGPREVIEW"
                                : "LISTING";

                        return ctx.db.images.create({
                            data: {
                                link: image.link,
                                resourceType: imageType,
                                listingId: id,
                                userId: sellerId,
                            },
                        });
                    }),
                );
            }

            return {
                updatedListing,
            };
        }),

    relist: protectedProcedure
        .input(
            z.object({
                listingId: z.string(),
                transactionId: z.string(),
                buyerId: z.string(),
                sellerId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { listingId, transactionId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== sellerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }
            const transactionCheck = await ctx.db.listingTransaction.findUnique(
                {
                    where: { id: transactionId },
                },
            );

            const listingCheck = await ctx.db.listing.findUnique({
                where: { id: listingId },
            });
            const sellerCheck = await ctx.db.user.findUnique({
                where: {
                    id: sellerId,
                },
            });
            const buyerCheck = await ctx.db.user.findUnique({
                where: {
                    id: buyerId,
                },
            });
            if (!transactionCheck) {
                throw new Error("Transaction does not exist");
            }
            if (transactionCheck.status !== "ACCEPTED") {
                throw new Error("Transaction already revoked");
            }
            if (!listingCheck) {
                throw new Error("Listing does not exist");
            }
            if (!buyerCheck) {
                throw new Error("Can't find buyer");
            }
            if (!sellerCheck) {
                throw new Error("Can't find seller");
            }

            await ctx.db.listing.update({
                where: { id: listingCheck.id },
                data: {
                    status: "ACTIVE",
                    buyerId: null,
                },
            });

            await ctx.db.listingTransaction.update({
                where: { id: transactionId },
                data: {
                    status: "REVOKED",
                    listingId: null,
                },
            });
            await ctx.db.notification.create({
                data: {
                    userId: buyerId,
                    text: `Seller has canceled your transaction D:`,
                    type: "",
                    status: "UNREAD",
                },
            });

            return "succesful";
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                sellerId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId } = input;
            if (ctx.session.user.id !== sellerId && !ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            const images = await ctx.db.images.findMany({
                where: {
                    listingId: id,
                },
            });

            if (images.length > 0) {
                const imageIds = images.map((image) => image.id);
                const removeFilePromises = images.map((image) =>
                    removeFileFromS3(image.link),
                );
                try {
                    // here we are waiting for all promises and capturing those that are rejected
                    const results =
                        await Promise.allSettled(removeFilePromises);
                    const errors = results.filter(
                        (result) => result.status === "rejected",
                    );

                    if (errors.length > 0) {
                        console.error(
                            "Errors occurred while removing files from S3:",
                            errors,
                        );
                    }

                    await ctx.db.images.deleteMany({
                        where: {
                            id: { in: imageIds },
                        },
                    });
                } catch (err) {
                    console.error("An unexpected error occurred:", err);
                }
            }

            await ctx.db.listing.delete({ where: { id: id } });

            return "Successfully deleted";
        }),
});

// getAllWithFilters: publicProcedure
//     .input(
//         z.object({
//             searchQuery: z.string().optional(),
//             switchType: z.string().optional(),
//             minPrice: z.number().optional(),
//             maxPrice: z.number().optional(),
//             priceOrder: z.string().optional(),
//             layoutType: z.string().optional(),
//             assemblyType: z.string().optional(),
//             hotSwapType: z.string().optional(),
//             soundType: z.string().optional(),
//             cursor: z.string().nullish(),
//             limit: z.number().min(1).max(100).nullish(),
//         }),
//     )
//     .query(async ({ ctx, input }) => {
//         const {
//             searchQuery,
//             switchType,
//             soundType,
//             assemblyType,
//             hotSwapType,
//             layoutType,
//             minPrice,
//             maxPrice,
//             priceOrder,
//             cursor,
//         } = input;

//         const limit = input.limit ?? 12;

//         const whereFilters: Prisma.ListingWhereInput = {
//             AND: [
//                 { status: "ACTIVE" },
//                 switchType ? { switchType } : {},
//                 soundType ? { soundType } : {},
//                 assemblyType ? { assemblyType } : {},
//                 hotSwapType ? { hotSwapType } : {},
//                 layoutType ? { layoutType } : {},
//                 minPrice ? { price: { gte: minPrice } } : {},
//                 maxPrice ? { price: { lte: maxPrice } } : {},
//                 searchQuery
//                     ? {
//                           OR: [
//                               {
//                                   title: {
//                                       contains: searchQuery,
//                                   },
//                               },
//                               {
//                                   text: {
//                                       contains: searchQuery,
//                                   },
//                               },
//                           ],
//                       }
//                     : {},
//             ].filter((obj) => Object.keys(obj).length > 0),
//         };

//         const listings: PreviewListing[] = await ctx.db.listing.findMany({
//             where: whereFilters,
//             include: {
//                 _count: {
//                     select: { comments: true },
//                 },
//                 images: {
//                     where: { resourceType: "LISTINGPREVIEW" },
//                     select: { id: true, link: true },
//                 },
//             },
//             take: limit + 1,
//             skip: cursor ? 1 : 0,
//             cursor: cursor ? { id: cursor } : undefined,
//             orderBy: priceOrder
//                 ? priceOrder === "asc"
//                     ? [{ price: "asc" }, { createdAt: "desc" }]
//                     : [{ price: "desc" }, { createdAt: "desc" }]
//                 : [{ createdAt: "desc" }],
//         });

//         let nextCursor: typeof cursor | undefined = undefined;
//         if (listings.length > limit) {
//             const nextItem = listings.pop();
//             if (nextItem !== undefined) {
//                 nextCursor = nextItem.id;
//             }
//         }

//         return {
//             listings,
//             nextCursor,
//         };
//     }),

// getAllSortedByPopularityWithFilters: publicProcedure
//     .input(
//         z.object({
//             searchQuery: z.string().optional(),
//             switchType: z.string().optional(),
//             minPrice: z.number().optional(),
//             maxPrice: z.number().optional(),
//             priceOrder: z.string().optional(),
//             layoutType: z.string().optional(),
//             assemblyType: z.string().optional(),
//             hotSwapType: z.string().optional(),
//             soundType: z.string().optional(),
//             cursor: z.string().nullish(),
//             limit: z.number().min(1).max(100).nullish(),
//         }),
//     )
//     .query(async ({ ctx, input }) => {
//         const {
//             searchQuery,
//             switchType,
//             soundType,
//             assemblyType,
//             hotSwapType,
//             layoutType,
//             minPrice,
//             maxPrice,
//             priceOrder,
//             cursor,
//         } = input;
//         const limit = input.limit ?? 12;

//         const whereFilters: Prisma.ListingWhereInput = {
//             AND: [
//                 { status: "ACTIVE" },
//                 switchType ? { switchType } : {},
//                 soundType ? { soundType } : {},
//                 assemblyType ? { assemblyType } : {},
//                 hotSwapType ? { hotSwapType } : {},
//                 layoutType ? { layoutType } : {},
//                 minPrice ? { price: { gte: minPrice } } : {},
//                 maxPrice ? { price: { lte: maxPrice } } : {},
//                 searchQuery
//                     ? {
//                           OR: [
//                               {
//                                   title: {
//                                       contains: searchQuery,
//                                   },
//                               },
//                               {
//                                   text: {
//                                       contains: searchQuery,
//                                   },
//                               },
//                           ],
//                       }
//                     : {},
//             ].filter((obj) => Object.keys(obj).length > 0),
//         };

//         const listings: PreviewListing[] = await ctx.db.listing.findMany({
//             where: whereFilters,
//             include: {
//                 _count: {
//                     select: { comments: true },
//                 },
//                 images: {
//                     where: { resourceType: "LISTINGPREVIEW" },
//                     select: { id: true, link: true },
//                 },
//             },
//             take: limit + 1,
//             skip: cursor ? 1 : 0,
//             cursor: cursor ? { id: cursor } : undefined,
//         });

//         // sort by popularity (comment count)
//         let popularListings = listings.sort(
//             (a, b) => b._count.comments - a._count.comments,
//         );

//         // if priceOrder then sort based on that
//         if (priceOrder === "asc") {
//             popularListings = popularListings.sort(
//                 (a, b) => a.price - b.price,
//             );
//         } else if (priceOrder === "desc") {
//             popularListings = popularListings.sort(
//                 (a, b) => b.price - a.price,
//             );
//         }

//         let nextCursor: typeof cursor | undefined = undefined;
//         if (popularListings.length > limit) {
//             const nextItem = popularListings.pop();
//             nextCursor = nextItem?.id;
//         }

//         return {
//             popularListings,
//             nextCursor,
//         };
//     }),
