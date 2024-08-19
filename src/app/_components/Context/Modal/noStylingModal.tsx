import { useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MutableRefObject } from "react";

interface ModalDialogueNoStylingProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalDialogueNoStyling: React.FC<ModalDialogueNoStylingProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    const modalRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleOutsideClick = useCallback(
        (e: Event) => {
            if (!isOpen) return;

            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as Node)
            ) {
                handleClose();
            }
        },
        [isOpen, handleClose],
    );

    useEffect(() => {
        window.addEventListener("mousedown", handleOutsideClick);
        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, handleClose, handleOutsideClick]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                    <motion.div
                        className="fixed inset-0 bg-black/40 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="relative"
                        initial={{ scale: 0.8, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 20, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 350,
                        }}
                        ref={modalRef}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalDialogueNoStyling;
