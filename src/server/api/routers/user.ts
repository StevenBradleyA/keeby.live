import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
    getAllUsers: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.user.findMany({
            where: { isNew: false },
            include: {
                images: {
                    select: {
                        link: true,
                    },
                },
            },
            orderBy: {
                name: "asc",
            },
        });
    }),
});
