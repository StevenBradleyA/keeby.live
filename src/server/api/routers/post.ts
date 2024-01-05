import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

import { removeFileFromS3 } from "../utils";

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.post.findMany();
    }),
    // todo what about separate get routes for different filters? how do we keep track of popularity?? page views comments likes etc.
    create: protectedProcedure
    .input(
        z.object({
            title: z.string(),
            text: z.string(),
            preview: z.number(),
            userId: z.string(),
            images: z.array(
                z.object({
                    link: z.string(),
                })
            ),
        })
    )
    .mutation(async ({ input, ctx }) => {
        const { title, text, preview, userId, images } = input;

        if (ctx.session.user.id === userId) {
            const newListing = await ctx.prisma.post.create({
                data: { title, text, userId },
            });

            const createdImages = await Promise.all(
                images.map(async (image, i) => {
                    const imageType =
                        i === preview ? "POSTPREVIEW" : "POST";

                    return ctx.prisma.images.create({
                        data: {
                            link: image.link,
                            resourceType: imageType,
                            resourceId: newListing.id,
                            userId: newListing.userId,
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

                await ctx.prisma.post.delete({ where: { id: id } });

                return "Successfully deleted";
            }

            throw new Error("Invalid userId");
        }),

   
});
