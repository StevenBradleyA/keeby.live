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
    // getAllByResourceId: publicProcedure
    //     .input(
    //         z.object({
    //             resourceType: z.string(),
    //             resourceId: z.string(),
    //         })
    //     )
    //     .query(({ ctx, input }) => {
    //         return ctx.prisma.images.findMany({
    //             where: {
    //                 resourceType: input.resourceType,
    //                 resourceId: input.resourceId,
    //             },
    //         });
    //     }),

    getCombinedListingImages: publicProcedure
        .input(
            z.object({
                listingId: z.string(),
            })
        )
        .query(async ({ ctx, input }) => {
            const listingImages = await ctx.prisma.images.findMany({
                where: {
                    resourceType: "LISTING",
                    listingId: input.listingId,
                },
            });
            const listingPreviewImages = await ctx.prisma.images.findMany({
                where: {
                    resourceType: "LISTINGPREVIEW",
                    listingId: input.listingId,
                },
            });

            return [...listingPreviewImages, ...listingImages];
        }),
});
