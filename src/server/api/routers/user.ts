import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    usernameCheck: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            const user = await ctx.prisma.user.findFirst({
                where: { username: input },
            });
            return Boolean(user);
        }),

    updateNewUser: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                username: z.string(),
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
            const { userId, username, images } = input;
            if (ctx.session.user.id === userId) {
                const updateData: {
                    username: string;
                    hasProfile?: boolean;
                    profile?: string;
                } = {
                    username,
                    hasProfile: true,
                };

                if (images && images.length > 0) {
                    updateData.profile = images[0]?.link;
                }

                return await ctx.prisma.user.update({
                    where: { id: ctx.session.user.id },
                    data: updateData,
                });
            }

            throw new Error("Invalid userId");
        }),
});
