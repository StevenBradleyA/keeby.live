import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import ModalDialog from "../Modal";
import SupportMe from "./support";

export default function HomepageFooter() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="mt-96 flex gap-5 text-white/30">
            <div>
                Powered by <button>Hacktime</button>
            </div>
            <Link href="/about" aria-label="About">
                About
            </Link>
            <button onClick={openModal}>Support</button>

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
