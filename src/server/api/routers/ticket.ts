import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.db.ticket.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        username: true,
                        profile: true,
                    },
                },
            },
        });
    }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                text: z.string(),
                email: z.string(),
                tag: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, text, email, tag } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid Credentials");
            }

            if (tag === "praise") {
                const existingTag = await ctx.db.tag.findUnique({
                    where: {
                        name: "PraiseTheSun",
                    },
                });
                if (existingTag) {
                    const doesUserOwnTag = await ctx.db.user.findUnique({
                        where: { id: userId },
                        select: {
                            tags: {
                                where: {
                                    id: existingTag.id,
                                },
                                select: {
                                    id: true,
                                },
                            },
                        },
                    });

                    if (doesUserOwnTag && doesUserOwnTag.tags.length === 0) {
                        await ctx.db.user.update({
                            where: { id: userId },
                            data: {
                                tags: {
                                    connect: {
                                        id: existingTag.id,
                                    },
                                },
                            },
                        });

                        await ctx.db.notification.create({
                            data: {
                                userId: userId,
                                text: `New tag unlocked: PraiseTheSun!`,
                                type: "TAG",
                                status: "UNREAD",
                            },
                        });
                    }
                }
            }

            return await ctx.db.ticket.create({
                data: {
                    userId: userId,
                    text: text,
                    email: email,
                    tag: tag,
                },
            });
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id } = input;
            if (!ctx.session.user.isAdmin) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            await ctx.db.ticket.delete({
                where: { id: id },
            });
        }),
});
