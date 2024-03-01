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
    sold: boolean;
    soundTest?: string;
};

interface ListingWithCommentCount extends Listing {
    _count: {
        comments: number;
    };
}

interface ListingPage extends Listing {
    images: Images[];
    _count: {
        comments: number;
    };
    seller: {
        id: string;
        username: string | null;
        selectedTag: string | null;
        profile: string | null;
        avgRating?: number | null;
    };
}

interface ListingPreview extends Listing {
    images: {
        id: string;
        link: string;
    };
    id: string;
}

// todo update the preview listings to have count comments
// todo update types for preview listings potentially style

// after this is

export const listingRouter = createTRPCRouter({
    getOne: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const listingWithImages: ListingPage | null =
                await ctx.prisma.listing.findUnique({
                    where: {
                        id: input.id,
                    },
                    include: {
                        images: true,
                        _count: {
                            select: { comments: true },
                        },
                        seller: {
                            select: {
                                id: true,
                                username: true,
                                profile: true,
                                selectedTag: true,
                            },
                        },
                    },
                });

            if (listingWithImages) {
                const averageStarRating = await ctx.prisma.review.aggregate({
                    where: { sellerId: listingWithImages.seller.id },
                    _avg: { starRating: true },
                });

                listingWithImages.seller.avgRating =
                    averageStarRating._avg.starRating;

                // Sort images with "LISTINGPREVIEW" appearing first
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

    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.listing.findMany();
    }),

    getAllWithFilters: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                switchType: z.string().optional(),
                minPrice: z.number().optional(),
                maxPrice: z.number().optional(),
                priceOrder: z.string().optional(),
                layoutType: z.string().optional(),
                assemblyType: z.string().optional(),
                hotSwapType: z.string().optional(),
                soundType: z.string().optional(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const {
                searchQuery,
                switchType,
                soundType,
                assemblyType,
                hotSwapType,
                layoutType,
                minPrice,
                maxPrice,
                priceOrder,
                cursor,
            } = input;

            const limit = input.limit ?? 12;
            const queryOptions: Prisma.ListingFindManyArgs = {
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
                    _count: {
                        select: { comments: true },
                    },
                },
                orderBy: priceOrder
                    ? priceOrder === "asc"
                        ? [{ price: "asc" }, { createdAt: "desc" }]
                        : [{ price: "desc" }, { createdAt: "desc" }]
                    : [{ createdAt: "desc" }],
                take: limit + 1,
                skip: cursor ? 1 : undefined,
                cursor: cursor ? { id: cursor } : undefined,
            };

            const filters: Prisma.ListingWhereInput[] = [];

            if (switchType) {
                filters.push({
                    switchType: {
                        equals: switchType,
                    },
                });
            }
            if (soundType) {
                filters.push({
                    soundType: {
                        equals: soundType,
                    },
                });
            }
            if (assemblyType) {
                filters.push({
                    assemblyType: {
                        equals: assemblyType,
                    },
                });
            }
            if (layoutType) {
                filters.push({
                    layoutType: {
                        equals: layoutType,
                    },
                });
            }
            if (hotSwapType) {
                filters.push({
                    pcbType: {
                        equals: hotSwapType,
                    },
                });
            }
            if (minPrice) {
                filters.push({
                    price: {
                        gte: minPrice,
                    },
                });
            }
            if (maxPrice) {
                filters.push({
                    price: {
                        lte: maxPrice,
                    },
                });
            }

            if (searchQuery) {
                filters.push({
                    title: {
                        contains: searchQuery,
                    },
                });
            }
            if (filters.length > 0) {
                queryOptions.where = {
                    AND: filters,
                };
            }

            const listings = await ctx.prisma.listing.findMany(queryOptions);

            let nextCursor: typeof cursor | undefined = undefined;
            if (listings.length > limit) {
                const nextItem = listings.pop(); // Remove the extra item
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id; // Set the next cursor to the ID of the extra item
                }
            }

            return {
                listings,
                nextCursor,
            };
        }),

    getAllSortedByPopularityWithFilters: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                switchType: z.string().optional(),
                minPrice: z.number().optional(),
                maxPrice: z.number().optional(),
                priceOrder: z.string().optional(),
                layoutType: z.string().optional(),
                assemblyType: z.string().optional(),
                hotSwapType: z.string().optional(),
                soundType: z.string().optional(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const {
                searchQuery,
                switchType,
                soundType,
                assemblyType,
                hotSwapType,
                layoutType,
                minPrice,
                maxPrice,
                priceOrder,
                cursor,
            } = input;
            const limit = input.limit ?? 12;

            // Build the dynamic filters based on the input
            const whereFilters: Prisma.ListingWhereInput = {
                AND: [
                    switchType ? { switchType } : {},
                    soundType ? { soundType } : {},
                    assemblyType ? { assemblyType } : {},
                    hotSwapType ? { hotSwapType } : {},
                    layoutType ? { layoutType } : {},
                    minPrice ? { price: { gte: minPrice } } : {},
                    maxPrice ? { price: { lte: maxPrice } } : {},
                    searchQuery
                        ? {
                              OR: [
                                  {
                                      title: {
                                          contains: searchQuery,
                                          mode: "insensitive",
                                      },
                                  },
                                  {
                                      description: {
                                          contains: searchQuery,
                                          mode: "insensitive",
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };

            const listings: ListingWithCommentCount[] =
                await ctx.prisma.listing.findMany({
                    where: whereFilters,
                    include: {
                        _count: {
                            select: { comments: true }, // Directly include the count of comments
                        },
                        images: {
                            where: { resourceType: "LISTINGPREVIEW" },
                            select: { id: true, link: true },
                        },
                    },
                    take: limit + 1,
                    skip: cursor ? 1 : 0,
                    cursor: cursor ? { id: cursor } : undefined,
                });

            // sort by popularity (comment count)
            let popularListings = listings.sort(
                (a, b) => b._count.comments - a._count.comments
            );

            // if priceOrder then sort based on that
            if (priceOrder === "asc") {
                popularListings = popularListings.sort(
                    (a, b) => a.price - b.price
                );
            } else if (priceOrder === "desc") {
                popularListings = popularListings.sort(
                    (a, b) => b.price - a.price
                );
            }

            // Handle infinite scroll pagination here
            let nextCursor: typeof cursor | undefined = undefined;
            if (popularListings.length > limit) {
                const nextItem = popularListings.pop(); // Remove the extra item to maintain the limit
                nextCursor = nextItem?.id;
            }

            return {
                popularListings,
                nextCursor,
            };
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
                    })
                ),
            })
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
            if (
                ctx.session.user.id === sellerId &&
                ctx.session.user.isVerified
            ) {
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
                    sold: false,
                };
                if (soundTest) {
                    createData.soundTest = soundTest;
                }

                const newListing = await ctx.prisma.listing.create({
                    data: createData,
                });

                const createdImages = await Promise.all(
                    images.map(async (image, i) => {
                        const imageType =
                            i === preview ? "LISTINGPREVIEW" : "LISTING";

                        return ctx.prisma.images.create({
                            data: {
                                link: image.link,
                                resourceType: imageType,
                                listingId: newListing.id,
                                userId: newListing.sellerId,
                            },
                        });
                    })
                );

                return {
                    newListing,
                    createdImages,
                };
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
                imageIds: z.array(z.string()),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, imageIds, userId } = input;
            if (ctx.session.user.id === userId || ctx.session.user.isAdmin) {
                if (imageIds.length > 0) {
                    const images = await ctx.prisma.images.findMany({
                        where: {
                            id: { in: imageIds },
                        },
                    });
                    const removeFilePromises = images.map(async (image) => {
                        try {
                            await removeFileFromS3(image.link);
                        } catch (err) {
                            console.error(
                                `Failed to remove file from S3: `,
                                err
                            );
                            throw new Error(`Failed to remove file from S3: `);
                        }
                    });

                    await Promise.all(removeFilePromises);

                    await ctx.prisma.images.deleteMany({
                        where: {
                            id: { in: imageIds },
                        },
                    });
                }

                await ctx.prisma.listing.delete({ where: { id: id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
