import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface MobileContextType {
    isMobile: boolean;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const useMobile = (): MobileContextType => {
    const context = useContext(MobileContext);
    if (context === undefined) {
        throw new Error("useMobile must be used within a MobileProvider");
    }
    return context;
};

interface MobileProviderProps {
    children: ReactNode;
}

const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    const contextValue = {
        isMobile,
    };

    return (
        <MobileContext.Provider value={contextValue}>
            {children}
        </MobileContext.Provider>
    );
};

export default MobileProvider;
