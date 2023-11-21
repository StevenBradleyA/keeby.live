import { createTRPCRouter } from "~/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { imageRouter } from "./routers/image";
import { keebRouter } from "./routers/keeb";
import { postRouter } from "./routers/post";
import { reviewRouter } from "./routers/review";
import { userRouter } from "./routers/user";
import { listingRouter } from "./routers/listing";
import { gameRouter } from "./routers/game";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    comment: commentRouter,
    game: gameRouter,
    image: imageRouter,
    keeb: keebRouter,
    listing: listingRouter,
    post: postRouter,
    review: reviewRouter,
    user: userRouter,

});

// export type definition of API
export type AppRouter = typeof appRouter;
