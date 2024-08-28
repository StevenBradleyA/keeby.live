import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

export const rankRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.rank.findMany();
    }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                image: z.array(
                    z.object({
                        link: z.string(),
                    }),
                ),
                minWpm: z.number(),
                maxWpm: z.number(),
                standing: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { name, minWpm, maxWpm, image, standing } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            if (image && image[0]) {
                await ctx.db.rank.create({
                    data: {
                        name: name,
                        image: image[0].link,
                        minWpm: minWpm,
                        maxWpm: maxWpm,
                        standing: standing,
                    },
                });

                const tagCheck = await ctx.db.tag.findFirst({
                    where: {
                        name: name,
                    },
                });

                if (!tagCheck) {
                    await ctx.db.tag.create({
                        data: {
                            name: name,
                            description: `Unlocked when a user reaches rank ${name}`,
                        },
                    });
                }

                return "successfully created new rank";
            }
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                maxWpm: z.number(),
                minWpm: z.number(),
                standing: z.number(),
                image: z.string(),
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
            const { id, name, minWpm, maxWpm, images, image, standing } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            if (images && images[0]) {
                await removeFileFromS3(image);

                await ctx.db.rank.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        minWpm: minWpm,
                        maxWpm: maxWpm,
                        standing: standing,
                        image: images[0].link,
                    },
                });
                return "successfully updated";
            } else {
                await ctx.db.rank.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        minWpm: minWpm,
                        maxWpm: maxWpm,
                        standing: standing,
                    },
                });
                return "successfully updated";
            }
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                image: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, image } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            await removeFileFromS3(image);

            return ctx.db.rank.delete({
                where: { id: id },
            });
        }),
});
