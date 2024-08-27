import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const shopRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                link: z.string(),
                image: z.string(),
                type: z.string(),
                price: z.number(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { name, link, image, type, price } = input;

            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            await ctx.db.shop.create({
                data: {
                    name: name,
                    link: link,
                    image: image,
                    type: type,
                    price: price,
                },
            });

            return {
                success: true,
                message: "Shop Link successfully posted.",
            };
        }),
});
