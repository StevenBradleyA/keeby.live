import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

import { removeFileFromS3 } from "../utils";

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
                if (images && preview) {
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
