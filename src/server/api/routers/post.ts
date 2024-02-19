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
    text?: string;
    link?: string;
    userId: string;
    tag: string;
};

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                tag: true,
                images: {
                    where: {
                        OR: [
                            { resourceType: "POSTPREVIEW" },
                            { resourceType: "POST" },
                        ],
                    },
                    select: { id: true, link: true },
                },
            },
        });
    }),
    getAllNewPreviewPosts: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                tag: z.string().optional(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { searchQuery, tag, cursor } = input;

            const limit = input.limit ?? 10;

            // Build the dynamic filters based on the input
            const whereFilters: Prisma.PostWhereInput = {
                AND: [
                    tag ? { tag } : {},
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
                                      text: {
                                          contains: searchQuery,
                                          mode: "insensitive",
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };

            const posts = await ctx.prisma.post.findMany({
                where: whereFilters,
                include: {
                    _count: {
                        select: { comments: true },
                    },
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: limit + 1,
                skip: cursor ? 1 : 0,
                cursor: cursor ? { id: cursor } : undefined,
            });

            let nextCursor: typeof cursor | undefined = undefined;
            if (posts.length > limit) {
                const nextItem = posts.pop(); // Remove the extra item
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id; // Set the next cursor to the ID of the extra item
                }
            }

            return {
                posts,
                nextCursor,
            };
        }),

    getAllPopularPreviewPosts: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
                tag: z.string().optional(),
                cursor: z.string().nullish(),
                limit: z.number().min(1).max(100).nullish(),
            })
        )
        .query(async ({ ctx, input }) => {
            const { searchQuery, tag, cursor } = input;

            const limit = input.limit ?? 10;

            // Build the dynamic filters based on the input
            const whereFilters: Prisma.PostWhereInput = {
                AND: [
                    tag ? { tag } : {},
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
                                      text: {
                                          contains: searchQuery,
                                          mode: "insensitive",
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };

            const posts = await ctx.prisma.post.findMany({
                where: whereFilters,
                include: {
                    _count: {
                        select: { comments: true },
                    },
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                take: limit + 1,
                skip: cursor ? 1 : 0,
                cursor: cursor ? { id: cursor } : undefined,
            });

            // sort by popularity (comment count)
            const popularPosts = posts.sort(
                (a, b) => b._count.comments - a._count.comments
            );

            let nextCursor: typeof cursor | undefined = undefined;
            if (popularPosts.length > limit) {
                const nextItem = popularPosts.pop(); // Remove the extra item
                if (nextItem !== undefined) {
                    nextCursor = nextItem.id; // Set the next cursor to the ID of the extra item
                }
            }

            return {
                posts: popularPosts,
                nextCursor,
            };
        }),

    getOne: publicProcedure
        .input(
            z.object({
                id: z.string(),
            })
        )
        .query(({ input, ctx }) => {
            return ctx.prisma.post.findUnique({
                where: {
                    id: input.id,
                },
                select: {
                    id: true,
                    userId: true,
                    title: true,
                    text: true,
                    link: true,
                    tag: true,
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                        select: { id: true, link: true },
                    },
                },
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                title: z.string(),
                tag: z.string(),
                text: z.string().optional(),
                link: z.string().optional(),
                preview: z.number().optional(),
                userId: z.string(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        })
                    )
                    .optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { title, tag, link, text, preview, userId, images } = input;

            if (ctx.session.user.id === userId) {
                const createData: CreateData = {
                    title,
                    tag,
                    userId,
                };
                if (link?.length) {
                    createData.link = link;
                }
                if (text?.length) {
                    createData.text = text;
                }

                const newPost = await ctx.prisma.post.create({
                    data: createData,
                });

                if (images && preview !== undefined) {
                    const createdImages = await Promise.all(
                        images.map(async (image, i) => {
                            const imageType =
                                i === preview ? "POSTPREVIEW" : "POST";

                            return ctx.prisma.images.create({
                                data: {
                                    link: image.link,
                                    resourceType: imageType,
                                    postId: newPost.id,
                                    userId: userId,
                                },
                            });
                        })
                    );

                    return {
                        newPost,
                        createdImages,
                    };
                }

                return {
                    newPost,
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

                await ctx.prisma.post.delete({ where: { id: id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),
});
