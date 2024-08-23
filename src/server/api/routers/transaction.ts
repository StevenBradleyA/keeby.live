import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

export const transactionRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const sold = await ctx.db.listingTransaction.findMany({
                where: {
                    listing: {
                        sellerId: userId,
                        status: "SOLD",
                    },
                },
                include: {
                    listing: {
                        select: {
                            title: true,
                        },
                    },
                    buyer: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            const purchased = await ctx.db.listingTransaction.findMany({
                where: {
                    buyerId: userId,
                    listing: {
                        status: "SOLD",
                    },
                },
                include: {
                    listing: {
                        select: {
                            title: true,
                            seller: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });

            return { sold, purchased };
        }),
    //! NOTIFY BUYER AND SELLER THAT THEY CAN NOW REVIEW
    createBuyerDriven: protectedProcedure
        .input(
            z.object({
                buyerId: z.string(),
                sellerId: z.string(),
                listingId: z.string(),
                agreedPrice: z.number(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { agreedPrice, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== buyerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }
            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            const seller = await ctx.db.user.findUnique({
                where: {
                    id: sellerId,
                },
            });
            const buyer = await ctx.db.user.findUnique({
                where: {
                    id: buyerId,
                },
            });

            if (!listingCheck) {
                throw new Error("Cannot find listing");
            }
            if (listingCheck.status === "SOLD") {
                throw new Error("Listing is already sold");
            }

            await ctx.db.listing.update({
                where: {
                    id: listingId,
                },
                data: {
                    status: "SOLD",
                    buyerId: buyerId,
                },
            });

            await ctx.db.listingTransaction.create({
                data: {
                    agreedPrice: agreedPrice,
                    listingId: listingId,
                    buyerId: buyerId,
                    sellerId: sellerId,
                },
            });

            const newTransaction = await ctx.db.listingTransaction.findFirst({
                where: {
                    listingId: listingId,
                },
            });

            if (!newTransaction) {
                throw new Error("Cannot find transaction");
            }

            if (seller && buyer) {
                await ctx.db.message.create({
                    data: {
                        listingTransactionId: newTransaction.id,
                        userId: buyerId,
                        recipientId: sellerId,
                        text: `Hey ${
                            seller.username ? seller.username : ""
                        }, I'm ready to purchase your keyboard for the agreed price of $${agreedPrice} via paypal!`,
                    },
                });
                await ctx.db.notification.create({
                    data: {
                        userId: sellerId,
                        text: `${buyer.username} wants to buy ${listingCheck.title}!`,
                        type: "MESSAGE",
                        status: "UNREAD",
                    },
                });
                await ctx.db.notification.create({
                    data: {
                        userId: buyerId,
                        text: `You have a new conversation!`,
                        type: "MESSAGE",
                        status: "UNREAD",
                    },
                });
            }

            return "Transaction successful";
        }),

    createSellerAccept: protectedProcedure
        .input(
            z.object({
                offerId: z.string(),
                buyerId: z.string(),
                sellerId: z.string(),
                listingId: z.string(),
                agreedPrice: z.number(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { offerId, agreedPrice, listingId, buyerId, sellerId } =
                input;

            if (ctx.session.user.id !== sellerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }
            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            const seller = await ctx.db.user.findUnique({
                where: {
                    id: sellerId,
                },
            });
            const buyer = await ctx.db.user.findUnique({
                where: {
                    id: buyerId,
                },
            });

            if (!listingCheck) {
                throw new Error("Cannot find listing");
            }
            if (listingCheck.status === "SOLD") {
                throw new Error("Listing is already sold");
            }

            await ctx.db.listing.update({
                where: {
                    id: listingId,
                },
                data: {
                    status: "SOLD",
                    buyerId: buyerId,
                },
            });

            await ctx.db.listingTransaction.create({
                data: {
                    agreedPrice: agreedPrice,
                    listingId: listingId,
                    buyerId: buyerId,
                    sellerId: sellerId,
                },
            });

            const newTransaction = await ctx.db.listingTransaction.findFirst({
                where: {
                    listingId: listingId,
                },
            });

            if (!newTransaction) {
                throw new Error("Cannot find transaction");
            }

            await ctx.db.listingOffer.delete({
                where: {
                    id: offerId,
                },
            });

            await ctx.db.notification.create({
                data: {
                    userId: buyerId,
                    text: `Your offer was accepted for ${listingCheck.title}!`,
                    type: "OFFER",
                    status: "UNREAD",
                },
            });

            if (seller && buyer) {
                await ctx.db.message.create({
                    data: {
                        listingTransactionId: newTransaction.id,
                        userId: buyerId,
                        recipientId: sellerId,
                        text: `Hey ${
                            seller.username ? seller.username : ""
                        }, I'm ready to purchase your keyboard for the agreed price of $${agreedPrice} via paypal!`,
                    },
                });
                await ctx.db.notification.create({
                    data: {
                        userId: sellerId,
                        text: `${buyer.username} wants to buy ${listingCheck.title}!`,
                        type: "MESSAGE",
                        status: "UNREAD",
                    },
                });
                await ctx.db.notification.create({
                    data: {
                        userId: buyerId,
                        text: `You have a new conversation!`,
                        type: "MESSAGE",
                        status: "UNREAD",
                    },
                });
            }

            return "Transaction successful";
        }),
});
