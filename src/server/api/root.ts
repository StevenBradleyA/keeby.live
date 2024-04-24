import { createTRPCRouter } from "~/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { keebRouter } from "./routers/keeb";
import { postRouter } from "./routers/post";
import { reviewRouter } from "./routers/review";
import { userRouter } from "./routers/user";
import { listingRouter } from "./routers/listing";
import { gameRouter } from "./routers/game";
import { likeRouter } from "./routers/like";
import { favoriteRouter } from "./routers/favorite";
import { tagRouter } from "./routers/tag";
import { rankRouter } from "./routers/rank";
import { offerRouter } from "./routers/offer";
import { transactionRouter } from "./routers/transaction";
import { messageRouter } from "./routers/message";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    comment: commentRouter,
    favorite: favoriteRouter,
    game: gameRouter,
    keeb: keebRouter,
    like: likeRouter,
    listing: listingRouter,
    message: messageRouter,
    offer: offerRouter,
    post: postRouter,
    rank: rankRouter,
    review: reviewRouter,
    tag: tagRouter,
    transaction: transactionRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
