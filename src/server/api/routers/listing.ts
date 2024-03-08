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

interface PreviewListing extends Listing {
    _count: {
        comments: number;
    };
    images: ListingPreviewImage[];
}

interface ListingPreviewImage {
    id: string;
    link: string;
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

export const listingRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
            })
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

            return ctx.prisma.listing.findMany({
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
            });
        }),
    getAllByUserId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { userId } = input;

            const allUserListings = await ctx.prisma.listing.findMany({
                where: {
                    sellerId: userId,
                },
                include: {
                    images: true,
                    _count: {
                        select: { comments: true },
                    },
                },
            });

            if (allUserListings) {
                allUserListings.map((e) => {
                    e.images.sort((a, b) => {
                        const rankA =
                            a.resourceType === "LISTINGPREVIEW" ? 1 : 2;
                        const rankB =
                            b.resourceType === "LISTINGPREVIEW" ? 1 : 2;
                        return rankA - rankB;
                    });
                });
            }

            return allUserListings;
        }),

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

            const listings: PreviewListing[] =
                await ctx.prisma.listing.findMany({
                    where: whereFilters,
                    include: {
                        _count: {
                            select: { comments: true },
                        },
                        images: {
                            where: { resourceType: "LISTINGPREVIEW" },
                            select: { id: true, link: true },
                        },
                    },
                    take: limit + 1,
                    skip: cursor ? 1 : 0,
                    cursor: cursor ? { id: cursor } : undefined,
                    orderBy: priceOrder
                        ? priceOrder === "asc"
                            ? [{ price: "asc" }, { createdAt: "desc" }]
                            : [{ price: "desc" }, { createdAt: "desc" }]
                        : [{ createdAt: "desc" }],
                });

            let nextCursor: typeof cursor | undefined = undefined;
            if (listings.length > limit) {
                const nextItem = listings.pop();
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id;
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

            const listings: PreviewListing[] =
                await ctx.prisma.listing.findMany({
                    where: whereFilters,
                    include: {
                        _count: {
                            select: { comments: true },
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

            let nextCursor: typeof cursor | undefined = undefined;
            if (popularListings.length > limit) {
                const nextItem = popularListings.pop();
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
                sellerId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId } = input;
            if (ctx.session.user.id === sellerId || ctx.session.user.isAdmin) {
                const images = await ctx.prisma.images.findMany({
                    where: {
                        listingId: id,
                    },
                });

                if (images.length > 0) {
                    const imageIds = images.map((image) => image.id);
                    const removeFilePromises = images.map((image) =>
                        removeFileFromS3(image.link)
                    );
                    try {
                        // here we are waiting for all promises and capturing those that are rejected
                        const results = await Promise.allSettled(
                            removeFilePromises
                        );
                        const errors = results.filter(
                            (result) => result.status === "rejected"
                        );

                        if (errors.length > 0) {
                            console.error(
                                "Errors occurred while removing files from S3:",
                                errors
                            );
                        }

                        await ctx.prisma.images.deleteMany({
                            where: {
                                id: { in: imageIds },
                            },
                        });
                    } catch (err) {
                        console.error("An unexpected error occurred:", err);
                    }
                }
            }

            await ctx.prisma.listing.delete({ where: { id: id } });

            return "Successfully deleted";
        }),
});
