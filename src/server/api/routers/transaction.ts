import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { createOrder, captureOrder } from "../utils";
import CreateTransaction from "~/components/KeebShop/Transactions/Purchase";
// npm install @paypal/checkout-server-sdk

export const transactionRouter = createTRPCRouter({
    getAllByUserId: publicProcedure
        .input(z.string())
        .query(async ({ input: userId, ctx }) => {
            const offersSent = await ctx.prisma.listingOffer.findMany({
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

            const offersReceived = await ctx.prisma.listing.findMany({
                where: {
                    sellerId: userId,
                    listingOffer: {
                        some: {},
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
                name: z.string(),
                buyerId: z.string(),
                paypalOrderId: z.string(),
                transactionId: z.string(),
                listingId: z.string(),
                price: z.string(),
                sellerId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const {
                name,
                transactionId,
                paypalOrderId,
                price,
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

            await ctx.prisma.listing.update({
                where: {
                    id: listingId,
                },
                data: {
                    status: "PENDING",
                },
            });

            const createTransaction =
                await ctx.prisma.listingTransaction.create({
                    data: {
                        name: name,
                        status: "ACCEPTED",
                        price: parseFloat(price) * 100,
                        listingId: listingId,
                        buyerId: buyerId,
                        transactionId: transactionId,
                        paypalOrderId: paypalOrderId,
                    },
                });
            if (createTransaction) {
                const seller = ctx.prisma.user.findUnique({
                    where: {
                        id: sellerId,
                    },
                });
                const buyer = ctx.prisma.user.findUnique({
                    where: {
                        id: buyerId,
                    },
                });

                // todo send email confirmations here...

                isAvailable = true;

                return { isAvailable, createTransaction };
            }

            return { isAvailable };
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

            //  keep the listing around but we are going to mark it as sold...
            // transaction only occurs when buyer pays
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
                        status: "SOLD",
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId, buyerId } = input;

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
                return "Successfully Deleted";
            }
            throw new Error("Buyer does not exist or has no valid email.");
        }),
});
