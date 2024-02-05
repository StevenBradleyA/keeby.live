import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";
import type { Images, Prisma } from "@prisma/client";

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

export const listingRouter = createTRPCRouter({
    getOne: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ input, ctx }) => {
            return ctx.prisma.listing.findUnique({
                where: {
                    id: input.id,
                },
            });
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

            // Step 1: Aggregate comment counts
            const commentCounts = await ctx.prisma.comment.groupBy({
                by: ["typeId"],
                where: { type: "LISTING" },
                _count: true,
            });

            // Step 2: Apply filters and retrieve listings
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
                },
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

            // Step 3: Merge listings with comment counts
            const popularListings = listings.map((listing) => {
                const commentCount =
                    commentCounts.find((c) => c.typeId === listing.id)
                        ?._count ?? 0;
                return { ...listing, commentCount };
            });

            // Step 4: Sort listings by comment counts
            popularListings.sort((a, b) => b.commentCount - a.commentCount);

            // Step 5: Sort listings by priceOrder if specified
            if (priceOrder === "asc") {
                popularListings.sort((a, b) => a.price - b.price);
            } else if (priceOrder === "desc") {
                popularListings.sort((a, b) => b.price - a.price);
            }

            let nextCursor: typeof cursor | undefined = undefined;
            if (popularListings.length > limit) {
                const nextItem = popularListings.pop(); // Remove the extra item
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id; // Set the next cursor to the ID of the extra item
                }
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
