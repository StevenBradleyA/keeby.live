"use client";
import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";

interface SessionProviderProps {
    children: ReactNode;
}

const SessionProviderWrapper: React.FC<SessionProviderProps> = ({
    children,
}) => {
    return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
