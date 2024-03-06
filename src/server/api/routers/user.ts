import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { compare } from "bcryptjs";

export const userRouter = createTRPCRouter({
    getAll: publicProcedure
        .input(
            z.object({
                searchQuery: z.string().optional(),
            })
        )
        .query(({ input, ctx }) => {
            const { searchQuery } = input;
            let whereFilters = {};
            if (searchQuery) {
                whereFilters = {
                    username: {
                        contains: searchQuery,
                    },
                };
            }

            return ctx.prisma.user.findMany({
                where: {
                    ...whereFilters,
                },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    profile: true,
                    internetPoints: true,
                    selectedTag: true,
                },
            });
        }),

    getOneUser: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.prisma.user.findUnique({
            where: { id: input },
        });
    }),
    // todo lets get rid of get seller and add into first listing route
    getSeller: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            const seller = await ctx.prisma.user.findUnique({
                where: { id: input },
                select: { profile: true, username: true, selectedTag: true },
            });
            const allSellerStars = await ctx.prisma.review.aggregate({
                where: { sellerId: input },
                _avg: { starRating: true },
            });
            return { seller, allSellerStars };
        }),
    getUserPublic: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        const userInfo = ctx.prisma.user.findUnique({
            where: { username: input },
            select: {
                id: true,
                username: true,
                profile: true,
                selectedTag: true,
                reviewsReceived: {
                    select: {
                        id: true,
                        text: true,
                        starRating: true,
                        userId: true,
                        user: {
                            select: {
                                username: true,
                            },
                        },
                    },
                },
            },
        });

        return userInfo;
    }),
    // need to grab keeb info aswell and top wpm for each keeb

    usernameCheck: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            try {
                // Check if the username exists in the database
                const user = await ctx.prisma.user.findFirst({
                    where: { username: input },
                });

                // Return true if the user exists, false otherwise
                return Boolean(user);
            } catch (error) {
                // Handle any errors that occur during the database query
                console.error("Error checking username:", error);
                throw new Error("Error checking username");
            }
        }),
    updateNewUser: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                username: z.string(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        })
                    )
                    .optional(),
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, username, images, name, switches, keycaps } = input;
            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            const updateData: {
                username: string;
                hasProfile?: boolean;
                profile?: string;
                selectedTag: string;
            } = {
                username,
                hasProfile: true,
                selectedTag: "Novice",
            };

            if (images && images[0]) {
                updateData.profile = images[0].link;
            }
            const createKeeb = await ctx.prisma.keeb.create({
                data: {
                    name,
                    switches,
                    keycaps,
                    userId,
                },
            });

            const updatedUser = await ctx.prisma.user.update({
                where: { id: userId },
                data: updateData,
            });

            return { createKeeb, updatedUser };
        }),
    grantAdmin: publicProcedure
        .input(z.string())
        .mutation(async ({ input: hashPass, ctx }) => {
            const correct = await compare(env.POGWORD, hashPass);
            if (ctx.session === null) {
                throw new Error("Not Signed In");
            }
            if (correct) {
                const updatedUser = await ctx.prisma.user.update({
                    where: { id: ctx.session.user.id },
                    data: {
                        isAdmin: true,
                    },
                });
                return updatedUser ? "Success" : "Error";
            } else {
                return "Incorrect";
            }
        }),

    deleteUserProfile: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.isAdmin) {
                return ctx.prisma.user.update({
                    where: { id: input },
                    data: { profile: null },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),

    delete: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.isAdmin) {
                // need to aws delete all images associated with a user
                // plus fix all on delete cascades

                return ctx.prisma.user.delete({
                    where: { id: input },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),

    verifyUser: protectedProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            if (ctx.session.user.id === input) {
                return ctx.prisma.user.update({
                    where: { id: input },
                    data: { isVerified: true },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),

    // paypalRedirect: protectedProcedure.query(({ ctx }) => {
    //     const clientId = env.PAYPAL_CLIENT_ID;
    //     const returnUrl = encodeURIComponent(
    //         `http://localhost:3000/verification/success`
    //     );
    //     const scope = encodeURIComponent("openid email profile");
    //     const paypalUrl = `https://www.sandbox.paypal.com/signin/authorize?flowEntry=static&client_id=${clientId}&scope=${scope}&redirect_uri=${returnUrl}`;

    //     return { url: paypalUrl };
    // }),
});
