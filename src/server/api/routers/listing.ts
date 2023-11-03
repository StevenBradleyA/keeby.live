import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

export const listingRouter = createTRPCRouter({
    // getAll: publicProcedure.query(({ ctx }) => {
    //     return ctx.prisma.listing.findMany();
    // }),
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.listing.findMany();
    }),

    // create: protectedProcedure
    // .input(
    //     z.object({
    //         text: z.string(),
    //         starRating: z.number(),
    //         userId: z.string(),
    //         bookingId: z.string(),
    //         images: z
    //             .array(
    //                 z.object({
    //                     link: z.string(),
    //                 })
    //             )
    //             .optional(),
    //     })
    // )
    // .mutation(async ({ input, ctx }) => {
    //     const { text, starRating, userId, bookingId, images } = input;
    //     if (ctx.session.user.id === userId) {
    //         const newReview = await ctx.prisma.review.create({
    //             data: { text, starRating, userId, bookingId },
    //         });
    //         if (images) {
    //             const createdImages = images.map(async (image) => {
    //                 return ctx.prisma.images.create({
    //                     data: {
    //                         link: image.link,
    //                         resourceType: "REVIEW",
    //                         resourceId: newReview.id,
    //                         userId: newReview.userId,
    //                     },
    //                 });
    //             });
    //             return {
    //                 newReview,
    //                 createdImages,
    //             };
    //         }
    //         return { newReview };
    //     }

    //     throw new Error("Invalid userId");
    // }),
    create: protectedProcedure.input(
        z
            .object({
                title: z.string(),
                text: z.string(),
                price: z.number(),
                preview: z.number(),
                userId: z.string(),
                images: z.array(
                    z.object({
                        link: z.string(),
                    })
                ),
            })
            .mutation(async ({ input, ctx }) => {
                const { title, text, price, preview, userId, images } = input;

                if (ctx.session.user.id === userId) {
                    const newListing = await ctx.prisma.listing.create({
                        data: { title, text, price, userId },
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
            })
    ),
    //     .mutation(async ({ input, ctx }) => {
    //         if (ctx.session.user.id === input.userId) {
    //             const newPost = await ctx.prisma.post.create({ data: input });

    //             return newPost;
    //         }

    //         throw new Error("Invalid userId");
    //     }),

    // update: protectedProcedure
    //     .input(
    //         z.object({
    //             id: z.string(),
    //             userId: z.string(),
    //             title: z.string().optional(),
    //             text: z.string().optional(),
    //             price: z.number().optional(),
    //             stock: z.number().optional(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         if (ctx.session.user.id === input.userId) {
    //             const updatedPost = await ctx.prisma.post.update({
    //                 where: {
    //                     id: input.id,
    //                 },
    //                 data: input,
    //             });

    //             return updatedPost;
    //         }

    //         throw new Error("Invalid userId");
    //     }),

    // delete: protectedProcedure
    //     .input(z.object({ id: z.string(), userId: z.string() }))
    //     .mutation(async ({ input, ctx }) => {
    //         if (ctx.session.user.id === input.userId) {
    //             await ctx.prisma.post.delete({ where: { id: input.id } });

    //             return "Successfully deleted";
    //         }

    //         throw new Error("Invalid userId");
    //     }),
});
