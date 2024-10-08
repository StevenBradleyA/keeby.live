import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { env } from "~/env.mjs";
import { compare } from "bcryptjs";
import { removeFileFromS3 } from "../utils";
// import bcrypt from "bcryptjs";

// interface TokenData {
//     scope: string;
//     access_token: string;
//     token_type: string;
//     expires_in: string;
//     refresh_token: string;
//     nonce: string;
// }
// interface UserInfoData {
//     user_id: string;
// }

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
            }),
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

            return ctx.db.user.findMany({
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
                take: 50,
            });
        }),

    getOneUser: publicProcedure.input(z.string()).query(({ input, ctx }) => {
        return ctx.db.user.findUnique({
            where: { id: input },
        });
    }),

    getUserGameData: publicProcedure
        .input(
            z.object({
                userId: z.string(),
                mode: z.string(),
                keebId: z.string(),
                isTotalData: z.boolean(),
            }),
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
                await ctx.db.user.findUnique({
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
            let rankedWpm = 0;

            if (totalGamesPlayed > 0) {
                averageWpm =
                    allGameResults.reduce((acc, game) => acc + game.wpm, 0) /
                    totalGamesPlayed;
                averageAccuracy =
                    allGameResults.reduce(
                        (acc, game) => acc + game.accuracy,
                        0,
                    ) / totalGamesPlayed;
            }

            const allRankedGames = await ctx.db.user.findUnique({
                where: { id: userId },
                select: {
                    games: {
                        select: {
                            id: true,
                            wpm: true,
                            accuracy: true,
                        },
                    },
                },
            });

            if (allRankedGames && allRankedGames.games.length > 10) {
                const topGames = await ctx.db.game.findMany({
                    where: {
                        userId: userId,
                        mode: "ranked", 
                    },
                    orderBy: {
                        wpm: "desc",
                    },
                    take: 10,
                });

                rankedWpm =
                    topGames.reduce((acc, game) => acc + game.wpm, 0) /
                    topGames.length;
            }

            return {
                userWithGameResultsAndRank,
                averageWpm,
                averageAccuracy,
                rankedWpm,
            };
        }),

    getUserPublic: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            const userInfo = await ctx.db.user.findUnique({
                where: { username: input },
                select: {
                    id: true,
                    username: true,
                    profile: true,
                    selectedTag: true,
                    internetPoints: true,
                    reviewsReceived: {
                        select: {
                            id: true,
                            text: true,
                            starRating: true,
                            userId: true,
                            updatedAt: true,
                            user: {
                                select: {
                                    username: true,
                                    profile: true,
                                },
                            },
                        },
                    },
                    rank: {
                        select: {
                            image: true,
                            name: true,
                        },
                    },
                    _count: {
                        select: {
                            games: true,
                            comments: true,
                            posts: true,
                            sellerListings: true,
                        },
                    },
                },
            });
            if (userInfo) {
                const averageStarRating = await ctx.db.review.aggregate({
                    where: { recipientId: userInfo.id },
                    _avg: { starRating: true },
                });

                return { userInfo, averageStarRating };
            }
        }),

    getUserTags: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            return await ctx.db.user.findUnique({
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

    providerCheck: publicProcedure
        .input(z.string())
        .mutation(async ({ input, ctx }) => {
            try {
                // Check if the username exists in the database
                const user = await ctx.db.user.findFirst({
                    where: { email: input },
                    include: {
                        accounts: {
                            select: {
                                provider: true,
                            },
                        },
                    },
                });

                if (!user) {
                    return "Invalid credentials";
                }
                // If user exists, return the provider names
                const providers = user.accounts.map(
                    (account) => account.provider,
                );
                return providers.length > 0
                    ? providers
                    : "No providers found for this user";
            } catch (error) {
                // Handle any errors that occur during the database query
                console.error("Error checking username:", error);
                throw new Error("Error checking username");
            }
        }),

    usernameCheck: publicProcedure
        .input(z.string())
        .query(async ({ input, ctx }) => {
            try {
                // Check if the username exists in the database
                const user = await ctx.db.user.findFirst({
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
                isNewsletter: z.boolean(),
                username: z.string().optional(),
                images: z
                    .array(
                        z.object({
                            link: z.string(),
                        }),
                    )
                    .optional(),
                selectedTag: z.string().optional(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, username, images, selectedTag, isNewsletter } =
                input;

            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            const userData: {
                username?: string;
                selectedTag?: string;
                profile?: string;
                isNewsletter?: boolean;
            } = {};

            if (images && images[0]) {
                const checkUserProfile = await ctx.db.user.findUnique({
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
            if (isNewsletter !== undefined) {
                userData.isNewsletter = isNewsletter;
            }

            if (
                username ||
                selectedTag ||
                (images && images[0]) ||
                isNewsletter !== undefined
            ) {
                return await ctx.db.user.update({
                    where: { id: userId },
                    data: {
                        ...userData,
                    },
                });
            }
        }),
    updateNewsletter: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                isNewsletter: z.boolean(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, isNewsletter } = input;

            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }
            await ctx.db.user.update({
                where: { id: userId },
                data: {
                    isNewsletter: isNewsletter,
                },
            });
            return { isNewsletter };
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
                        }),
                    )
                    .optional(),
                name: z.string(),
                switches: z.string(),
                keycaps: z.string(),
            }),
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

            const createKeeb = await ctx.db.keeb.create({
                data: { name, switches, keycaps, userId },
            });

            // let's check if 'Novice' tag exists or create it if it doesn't
            const noviceTag = await ctx.db.tag.upsert({
                where: { name: "Novice" },
                update: {},
                create: {
                    name: "Novice",
                    description: "Just getting started.",
                },
            });

            const updatedUser = await ctx.db.user.update({
                where: { id: userId },
                data: {
                    ...updateData,
                    tags: { connect: { id: noviceTag.id } },
                    selectedTag: noviceTag.name,
                },
            });

            return { createKeeb, updatedUser };
        }),

    updateUserTag: protectedProcedure
        .input(
            z.object({
                userId: z.string(),
                selectedTag: z.string(),
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { userId, selectedTag } = input;

            const sessionUserId = ctx.session.user.id;

            if (sessionUserId !== userId) {
                throw new Error("Invalid userId");
            }

            return await ctx.db.user.update({
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
                const updatedUser = await ctx.db.user.update({
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
                const checkUserProfile = await ctx.db.user.findUnique({
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

                return ctx.db.user.update({
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
            }),
        )
        .mutation(async ({ input, ctx }) => {
            const { id, profile } = input;
            if (ctx.session.user.isAdmin) {
                const images = await ctx.db.images.findMany({
                    where: {
                        userId: id,
                    },
                });

                if (profile) {
                    await removeFileFromS3(profile);
                }
                if (images.length > 0) {
                    const removeFilePromises = images.map((image) =>
                        removeFileFromS3(image.link),
                    );

                    try {
                        const results =
                            await Promise.allSettled(removeFilePromises);
                        const errors = results.filter(
                            (result) => result.status === "rejected",
                        );

                        if (errors.length > 0) {
                            console.error(
                                "Errors occurred while removing files from S3:",
                                errors,
                            );
                        }
                    } catch (err) {
                        console.error("An unexpected error occurred:", err);
                    }
                }
                return ctx.db.user.delete({
                    where: { id: id },
                });
            } else {
                throw new Error("Invalid userId");
            }
        }),
});

// const result = await ctx.db.$transaction(async (prisma) => {
//     const createKeeb = await prisma.keeb.create({
//         data: { name, switches, keycaps, userId },
//     });

//     // let's check if 'Novice' tag exists or create it if it doesn't
//     const noviceTag = await prisma.tag.upsert({
//         where: { name: "Novice" },
//         update: {},
//         create: {
//             name: "Novice",
//             description: "Just getting started.",
//         },
//     });

//     // Connect that 'Novice' tag to the user
//     const updatedUser = await prisma.user.update({
//         where: { id: userId },
//         data: {
//             ...updateData,
//             tags: { connect: { id: noviceTag.id } },
//             selectedTag: noviceTag.name,
//         },
//     });

//     return { createKeeb, updatedUser };
// });

// return result;
