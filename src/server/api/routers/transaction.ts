import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { createOrder, captureOrder } from "../utils";
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
                userId: z.string(),
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
                userId,
                sellerId,
            } = input;
            // price in dollars here...
            if (ctx.session.user.id !== userId) {
                throw new Error("Invalid userId");
            }
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

            const createTransaction = ctx.prisma.listingTransaction.create({
                data: {
                    name: name,
                    status: "ACCEPTED",
                    price: parseFloat(price) * 100,
                    listingId: listingId,
                    userId: userId,
                    transactionId: transactionId,
                    paypalOrderId: paypalOrderId,
                },
            });

            const seller = ctx.prisma.user.findUnique({
                where: {
                    id: sellerId,
                },
            });
            const buyer = ctx.prisma.user.findUnique({
                where: {
                    id: userId,
                },
            });

            // todo resend email both buyer and seller

            // initiate paypal
            // if payed -- transfer money to me take 5% -- transfer money to seller

            // if no tracking number within ten days reinburse buyer.

            //  create the transaction...

            // update the listing status... PENDING

            // or sold idk yet

            // email the buyer and seller... once complete

            //

            // const listingCheck = await ctx.prisma.listing.findUnique({
            //     where: {
            //         id: listingId,
            //     },
            // });
            // if (listingCheck?.status === "SOLD") {
            //     return { pendingOffer: true };
            // }

            // const offerCheck = await ctx.prisma.listingOffer.findMany({
            //     where: {
            //         listingId: listingId,
            //         buyerId: buyerId,
            //     },
            // });
            // if (offerCheck && offerCheck.length > 0) {
            //     return { pendingOffer: true };
            // } else {
            //     const createOffer = await ctx.prisma.listingOffer.create({
            //         data: {
            //             price: price,
            //             status: "PENDING",
            //             listingId: listingId,
            //             buyerId: buyerId,
            //         },
            //     });
            //     if (createOffer) {
            //         //todo send email to seller -- get unique --if seller exists email
            //         // can add buyer username here for email plus price
            //         // not sure paypal's limit here probably a time limit we can hold out a charge for or something... maybe not idk...

            //         // wait this is dumb asf lets just do it like Ebay... right wouldn't it make sense to pay when offer accepted... they have 5 days to pay or bye ...
            //         return { pendingOffer: false };
            //     }
            // }
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
