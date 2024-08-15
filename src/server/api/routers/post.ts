import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";
import type { Images, Prisma, Post } from "@prisma/client";
import { id } from "date-fns/locale";

type CreateData = {
    title: string;
    text?: string;
    link?: string;
    userId: string;
    tag: string;
};

interface UserPostPreview {
    id: string;
    title: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
}

interface UserWithPosts {
    id: string;
    username: string | null;
    profile: string | null;
    selectedTag: string | null;
    internetPoints: number;
    posts: UserPostPreview[];
}

interface PostWithCount {
    id: string;
    title: string;
    text: string | null;
    tag: string;
    link: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: {
        comments: number;
        postLikes: number;
        favorites: number;
    };
    images: Images[];
    user: {
        id: string;
        profile: string | null;
        username: string | null;
    };
}

interface PostPage {
    id: string;
    title: string;
    text: string | null;
    tag: string;
    link: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: {
        comments: number;
        postLikes: number;
        favorites: number;
    };
    images: Images[];
    user: UserWithPosts;
}
type ExtendedPost = Post & {
    images: Images[];
    _count: {
        comments: number;
        postLikes: number;
    };
    previewIndex?: number;
};

// todo potentially not update user if post id matches userId so they dont gain points for liking their own stuff.. this would prevent farming

