"use client";
import { motion } from "framer-motion";
export default function ArrowPopup() {
    return (
        <>
            <motion.div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 text-green-500 bg-darkGray/80 p-2 rounded-full opacity-0 hover:opacity-80">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-12 h-12"
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        d="M7 17L17 7M17 7H8M17 7V16"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </motion.div>
        </>
    );
}
