import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

// npm install @paypal/checkout-server-sdk
// currently uninstalled may 2nd need test

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

    createVerificationTransaction: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                paypalOrderId: z.string(),
                transactionId: z.string(),
                price: z.string(),
                email: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { transactionId, paypalOrderId, price, userId, email } =
                input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid credentials");
            }

            await ctx.db.verificationTransaction.create({
                data: {
                    status: "PAYED",
                    price: parseFloat(price) * 100,
                    userId,
                    transactionId: transactionId,
                    paypalOrderId: paypalOrderId,
                },
            });

            await ctx.db.notification.create({
                data: {
                    userId: userId,
                    text: `Congrats on verifying, you can now list your keebs for sale!`,
                    type: "LISTINGCREATE",
                    status: "UNREAD",
                },
            });

            return await ctx.db.user.update({
                where: { id: userId },
                data: {
                    isModerator: true,
                    paypalEmail: email,
                },
            });
        }),
    create: protectedProcedure
        .input(
            z.object({
                buyerId: z.string(),
                paypalOrderId: z.string(),
                transactionId: z.string(),
                listingId: z.string(),
                payed: z.string(),
                agreedPrice: z.number(),
                sellerId: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { agreedPrice, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== buyerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }
            if (ctx.session.user.id === sellerId) {
                throw new Error(
                    "You don't have the right, O you don't have the right",
                );
            }

            let isAvailable = false;

            const listingCheck = await ctx.db.listing.findUnique({
                where: {
                    id: listingId,
                },
            });

            if (listingCheck?.status === "SOLD") {
                return { isAvailable: false };
            }

            const createTransaction = await ctx.db.listingTransaction.create({
                data: {
                    status: "PAYED",
                    payed: parseFloat(payed) * 100,
                    agreedPrice: agreedPrice,
                    listingId: listingId,
                    buyerId: buyerId,
                    transactionId: transactionId,
                    paypalOrderId: paypalOrderId,
                },
            });
            if (createTransaction) {
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

                if (seller && buyer) {
                    await ctx.db.message.create({
                        data: {
                            listingTransactionId: createTransaction.id,
                            userId: buyerId,
                            recipientId: sellerId,
                            text: `Hey ${
                                seller.username ? seller.username : ""
                            }, I'm ready to purchase your keyboard for the agreed price of $${(
                                agreedPrice / 100
                            ).toFixed(2)} via paypal!`,
                        },
                    });

                    await ctx.db.notification.create({
                        data: {
                            userId: sellerId,
                            text: `You received a new message!`,
                            type: "MESSAGE",
                            status: "UNREAD",
                        },
                    });
                    // todo RESEND send email confirmations here...
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

                await ctx.db.listingOffer.deleteMany({
                    where: {
                        id: listingId,
                    },
                });

                isAvailable = true;

                return { isAvailable, createTransaction };
            }

            return { isAvailable };
        }),
    // create: protectedProcedure
    //     .input(
    //         z.object({
    //             buyerId: z.string(),
    //             paypalOrderId: z.string(),
    //             transactionId: z.string(),
    //             listingId: z.string(),
    //             payed: z.string(),
    //             agreedPrice: z.number(),
    //             sellerId: z.string(),
    //         }),
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         const {
    //             transactionId,
    //             paypalOrderId,
    //             agreedPrice,
    //             payed,
    //             listingId,
    //             buyerId,
    //             sellerId,
    //         } = input;
    //         if (ctx.session.user.id !== buyerId) {
    //             throw new Error("Invalid buyerId");
    //         }

    //         let isAvailable = false;

    //         const listingCheck = await ctx.db.listing.findUnique({
    //             where: {
    //                 id: listingId,
    //             },
    //         });

    //         if (listingCheck?.status === "SOLD") {
    //             return { isAvailable: false };
    //         }

    //         const createTransaction = await ctx.db.listingTransaction.create({
    //             data: {
    //                 status: "PAYED",
    //                 payed: parseFloat(payed) * 100,
    //                 agreedPrice: agreedPrice,
    //                 listingId: listingId,
    //                 buyerId: buyerId,
    //                 transactionId: transactionId,
    //                 paypalOrderId: paypalOrderId,
    //             },
    //         });
    //         if (createTransaction) {
    //             const seller = await ctx.db.user.findUnique({
    //                 where: {
    //                     id: sellerId,
    //                 },
    //             });
    //             const buyer = await ctx.db.user.findUnique({
    //                 where: {
    //                     id: buyerId,
    //                 },
    //             });

    //             if (seller && buyer) {
    //                 await ctx.db.message.create({
    //                     data: {
    //                         listingTransactionId: createTransaction.id,
    //                         userId: buyerId,
    //                         recipientId: sellerId,
    //                         text: `Hey ${
    //                             seller.username ? seller.username : ""
    //                         }, I'm ready to purchase your keyboard for the agreed price of $${(
    //                             agreedPrice / 100
    //                         ).toFixed(2)} via paypal!`,
    //                     },
    //                 });

    //                 await ctx.db.notification.create({
    //                     data: {
    //                         userId: sellerId,
    //                         text: `You received a new message!`,
    //                         type: "MESSAGE",
    //                         status: "UNREAD",
    //                     },
    //                 });
    //                 // todo RESEND send email confirmations here...
    //             }

    //             await ctx.db.listing.update({
    //                 where: {
    //                     id: listingId,
    //                 },
    //                 data: {
    //                     status: "SOLD",
    //                     buyerId: buyerId,
    //                 },
    //             });

    //             await ctx.db.listingOffer.deleteMany({
    //                 where: {
    //                     id: listingId,
    //                 },
    //             });

    //             isAvailable = true;

    //             return { isAvailable, createTransaction };
    //         }

    //         return { isAvailable };
    //     }),
});
