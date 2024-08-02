import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";

// todo assign tags at certain ranks in keeb type

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
                    }),
                ),
                minWpm: z.number(),
                maxWpm: z.number(),
                standing: z.number(),
            }),
        )
        .mutation(({ ctx, input }) => {
            if (ctx.session.user.isAdmin && input.image[0]) {
                return ctx.prisma.rank.create({
                    data: {
                        name: input.name,
                        image: input.image[0].link,
                        minWpm: input.minWpm,
                        maxWpm: input.maxWpm,
                        standing: input.standing,
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
                standing: z.number(),
                oldImage: z.string(),
                image: z.array(
                    z.object({
                        link: z.string(),
                    }),
                ),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, name, minWpm, maxWpm, image, oldImage, standing } =
                input;

            if (ctx.session.user.isAdmin && image[0]) {
                await removeFileFromS3(oldImage);

                return await ctx.db.rank.update({
                    where: {
                        id: id,
                    },
                    data: {
                        name: name,
                        minWpm: minWpm,
                        maxWpm: maxWpm,
                        standing: standing,
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
            }),
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
