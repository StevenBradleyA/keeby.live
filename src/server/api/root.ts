import { createTRPCRouter } from "~/server/api/trpc";
import { commentRouter } from "./routers/comment";
import { imageRouter } from "./routers/image";
import { keebRouter } from "./routers/keeb";
import { postRouter } from "./routers/post";
import { reviewRouter } from "./routers/review";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    comment: commentRouter,
    image: imageRouter,
    keeb: keebRouter,
    post: postRouter,
    review: reviewRouter,
    user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
