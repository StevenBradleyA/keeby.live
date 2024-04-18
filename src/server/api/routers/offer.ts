import { z } from "zod";
import {
    createTRPCRouter,
    publicProcedure,
    protectedProcedure,
} from "~/server/api/trpc";
import { removeFileFromS3 } from "../utils";
import type { Images, Prisma, Post } from "@prisma/client";
import { id } from "date-fns/locale";

type CreateData = {
    title: string;
    text?: string;
    link?: string;
    userId: string;
    tag: string;
};

interface UserPostPreview {
    id: string;
    title: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
}

interface UserWithPosts {
    id: string;
    username: string | null;
    profile: string | null;
    selectedTag: string | null;
    internetPoints: number;
    posts: UserPostPreview[];
}

interface PostWithCount {
    id: string;
    title: string;
    text: string | null;
    tag: string;
    link: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
    user: {
        id: string;
    };
}

interface PostPage {
    id: string;
    title: string;
    text: string | null;
    tag: string;
    link: string | null;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    isLiked?: boolean;
    likeId?: string;
    isFavorited?: boolean;
    favoriteId?: string;
    _count: {
        comments: number;
        postLikes: number;
    };
    images: Images[];
    user: UserWithPosts;
}
type ExtendedPost = Post & {
    images: Images[];
    _count: {
        comments: number;
        postLikes: number;
    };
    previewIndex?: number;
};

// todo potentially not update user if post id matches userId so they dont gain points for liking their own stuff.. this would prevent farming
// do we want to delete declined offers? or what...
// we would want to notify a user ... can email seller if offer declined

export const offerRouter = createTRPCRouter({
    create: protectedProcedure
        .input(
            z.object({
                price: z.number(),
                listingId: z.string(),
                buyerId: z.string(),
                buyerUsername: z.string(),
                sellerId: z.string(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { price, listingId, buyerId, sellerId } = input;

            if (ctx.session.user.id !== buyerId) {
                throw new Error("Invalid userId");
            }

            const listingCheck = await ctx.prisma.listing.findUnique({
                where: {
                    id: listingId,
                },
            });
            if (listingCheck?.status === "SOLD") {
                return { pendingOffer: true };
            }

            const offerCheck = await ctx.prisma.listingOffer.findMany({
                where: {
                    listingId: listingId,
                    buyerId: buyerId,
                },
            });
            if (offerCheck && offerCheck.length > 0) {
                return { pendingOffer: true };
            } else {
                const createOffer = await ctx.prisma.listingOffer.create({
                    data: {
                        price: price,
                        status: "PENDING",
                        listingId: listingId,
                        buyerId: buyerId,
                    },
                });
                if (createOffer) {
                    //todo send email to seller -- get unique --if seller exists email
                    // can add buyer username here for email plus price
                    // not sure paypal's limit here probably a time limit we can hold out a charge for or something... maybe not idk...

                    // wait this is dumb asf lets just do it like Ebay... right wouldn't it make sense to pay when offer accepted... they have 5 days to pay or bye ...
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
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { id, sellerId, buyerId } = input;
            // todo email buyerId tell them they were rejected with blank offer... notify

            // todo buyer should also be able to cancel pending offers? yes or no??? not sure

            if (ctx.session.user.id === sellerId || ctx.session.user.isAdmin) {
                await ctx.prisma.listingOffer.delete({ where: { id: id } });

                return "Successfully deleted";
            }
        }),
});
