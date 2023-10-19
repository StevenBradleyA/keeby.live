import { useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ModalDialogProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalDialog: React.FC<ModalDialogProps> = ({
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
                    className="fixed inset-0 z-50 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    onClick={handleBackgroundClick}
                >
                    <motion.div
                        className="fixed inset-0 bg-gray-800 bg-opacity-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="relative flex rounded-lg bg-gradient-to-br from-fuchsia-100 to-blue-200 p-10 shadow-lg"
                        initial={{ scale: 0.8, y: -20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.8, y: 20, opacity: 0 }}
                        transition={{
                            type: "spring",
                            damping: 15,
                            stiffness: 250,
                        }}
                        onClick={handleModalClick}
                    >
                        <button
                            className="absolute right-4 top-2 transform text-lg text-gray-600 transition-transform duration-300 ease-in-out hover:rotate-45 hover:scale-110 hover:text-purple-500"
                            onClick={handleClose}
                        >
                            &times;
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalDialog;
