import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const offerRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const offersSent = await ctx.prisma.listingOffer.findMany({
                where: {
                    buyerId: userId,
                    listing: {
                        status: {
                            not: "SOLD",
                        },
                    },
                },
                include: {
                    listing: {
                        select: {
                            id: true,
                            title: true,
                            sellerId: true,
                            status: true,
                            seller: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });

            const offersReceived = await ctx.prisma.listing.findMany({
                where: {
                    sellerId: userId,
                    listingOffer: {
                        some: {},
                    },
                    status: {
                        not: "SOLD",
                    },
                },
                include: {
                    listingOffer: {
                        select: {
                            id: true,
                            price: true,
                            status: true,
                            createdAt: true,
                            updatedAt: true,
                            listingId: true,
                            buyerId: true,
                            buyer: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });

            return { offersSent, offersReceived };
        }),

    create: protectedProcedure
        .input(
            z.object({
                price: z.number(),
                listingId: z.string(),
                buyerId: z.string(),
                buyerUsername: z.string(),
                sellerId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { price, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== buyerId) {
                throw new Error("Invalid userId");
            }
            if (sellerId === buyerId) {
                throw new Error("Cannot send offer to your own listing");
            }

            const listingCheck = await ctx.prisma.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            if (listingCheck?.status === "SOLD") {
                return { pendingOffer: true };
            }

            const offerCheck = await ctx.prisma.listingOffer.findMany({
                where: {
                    listingId: listingId,
                    buyerId: buyerId,
                },
            });
            if (offerCheck && offerCheck.length > 0) {
                return { pendingOffer: true };
            } else {
                const createOffer = await ctx.prisma.listingOffer.create({
                    data: {
                        price: price,
                        status: "PENDING",
                        listingId: listingId,
                        buyerId: buyerId,
                    },
                });
                if (createOffer && listingCheck) {
                    await ctx.prisma.notification.create({
                        data: {
                            userId: listingCheck.sellerId,
                            text: `Offer Received for ${listingCheck.title}!`,
                            type: "OFFER",
                            status: "UNREAD",
                        },
                    });

                    //todo send email to seller -- get unique --if seller exists email
                    return { pendingOffer: false };
                }
            }
        }),

    update: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                listingId: z.string(),
                buyerId: z.string(),
                sellerId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== sellerId) {
                throw new Error(
                    "You do not have the necessary permissions to perform this action."
                );
            }

            const buyer = await ctx.prisma.user.findUnique({
                where: {
                    id: buyerId,
                },
            });

            if (buyer && buyer.email) {
                //todo send buyer email here

                await ctx.prisma.listing.update({
                    where: {
                        id: listingId,
                    },
                    data: {
                        status: "PENDING",
                    },
                });
                await ctx.prisma.listingOffer.update({
                    where: {
                        id: id,
                    },
                    data: {
                        status: "ACCEPTED",
                    },
                });
                const listingCheck = await ctx.prisma.listing.findUnique({
                    where: { id: listingId },
                });

                if (listingCheck) {
                    await ctx.prisma.notification.create({
                        data: {
                            userId: buyerId,
                            text: `Your offer was accepted for ${listingCheck.title}!`,
                            type: "OFFER",
                            status: "UNREAD",
                        },
                    });
                }

                return "Successfully Updated";
            }
            throw new Error("Buyer does not exist or has no valid email.");
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                sellerId: z.string(),
                buyerId: z.string(),
                listingId: z.string(),
                listingStatus: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId, buyerId, listingStatus, listingId } = input;

            if (ctx.session.user.id !== sellerId && !ctx.session.user.isAdmin) {
                throw new Error(
                    "You do not have the necessary permissions to perform this action."
                );
            }
            const buyer = await ctx.prisma.user.findUnique({
                where: {
                    id: buyerId,
                },
            });

            if (buyer && buyer.email) {
                //todo send buyer email here

                await ctx.prisma.listingOffer.delete({
                    where: { id: id },
                });

                if (listingStatus === "PENDING") {
                    await ctx.prisma.listing.update({
                        where: {
                            id: listingId,
                        },
                        data: {
                            status: "ACTIVE",
                        },
                    });

                    return "Deleted and Active";
                }

                return "Successfully Deleted";
            }
            throw new Error("Buyer does not exist or has no valid email.");
        }),
});
