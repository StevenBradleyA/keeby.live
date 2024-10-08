import { PrismaAdapter } from "@auth/prisma-adapter";
import {
    getServerSession,
    type DefaultSession,
    type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { env } from "~/env.mjs";
import { db } from "~/server/db";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            hasProfile: boolean;
            isModerator: boolean;
            username: string;
            selectedTag: string;
            profile: string;
            internetPoints: number;
            isAdmin: boolean;
            isNewsletter: boolean;
            isBanned: boolean;
            // ...other properties
            // role: UserRole;
        } & DefaultSession["user"];
    }

    // interface User {
    //   // ...other properties
    //   // role: UserRole;
    // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
    callbacks: {
        session: ({ session, user }) => ({
            ...session,
            user: {
                // ...session.user,
                // id: user.id,
                ...user,
            },
        }),
    },
    pages: {
        signIn: "/auth/signin",
    },
    adapter: PrismaAdapter(db) as Adapter,
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
        }),
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID,
            clientSecret: env.GOOGLE_CLIENT_SECRET,
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        }),
        /**
         * ...add more providers here.
         *
         * Most other providers require a bit more work than the Discord provider. For example, the
         * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
         * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
         *
         * @see https://next-auth.js.org/providers/github
         */
    ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
