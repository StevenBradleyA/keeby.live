import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";
import type { Prisma } from "@prisma/client";

type CreateData = {
    title: string;
    text: string;
    keycaps: string;
    switches: string;
    switchType: string;
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
            })
        )
        .query(({ ctx, input }) => {
            const { searchQuery, switchType } = input;
            const queryOptions: Prisma.ListingFindManyArgs = {
                select: {
                    id: true,
                    title: true,
                    price: true,
                    switchType: true,
                },
                orderBy: {
                    createdAt: "desc",
                },
            };

            const filters: Prisma.ListingWhereInput[] = [];
            if (searchQuery) {
                filters.push({
                    title: {
                        contains: searchQuery,
                    },
                });
            }
            if (switchType) {
                filters.push({
                    switchType: {
                        equals: switchType,
                    },
                });
            }

            if (filters.length > 0) {
                queryOptions.where = {
                    AND: filters,
                };
            }

            return ctx.prisma.listing.findMany(queryOptions);
        }),

    getAllSortedByPopularityWithFilters: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                switchType: z.string().optional(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { searchQuery, switchType } = input;

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
                },
            };

            const filters: Prisma.ListingWhereInput[] = [];
            if (searchQuery) {
                filters.push({
                    title: {
                        contains: searchQuery,
                        // mode: "insensitive",
                    },
                });
            }
            if (switchType) {
                filters.push({
                    switchType: {
                        equals: switchType,
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
            const listingsWithCommentCounts = listings.map((listing) => {
                const commentCount =
                    commentCounts.find((c) => c.typeId === listing.id)
                        ?._count ?? 0;
                return { ...listing, commentCount };
            });

            // Step 4: Sort listings by comment counts
            listingsWithCommentCounts.sort(
                (a, b) => b.commentCount - a.commentCount
            );

            return listingsWithCommentCounts;
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
                                resourceId: newListing.id,
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
