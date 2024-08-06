"use client";
import Link from "next/link";
import { useState } from "react";
import ModalDialog from "../Modal";
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

    return (
        <div className={`${styles.textColor} flex gap-5 `}>
            <Link
                href="/about"
                aria-label="about keeby"
                className={`ease-in ${styles.hoverText} `}
            >
                About
            </Link>
            <button
                onClick={openModal}
                className={`ease-in ${styles.hoverText} `}
            >
                Support Keeby
            </button>
            <Link
                href="/keebdex/how-keeby-works"
                aria-label="how keeby works"
                className={`ease-in ${styles.hoverText} `}
            >
                Keeb Share
            </Link>
            <Link
                href="/keebdex/how-keeby-works"
                aria-label="how keeby works"
                className={`ease-in ${styles.hoverText} `}
            >
                Keeb Shop
            </Link>
            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <SupportMe />
            </ModalDialog>

            <Link
                href="/privacy-policy"
                aria-label="Privacy Policy"
                className={`ease-in ${styles.hoverText} `}
            >
                Privacy
            </Link>
            <Link
                href="/terms-of-service"
                aria-label="Terms of Service"
                className={`ease-in ${styles.hoverText} `}
            >
                Terms
            </Link>
        </div>
    );
}
