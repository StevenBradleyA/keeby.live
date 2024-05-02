import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";

// npm install @paypal/checkout-server-sdk
// todo uninstall this only using react rn

export const transactionRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const sold = await ctx.prisma.listingTransaction.findMany({
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

            const purchased = await ctx.prisma.listingTransaction.findMany({
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { transactionId, paypalOrderId, price, userId, email } =
                input;

            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid credentials");
            }

            await ctx.prisma.verificationTransaction.create({
                data: {
                    status: "PAYED",
                    price: parseFloat(price) * 100,
                    userId,
                    transactionId: transactionId,
                    paypalOrderId: paypalOrderId,
                },
            });

            await ctx.prisma.notification.create({
                data: {
                    userId: userId,
                    text: `Congrats on verifying, you can now list your keebs for sale!`,
                    type: "LISTINGCREATE",
                    status: "UNREAD",
                },
            });

            return await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    isVerified: true,
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const {
                transactionId,
                paypalOrderId,
                agreedPrice,
                payed,
                listingId,
                buyerId,
                sellerId,
            } = input;
            if (ctx.session.user.id !== buyerId) {
                throw new Error("Invalid buyerId");
            }

            let isAvailable = false;

            const listingCheck = await ctx.prisma.listing.findUnique({
                where: {
                    id: listingId,
                },
            });

            if (listingCheck?.status === "SOLD") {
                return { isAvailable: false };
            }

            const createTransaction =
                await ctx.prisma.listingTransaction.create({
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
                const seller = await ctx.prisma.user.findUnique({
                    where: {
                        id: sellerId,
                    },
                });
                const buyer = await ctx.prisma.user.findUnique({
                    where: {
                        id: buyerId,
                    },
                });

                if (seller && buyer) {
                    await ctx.prisma.message.create({
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

                    await ctx.prisma.notification.create({
                        data: {
                            userId: sellerId,
                            text: `You received a new message!`,
                            type: "MESSAGE",
                            status: "UNREAD",
                        },
                    });
                    // todo RESEND send email confirmations here...
                }

                await ctx.prisma.listing.update({
                    where: {
                        id: listingId,
                    },
                    data: {
                        status: "SOLD",
                        buyerId: buyerId,
                    },
                });

                await ctx.prisma.listingOffer.deleteMany({
                    where: {
                        id: listingId,
                    },
                });

                isAvailable = true;

                return { isAvailable, createTransaction };
            }

            return { isAvailable };
        }),

    // delete: protectedProcedure
    //     .input(
    //         z.object({
    //             id: z.string(),
    //             sellerId: z.string(),
    //             buyerId: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         const { id, sellerId, buyerId } = input;

    //         if (ctx.session.user.id !== sellerId && !ctx.session.user.isAdmin) {
    //             throw new Error(
    //                 "You do not have the necessary permissions to perform this action."
    //             );
    //         }
    //         const buyer = await ctx.prisma.user.findUnique({
    //             where: {
    //                 id: buyerId,
    //             },
    //         });

    //         if (buyer && buyer.email) {
    //             //todo send buyer email here

    //             await ctx.prisma.listingOffer.delete({
    //                 where: { id: id },
    //             });
    //             return "Successfully Deleted";
    //         }
    //         throw new Error("Buyer does not exist or has no valid email.");
    //     }),
});
