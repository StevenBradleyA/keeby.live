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
            // pending need to have shipping info ---
            // front end we finna do doe
            const pending = await ctx.prisma.listingTransaction.findMany({
                where: {
                    listing: {
                        sellerId: userId,
                        status: "PENDING",
                    },
                },
                include: {
                    buyer: {
                        select: {
                            username: true,
                        },
                    },
                },
            });

            const sold = await ctx.prisma.listingTransaction.findMany({
                where: {
                    listing: {
                        sellerId: userId,
                        status: "SOLD",
                    },
                },
                include: {
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
                            seller: {
                                select: {
                                    username: true,
                                },
                            },
                        },
                    },
                },
            });

            return { pending, sold, purchased };
        }),

    // create payout where we send money to seller...
    // wait if im taking money and sending it don't disputes come to me? lmao look into this pls

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

            if (
                listingCheck?.status === "SOLD" ||
                listingCheck?.status === "PENDING"
            ) {
                return { isAvailable: false };
            }

            const createTransaction =
                await ctx.prisma.listingTransaction.create({
                    data: {
                        name: name,
                        status: "PAYED",
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

                await ctx.prisma.listing.update({
                    where: {
                        id: listingId,
                    },
                    data: {
                        status: "PENDING",
                    },
                });

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