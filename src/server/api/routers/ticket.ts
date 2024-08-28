import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const ticketRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                typeQuery: z.string().optional(),
            }),
        )
        .query(({ input, ctx }) => {
            const { typeQuery } = input;
            const whereFilters = {
                AND: [
                    typeQuery
                        ? {
                              OR: [
                                  {
                                      type: {
                                          contains: typeQuery,
                                      },
                                  },
                              ],
                          }
                        : {},
                ].filter((obj) => Object.keys(obj).length > 0),
            };
            return ctx.db.ticket.findMany({
                where: {
                    ...whereFilters,
                },
                include: {
                    user: {
                        select: {
                            id: true,
                            username: true,
                            profile: true,
                        },
                    },
                },
                take: 50,
            });
        }),

    create: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                text: z.string(),
                email: z.string(),
                type: z.string(),
            }),
        )
        .mutation(async ({ ctx, input }) => {
            const { userId, text, email, type } = input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid Credentials");
            }

            if (type === "praise") {
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
                    type: type,
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