export const postRouter = createTRPCRouter({
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

            return ctx.prisma.post.findMany({
                where: {
                    ...whereFilters,
                },
                select: {
                    id: true,
                    title: true,
                    userId: true,
                    images: {
                        where: {
                            resourceType: "POSTPREVIEW",
                        },
                    },
                },
            });
        }),
    getAllByUserId: publicProcedure
        .input(
            z.object({
                userId: z.string(),
            }),
        )
        .query(async ({ input, ctx }): Promise<ExtendedPost[]> => {
            const { userId } = input;

            const allUserPosts = await ctx.db.post.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    images: true,
                    _count: {
                        select: { comments: true, postLikes: true },
                    },
                },
            });

            return allUserPosts.map((post) => {
                const previewIndex =
                    post.images && post.images.length > 0
                        ? post.images.findIndex(
                              (image) => image.resourceType === "POSTPREVIEW",
                          )
                        : -1;

                return {
                    ...post,
                    ...(previewIndex !== -1 && { previewIndex }),
                };
            });
        }),

    getAllPreviewPosts: publicProcedure
        .input(
            z.object({
                search: z.string().optional(),
                tag: z.string().optional(),
                filter: z.string().optional(),
                userId: z.string().optional(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { search, tag, filter, userId } = input;
            console.log("HEYYYYYY", filter)

            const whereFilters: Prisma.PostWhereInput = {
                AND: [
                    tag ? { tag } : {},
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

            const posts: PostWithCount[] = await ctx.db.post.findMany({
                where: whereFilters,
                include: {
                    _count: {
                        select: {
                            comments: true,
                            postLikes: true,
                            favorites: true,
                        },
                    },
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            profile: true,
                            username: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
            });

            // we need to sort preview images to be first
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

            if (userId) {
                const likesMap = new Map(
                    await ctx.db.postLike
                        .findMany({
                            where: {
                                userId: userId,
                                postId: { in: posts.map((post) => post.id) },
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                const favoritesMap = new Map(
                    await ctx.db.favorites
                        .findMany({
                            where: {
                                userId: userId,
                                postId: { in: posts.map((post) => post.id) },
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                posts.forEach((post) => {
                    post.isLiked = likesMap.has(post.id);
                    post.likeId = likesMap.get(post.id);
                    post.isFavorited = favoritesMap.has(post.id);
                    post.favoriteId = favoritesMap.get(post.id);
                });
            }

            // by default we want to return popular posts ---
            if (filter === "new") {
                return {
                    posts,
                };
            } else {
                const popularPosts = posts.sort((a, b) => {
                    const totalA = a._count.comments + a._count.postLikes;
                    const totalB = b._count.comments + b._count.postLikes;
                    return totalB - totalA;
                });
                return {
                    posts: popularPosts,
                };
            }
        }),

    getAllNewPreviewPosts: publicProcedure
        .input(
            z.object({
                userId: z.string().optional(),
                postId: z.string(),
            }),
        )
        .query(async ({ ctx, input }) => {
            const { userId, postId } = input;

            const limit = 5;

            const posts: PostWithCount[] = await ctx.db.post.findMany({
                where: {
                    id: {
                        not: postId,
                    },
                },
                include: {
                    _count: {
                        select: {
                            comments: true,
                            postLikes: true,
                            favorites: true,
                        },
                    },
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                    },
                    user: {
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

            // we need to sort preview images to be first
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

            if (userId) {
                const likesMap = new Map(
                    await ctx.db.postLike
                        .findMany({
                            where: {
                                userId: userId,
                                postId: { in: posts.map((post) => post.id) },
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                const favoritesMap = new Map(
                    await ctx.db.favorites
                        .findMany({
                            where: {
                                userId: userId,
                                postId: { in: posts.map((post) => post.id) },
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                posts.forEach((post) => {
                    post.isLiked = likesMap.has(post.id);
                    post.likeId = likesMap.get(post.id);
                    post.isFavorited = favoritesMap.has(post.id);
                    post.favoriteId = favoritesMap.get(post.id);
                });
            }

            return {
                posts,
            };
        }),

    // getAllPopularPreviewPosts: publicProcedure
    //     .input(
    //         z.object({
    //             searchQuery: z.string().optional(),
    //             tag: z.string().optional(),
    //             userId: z.string().optional(),
    //             cursor: z.string().nullish(),
    //             limit: z.number().min(1).max(100).nullish(),
    //         }),
    //     )
    //     .query(async ({ ctx, input }) => {
    //         const { searchQuery, tag, cursor, userId } = input;

    //         const limit = input.limit ?? 8;

    //         const whereFilters: Prisma.PostWhereInput = {
    //             AND: [
    //                 tag ? { tag } : {},
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

    //         const posts: PostWithCount[] = await ctx.db.post.findMany({
    //             where: whereFilters,
    //             include: {
    //                 _count: {
    //                     select: { comments: true, postLikes: true },
    //                 },
    //                 images: {
    //                     where: {
    //                         OR: [
    //                             { resourceType: "POSTPREVIEW" },
    //                             { resourceType: "POST" },
    //                         ],
    //                     },
    //                 },
    //                 user: {
    //                     select: {
    //                         id: true,
    //                     },
    //                 },
    //             },
    //             orderBy: { createdAt: "desc" },
    //             take: limit + 1,
    //             skip: cursor ? 1 : 0,
    //             cursor: cursor ? { id: cursor } : undefined,
    //         });

    //         // we need to sort preview images to be first
    //         posts.forEach((post) => {
    //             post.images.sort((a, b) => {
    //                 if (
    //                     a.resourceType === "POSTPREVIEW" &&
    //                     b.resourceType !== "POSTPREVIEW"
    //                 ) {
    //                     return -1;
    //                 } else if (
    //                     a.resourceType !== "POSTPREVIEW" &&
    //                     b.resourceType === "POSTPREVIEW"
    //                 ) {
    //                     return 1;
    //                 }
    //                 return 0;
    //             });
    //         });

    //         if (userId) {
    //             const likesMap = new Map(
    //                 await ctx.db.postLike
    //                     .findMany({
    //                         where: {
    //                             userId: userId,
    //                             postId: { in: posts.map((post) => post.id) },
    //                         },
    //                         select: { postId: true, id: true },
    //                     })
    //                     .then((results) =>
    //                         results.map((result) => [result.postId, result.id]),
    //                     ),
    //             );

    //             const favoritesMap = new Map(
    //                 await ctx.db.favorites
    //                     .findMany({
    //                         where: {
    //                             userId: userId,
    //                             postId: { in: posts.map((post) => post.id) },
    //                         },
    //                         select: { postId: true, id: true },
    //                     })
    //                     .then((results) =>
    //                         results.map((result) => [result.postId, result.id]),
    //                     ),
    //             );

    //             posts.forEach((post) => {
    //                 post.isLiked = likesMap.has(post.id);
    //                 post.likeId = likesMap.get(post.id);
    //                 post.isFavorited = favoritesMap.has(post.id);
    //                 post.favoriteId = favoritesMap.get(post.id);
    //             });
    //         }

    //         // sort by popularity (comment count)
    //         // lets sort by combined number of posts and comment count
    //         const popularPosts = posts.sort((a, b) => {
    //             const totalA = a._count.comments + a._count.postLikes;
    //             const totalB = b._count.comments + b._count.postLikes;
    //             return totalB - totalA;
    //         });

    //         let nextCursor: typeof cursor | undefined = undefined;
    //         if (popularPosts.length > limit) {
    //             const nextItem = popularPosts.pop(); // Remove the extra item
    //             if (nextItem !== undefined) {
    //                 nextCursor = nextItem.id; // Set the next cursor to the ID of the extra item
    //             }
    //         }

    //         return {
    //             posts: popularPosts,
    //             nextCursor,
    //         };
    //     }),

    getOneById: publicProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string().optional(),
            }),
        )
        .query(async ({ input, ctx }) => {
            const { userId, id } = input;

            const postResult = await ctx.db.post.findUnique({
                where: {
                    id: id,
                },
                include: {
                    _count: {
                        select: {
                            comments: true,
                            postLikes: true,
                            favorites: true,
                        },
                    },
                    images: {
                        where: {
                            OR: [
                                { resourceType: "POSTPREVIEW" },
                                { resourceType: "POST" },
                            ],
                        },
                    },
                    user: {
                        select: {
                            id: true,
                            internetPoints: true,
                            profile: true,
                            username: true,
                            selectedTag: true,
                            posts: {
                                take: 4,
                                orderBy: {
                                    createdAt: "desc",
                                },
                                where: {
                                    NOT: {
                                        id: id,
                                    },
                                },
                                select: {
                                    id: true,
                                    title: true,
                                    _count: {
                                        select: {
                                            comments: true,
                                            postLikes: true,
                                            favorites: true,
                                        },
                                    },
                                    images: {
                                        where: { resourceType: "POSTPREVIEW" },
                                    },
                                },
                            },
                        },
                    },
                },
            });
            if (!postResult) {
                throw new Error("Post not found");
            }
            // we need to sort preview images to be first
            postResult.images.sort((a, b) => {
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

            const post: PostPage = postResult;

            if (userId) {
                const likesMap = new Map(
                    await ctx.db.postLike
                        .findMany({
                            where: {
                                userId: userId,
                                postId: id,
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                const favoritesMap = new Map(
                    await ctx.db.favorites
                        .findMany({
                            where: {
                                userId: userId,
                                postId: id,
                            },
                            select: { postId: true, id: true },
                        })
                        .then((results) =>
                            results.map((result) => [result.postId, result.id]),
                        ),
                );

                post.isLiked = likesMap.has(post.id);
                post.likeId = likesMap.get(post.id);
                post.isFavorited = favoritesMap.has(post.id);
                post.favoriteId = favoritesMap.get(post.id);
            }

            return post;
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                title: z.string(),
                tag: z.string(),
                text: z.string().optional(),
                link: z.string().optional(),
                preview: z.number().optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        }),
                    )
                    .optional(),
            }),
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

                const newPost = await ctx.db.post.create({
                    data: createData,
                });

                if (images && preview !== undefined) {
                    const createdImages = await Promise.all(
                        images.map(async (image, i) => {
                            const imageType =
                                i === preview ? "POSTPREVIEW" : "POST";

                            return ctx.db.images.create({
                                data: {
                                    link: image.link,
                                    resourceType: imageType,
                                    postId: newPost.id,
                                    userId: userId,
                                },
                            });
                        }),
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

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                title: z.string(),
                tag: z.string(),
                text: z.string().optional(),
                link: z.string().optional(),
                userId: z.string(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        }),
                    )
                    .optional(),
                preview: z
                    .object({ source: z.string(), index: z.number() })
                    .optional(),
                deleteImageIds: z.array(z.string()).optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const {
                id,
                title,
                tag,
                link,
                text,
                preview,
                userId,
                images,
                deleteImageIds,
            } = input;

            if (ctx.session.user.id === userId) {
                const updateData: CreateData = {
                    title,
                    tag,
                    userId,
                };

                if (link?.length) {
                    updateData.link = link;
                }
                if (text?.length) {
                    updateData.text = text;
                }

                const updatePost = await ctx.db.post.update({
                    where: { id: id },
                    data: updateData,
                });

                if (images || deleteImageIds || preview) {
                    await ctx.db.images.updateMany({
                        where: {
                            postId: id,
                            resourceType: "POSTPREVIEW",
                        },
                        data: {
                            resourceType: "POST",
                        },
                    });

                    if (preview && preview.source === "prev") {
                        const allExistingImages = await ctx.db.images.findMany({
                            where: {
                                postId: id,
                            },
                        });
                        const imageToUpdate = allExistingImages[preview.index];
                        if (imageToUpdate) {
                            await ctx.db.images.update({
                                where: {
                                    id: imageToUpdate.id,
                                },
                                data: {
                                    resourceType: "POSTPREVIEW",
                                },
                            });
                        }
                    }
                    if (images && images.length > 0 && preview) {
                        await Promise.all(
                            images.map(async (image, i) => {
                                const imageType =
                                    preview.source === "new" &&
                                    preview.index === i
                                        ? "POSTPREVIEW"
                                        : "POST";

                                return ctx.prisma.images.create({
                                    data: {
                                        link: image.link,
                                        resourceType: imageType,
                                        postId: id,
                                        userId: userId,
                                    },
                                });
                            }),
                        );
                    }

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
                                console.error(
                                    `Failed to remove file from S3: `,
                                    err,
                                );
                                throw new Error(
                                    `Failed to remove file from S3: `,
                                );
                            }
                        });

                        await Promise.all(removeFilePromises);

                        await ctx.db.images.deleteMany({
                            where: {
                                id: { in: deleteImageIds },
                            },
                        });
                    }
                }

                return updatePost;
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                userId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, userId } = input;
            if (ctx.session.user.id === userId || ctx.session.user.isAdmin) {
                const images = await ctx.db.images.findMany({
                    where: {
                        postId: id,
                    },
                });

                if (images.length > 0) {
                    const imageIds = images.map((image) => image.id);
                    const removeFilePromises = images.map((image) =>
                        removeFileFromS3(image.link),
                    );
                    try {
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
            }

            await ctx.db.post.delete({ where: { id: id } });

            return "Successfully deleted";
        }),
});
