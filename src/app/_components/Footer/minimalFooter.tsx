"use client";
import Link from "next/link";
import { useState } from "react";
import ModalDialog from "../Context/Modal";
import SupportMe from "./supportModal";
import { useGlobalState } from "../Context/GlobalState/globalState";
import { themeStyles } from "../Games/Theme/themeStyles";
import type { ThemeName } from "../Games/Theme/themeStyles";

export default function KeebTypeFooter() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { theme } = useGlobalState();
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    // maybe replace text with simple icons

    return (
        <div className={`${styles.textColor} flex gap-5 `}>
            <Link
                href="/about"
                aria-label="about keeby"
                className={`ease-in ${styles.hoverText} `}
            >
                about
            </Link>
            <Link
                href="/marketplace"
                aria-label="Checkout out keyboard listings"
                className={`ease-in ${styles.hoverText} `}
            >
                marketplace
            </Link>
            <Link
                href="/share"
                aria-label="Share your keyboard with others"
                className={`ease-in ${styles.hoverText} `}
            >
                share
            </Link>
            <Link
                href="/shop"
                aria-label="Shop mechanical keyboards"
                className={`ease-in ${styles.hoverText} `}
            >
                shop
            </Link>
            <button
                onClick={openModal}
                className={`ease-in ${styles.hoverText} `}
            >
                support
            </button>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <SupportMe />
            </ModalDialog>
            {/* 
            <Link
                href="/profile"
                aria-label="Check out your profile"
                className={`ease-in ${styles.hoverText} `}
            >
                profile
            </Link> */}
        </div>
    );
}
