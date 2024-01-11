import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModifyCommentModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModifyCommentModal: React.FC<ModifyCommentModalProps> = ({
    isOpen,
    onClose,
    children,
}) => {
    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    const handleBackgroundClick = () => {
        handleClose();
    };

    const handleModalClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (isOpen && event.target instanceof HTMLDialogElement) {
                handleClose();
            }
        };

        window.addEventListener("mousedown", handleOutsideClick);

        return () => {
            window.removeEventListener("mousedown", handleOutsideClick);
        };
    }, [isOpen, handleClose]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="absolute right-0 top-5 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={handleBackgroundClick}
                >
                    <motion.div
                        className="fixed inset-0 "
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="relative flex rounded-lg bg-keebyGray px-8 py-2 shadow-lg"
                        initial={{ scale: 0.8, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 20, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 350,
                        }}
                        onClick={handleModalClick}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModifyCommentModal;
