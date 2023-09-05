import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

export const imageRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(({ ctx, input }) => {
            return ctx.prisma.images.findMany({
                where: { userId: input },
            });
        }),
    getAllByResourceType: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                resourceType: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.images.findMany({
                where: {
                    userId: input.userId,
                    resourceType: input.resourceType,
                },
            });
        }),
    getAllByResourceId: publicProcedure
        .input(
            z.object({
                resourceType: z.string(),
                resourceId: z.string(),
            })
        )
        .query(({ ctx, input }) => {
            return ctx.prisma.images.findMany({
                where: {
                    resourceType: input.resourceType,
                    resourceId: input.resourceId,
                },
            });
        }),
    create: protectedProcedure
        .input(
            z.object({
                images: z.array(
                    z.object({
                        link: z.string(),
                        resourceType: z.string(),
                        resourceId: z.string(),
                        userId: z.string(),
                    })
                ),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { images } = input;

            const createdImages = images.map(async (image) => {
                return ctx.prisma.images.create({
                    data: {
                        link: image.link,
                        resourceType: image.resourceType,
                        resourceId: image.resourceId,
                        userId: image.userId,
                    },
                });
            });

            return createdImages;
        }),
    delete: protectedProcedure
        .input(
            z.object({
                imageIds: z.array(z.string()),
                userId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { imageIds, userId } = input;

            if (ctx.session.user.id === userId) {
                const images = await ctx.prisma.images.findMany({
                    where: {
                        id: { in: imageIds },
                    },
                });

                const removeFilePromises = images.map(async (image) => {
                    try {
                        await removeFileFromS3(image.link);
                    } catch (err) {
                        console.error(`Failed to remove file from S3: ${err}`);
                        throw new Error(
                            `Failed to remove file from S3: ${err}`
                        );
                    }
                });

                await Promise.all(removeFilePromises);

                await ctx.prisma.images.deleteMany({
                    where: {
                        id: { in: imageIds },
                    },
                });

                return "Successfully deleted";
            } else {
                throw new Error(
                    "You do not have permission to delete these images"
                );
            }
        }),
});
