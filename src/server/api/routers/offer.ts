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
            const offersSent = await ctx.db.listingOffer.findMany({
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

            const offersReceived = await ctx.db.listing.findMany({
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
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { price, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== buyerId) {
                throw new Error("Invalid userId");
            }
            if (sellerId === buyerId) {
                throw new Error("Cannot send offer to your own listing");
            }

            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            if (listingCheck?.status === "SOLD") {
                return { pendingOffer: true };
            }

            const offerCheck = await ctx.db.listingOffer.findMany({
                where: {
                    listingId: listingId,
                    buyerId: buyerId,
                },
            });
            if (offerCheck && offerCheck.length > 0) {
                return { pendingOffer: true };
            } else {
                const createOffer = await ctx.db.listingOffer.create({
                    data: {
                        price: price,
                        listingId: listingId,
                        buyerId: buyerId,
                    },
                });
                if (createOffer && listingCheck) {
                    await ctx.db.notification.create({
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

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                sellerId: z.string(),
                buyerId: z.string(),
                listingId: z.string(),
                listingStatus: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId, buyerId, listingStatus, listingId } = input;

            if (ctx.session.user.id !== sellerId && !ctx.session.user.isAdmin) {
                throw new Error(
                    "You do not have the necessary permissions to perform this action.",
                );
            }
            const listingCheck = await ctx.db.listing.findUnique({
                where: { id: listingId },
            });

            const buyer = await ctx.db.user.findUnique({
                where: {
                    id: buyerId,
                },
            });

            if (buyer && buyer.email) {
                //todo send buyer email here

                await ctx.db.listingOffer.delete({
                    where: { id: id },
                });

                if (listingStatus === "ACTIVE" && listingCheck) {
                    await ctx.db.notification.create({
                        data: {
                            userId: buyerId,
                            text: `Seller Rejected your offer for ${listingCheck.title}. Try a higher price!`,
                            type: "OFFERREJECT",
                            typeId: listingId,
                            status: "UNREAD",
                        },
                    });
                }

                return "Successfully Deleted";
            }
            throw new Error("Buyer does not exist or has no valid email.");
        }),
});
