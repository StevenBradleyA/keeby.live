import Link from "next/link";
import { useState } from "react";
import ModalDialog from "../Modal";
import SupportMe from "./supportModal";
import { useTheme } from "../Context/Theme";
import { themeStyles } from "../KeebType/Theme/themeStyles";
import type { ThemeName } from "../KeebType/Theme/themeStyles";

export default function KeebTypeFooter() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const { theme } = useTheme();
    const styles = themeStyles[theme as ThemeName] || themeStyles["KEEBY"];

    return (
        <div className={`${styles.textColor} flex gap-5 `}>
            <Link
                href="/keebdex/about"
                aria-label="About"
                className={`transition-colors duration-300 ease-custom-cubic ${styles.hoverText} `}
            >
                About
            </Link>
            <button
                onClick={openModal}
                className={`transition-colors duration-300 ease-custom-cubic ${styles.hoverText} `}
            >
                Support Keeby
            </button>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <SupportMe />
            </ModalDialog>

            <Link
                href="/privacy-policy"
                aria-label="Privacy Policy"
                className={`transition-colors duration-300 ease-custom-cubic ${styles.hoverText} `}
            >
                Privacy
            </Link>
            <Link
                href="/terms-of-service"
                aria-label="Terms of Service"
                className={`transition-colors duration-300 ease-custom-cubic ${styles.hoverText} `}
            >
                Terms
            </Link>
        </div>
    );
}
