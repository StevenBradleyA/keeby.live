import Link from "next/link";
import { useState } from "react";
import ModalDialog from "../../Modal";
import SupportMe from "../supportModal";

export default function KeebTypeFooter() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className=" flex gap-5 text-white/30">

            <Link href="/about" aria-label="About">
                About
            </Link>
            <button onClick={openModal}>Support Keeby</button>

            <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                <SupportMe />
            </ModalDialog>

            <Link href="/privacy-policy" aria-label="Privacy Policy">
                Privacy
            </Link>
            <Link href="/terms-of-service" aria-label="Terms of Service">
                Terms
            </Link>
        </div>
    );
}
