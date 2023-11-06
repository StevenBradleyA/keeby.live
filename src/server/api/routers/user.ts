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
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, username, images, name, switches, keycaps } = input;
            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            const updateData: {
                username: string;
                hasProfile?: boolean;
                profile?: string;
            } = {
                username,
                hasProfile: true,
            };

            if (images && images[0]) {
                updateData.profile = images[0].link;
            }
            const createKeeb = await ctx.prisma.keeb.create({
                data: {
                    name,
                    switches,
                    keycaps,
                    userId,
                },
            });

            const updatedUser = await ctx.prisma.user.update({
                where: { id: userId },
                data: updateData,
            });

            return { createKeeb, updatedUser };
        }),
});
