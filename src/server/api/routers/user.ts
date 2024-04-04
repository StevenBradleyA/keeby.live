import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { compare } from "bcryptjs";
import { removeFileFromS3 } from "../utils";
import fetch from "node-fetch";
// import type { Response } from "node-fetch";
// npm i node-fetch
// npm install --save-dev @types/node-fetch
interface TokenData {
    scope: string;
    access_token: string;
    token_type: string;
    expires_in: string;
    refresh_token: string;
    nonce: string;
}
interface UserInfoData {
    user_id: string;
}

interface UserWithGamesAndRank {
    rank: {
        name: string;
        image: string;
        standing: number;
        minWpm: number;
        maxWpm: number;
    } | null;
    games: {
        id: string;
        wpm: number;
        accuracy: number;
    }[];
}

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

    getUserGameData: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                mode: z.string(),
                keebId: z.string(),
                isTotalData: z.boolean(),
            })
        )
        .query(async ({ input, ctx }) => {
            const { userId, mode, keebId, isTotalData } = input;

            const gamesWhereClause = isTotalData
                ? undefined
                : {
                      where: {
                          mode: mode,
                          keebId: keebId,
                      },
                  };

            const userWithGameResultsAndRank: UserWithGamesAndRank | null =
                await ctx.prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        rank: {
                            select: {
                                name: true,
                                image: true,
                                standing: true,
                                minWpm: true,
                                maxWpm: true,
                            },
                        },
                        games: {
                            ...gamesWhereClause,
                            select: {
                                id: true,
                                wpm: true,
                                accuracy: true,
                            },
                        },
                        keebs: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                });

            const allGameResults = userWithGameResultsAndRank?.games ?? [];
            const totalGamesPlayed = allGameResults.length;
            let averageWpm = 0;
            let averageAccuracy = 0;

            if (totalGamesPlayed > 0) {
                averageWpm =
                    allGameResults.reduce((acc, game) => acc + game.wpm, 0) /
                    totalGamesPlayed;
                averageAccuracy =
                    allGameResults.reduce(
                        (acc, game) => acc + game.accuracy,
                        0
                    ) / totalGamesPlayed;
            }

            return { userWithGameResultsAndRank, averageWpm, averageAccuracy };
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

    getUserTags: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            return await ctx.prisma.user.findUnique({
                where: { id: input },
                select: {
                    tags: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
            });
        }),

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
    update: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                username: z.string().optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        })
                    )
                    .optional(),
                selectedTag: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, username, images, selectedTag } = input;
            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            const userData: {
                username?: string;
                selectedTag?: string;
                profile?: string;
            } = {};

            if (images && images[0]) {
                const checkUserProfile = await ctx.prisma.user.findUnique({
                    where: { id: userId },
                    select: {
                        profile: true,
                    },
                });
                if (checkUserProfile && checkUserProfile.profile !== null) {
                    try {
                        await removeFileFromS3(checkUserProfile.profile);
                    } catch (err) {
                        console.error("An unexpected AWS error occurred:", err);
                    }
                }
                userData.profile = images[0].link;
            }

            if (username) {
                userData.username = username;
            }
            if (selectedTag) {
                userData.selectedTag = selectedTag;
            }

            if (username || selectedTag || (images && images[0])) {
                return await ctx.prisma.user.update({
                    where: { id: userId },
                    data: {
                        ...userData,
                    },
                });
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

            // Validate session user
            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            // Prepare user update data
            const updateData = {
                username,
                hasProfile: true,
                ...(images && images[0] ? { profile: images[0].link } : {}),
            };

            const result = await ctx.prisma.$transaction(async (prisma) => {
                const createKeeb = await prisma.keeb.create({
                    data: { name, switches, keycaps, userId },
                });

                // let's check if 'Novice' tag exists or create it if it doesn't
                const noviceTag = await prisma.tag.upsert({
                    where: { name: "Novice" },
                    update: {},
                    create: {
                        name: "Novice",
                        description: "Just getting started.",
                    },
                });

                // Connect that 'Novice' tag to the user
                const updatedUser = await prisma.user.update({
                    where: { id: userId },
                    data: {
                        ...updateData,
                        tags: { connect: { id: noviceTag.id } },
                        selectedTag: noviceTag.name,
                    },
                });

                return { createKeeb, updatedUser };
            });

            return result;
        }),

    updateUserTag: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                selectedTag: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, selectedTag } = input;

            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            return await ctx.prisma.user.update({
                where: { id: userId },
                data: {
                    selectedTag: selectedTag,
                },
            });
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
                const checkUserProfile = await ctx.prisma.user.findUnique({
                    where: { id: input },
                    select: {
                        profile: true,
                    },
                });
                if (checkUserProfile && checkUserProfile.profile !== null) {
                    try {
                        await removeFileFromS3(checkUserProfile.profile);
                    } catch (err) {
                        console.error("An unexpected AWS error occurred:", err);
                    }
                }

                return ctx.prisma.user.update({
                    where: { id: input },
                    data: { profile: null },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),

    delete: protectedProcedure
        .input(
            z.object({
                id: z.string(),
                profile: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, profile } = input;
            if (ctx.session.user.isAdmin) {
                const images = await ctx.prisma.images.findMany({
                    where: {
                        userId: id,
                    },
                });

                if (images.length > 0) {
                    const removeFilePromises = images.map((image) =>
                        removeFileFromS3(image.link)
                    );
                    if (profile) {
                        await removeFileFromS3(profile);
                    }

                    try {
                        // here we are waiting for all promises and capturing those that are rejected
                        const results = await Promise.allSettled(
                            removeFilePromises
                        );
                        const errors = results.filter(
                            (result) => result.status === "rejected"
                        );

                        if (errors.length > 0) {
                            console.error(
                                "Errors occurred while removing files from S3:",
                                errors
                            );
                        }
                    } catch (err) {
                        console.error("An unexpected error occurred:", err);
                    }
                }
                return ctx.prisma.user.delete({
                    where: { id: id },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),

    getPayPalAccessToken: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                authorizationCode: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { authorizationCode, userId } = input;
            const clientId = env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
            const clientSecret = env.PAYPAL_SECRET;
            const basicAuth = Buffer.from(
                `${clientId}:${clientSecret}`
            ).toString("base64");

            try {
                const tokenResponse = await fetch(
                    "https://api-m.sandbox.paypal.com/v1/oauth2/token",
                    {
                        method: "POST",
                        headers: {
                            Authorization: `Basic ${basicAuth}`,
                            "Content-Type": "application/x-www-form-urlencoded",
                        },
                        body: new URLSearchParams({
                            grant_type: "authorization_code",
                            code: authorizationCode,
                        }),
                    }
                );

                const tokenData = (await tokenResponse.json()) as TokenData;

                if (!tokenResponse.ok) {
                    throw new Error(`Error from PayPal`);
                }
                if (tokenData) {
                    const userInfoResponse = await fetch(
                        "https://api-m.sandbox.paypal.com/v1/identity/oauth2/userinfo?schema=openid",
                        {
                            method: "GET",
                            headers: {
                                Authorization: `Bearer ${tokenData.access_token}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    const userInfo =
                        (await userInfoResponse.json()) as UserInfoData;
                    // do i save the refresh token? and the user_id from paypal?
                    // that way later when i need to send a payout I just get a new access token and send them the amount to the paypal userId?
                    if (userInfo) {
                        return ctx.prisma.user.update({
                            where: { id: userId },
                            data: {
                                isVerified: true,
                                refreshToken: tokenData.refresh_token,
                                paypalId: userInfo.user_id,
                            },
                        });
                    }

                    if (!userInfoResponse.ok) {
                        throw new Error(
                            `Failed to fetch user info from PayPal`
                        );
                    }
                }

                // return data;
            } catch (error) {
                console.error("Failed to exchange authorization code:", error);
                throw new Error("Failed to exchange authorization code.");
            }
        }),

    // getPayPalUserInfo: publicProcedure

    // verifyUser: protectedProcedure
    //     .input(
    //         z.object({
    //             userId: z.string(),
    //             authCode: z.string(),
    //         })
    //     )
    //     .mutation(async ({ input, ctx }) => {
    //         const { userId, authCode } = input;

    // if (ctx.session.user.id !== userId) {
    //     throw new Error("Invalid userId");
    // }
    // https://api-m.sandbox.paypal.com/v1/oauth2/token
    // const tokenUrl = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
    //     const params = new URLSearchParams({
    //       grant_type: 'authorization_code',
    //       code: authCode,
    //       redirect_uri: 'https://www.keeby.live/verify-seller',
    //     });

    //     const credentials = Buffer.from(`${env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}:${env.PAYPAL_SECRET}`).toString('base64');
    //     try {
    //         const response: Response = await fetch(tokenUrl, {
    //           method: 'POST',
    //           headers: {
    //             'Authorization': `Basic ${credentials}`,
    //             'Content-Type': 'application/x-www-form-urlencoded',
    //           },
    //           body: params,
    //         });

    //         const data = await response.json();

    //         if (!response.ok) {
    //           throw new Error(`Failed to exchange code for token: ${data.error_description || 'Unknown error'}`);
    //         }

    // Success - the access token is now ready for further API calls on behalf of the user
    // return { accessToken: data.access_token };

    // try {
    //     const accessToken = await exchangeAuthCodeForAccessToken(
    //         authCode
    //     );
    //     const paypalEmail = await retrieveUserInfo(accessToken);

    //     console.log('hey', paypalEmail)

    //     if (paypalEmail) {
    //         return ctx.prisma.user.update({
    //             where: { id: userId },
    //             data: { isVerified: true, paypalEmail: paypalEmail },
    //         });
    //     }
    // } catch (error) {
    //     console.error("Error verifying user with PayPal:", error);
    //     throw new Error("Verification failed");
    // }
    // }),
    // verifyUser: protectedProcedure
    // .input(z.string())
    // .mutation(async ({ input, ctx }) => {
    //     if (ctx.session.user.id === input) {
    //         return ctx.prisma.user.update({
    //             where: { id: input },
    //             data: { isVerified: true },
    //         });
    //     } else {
    //         throw new Error("Invalid userId");
    //     }
    // }),

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
