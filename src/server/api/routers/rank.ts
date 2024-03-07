import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { removeFileFromS3 } from "../utils";

export const rankRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.rank.findMany();
    }),

    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                image: z.array(
                    z.object({
                        link: z.string(),
                    })
                ),
                minWpm: z.number(),
                maxWpm: z.number(),
            })
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.isAdmin && input.image[0]) {
                return ctx.prisma.rank.create({
                    data: {
                        name: input.name,
                        image: input.image[0].link,
                        minWpm: input.minWpm,
                        maxWpm: input.maxWpm,
                    },
                });
            }

            throw new Error("You must be admin to perform this action.");
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                name: z.string(),
                maxWpm: z.number(),
                minWpm: z.number(),
                oldImage: z.string(),
                image: z.array(
                    z.object({
                        link: z.string(),
                    })
                ),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, name, minWpm, maxWpm, image, oldImage } = input;

            if (ctx.session.user.isAdmin && image[0]) {
                await removeFileFromS3(oldImage);

                return await ctx.prisma.rank.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        minWpm: minWpm,
                        maxWpm: maxWpm,
                        image: image[0].link,
                    },
                });
            }

            throw new Error("Invalid userId");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                image: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, image } = input;
            if (ctx.session.user.isAdmin) {
                await removeFileFromS3(image);

                return ctx.prisma.rank.delete({
                    where: { id: id },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),
});
