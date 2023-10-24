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
});
