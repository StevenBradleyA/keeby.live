"use client";
import { getCookie, getCookies, setCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

interface StateContextType {
    theme: string;
    // setTheme: (theme: string) => void;
    setTheme: React.Dispatch<React.SetStateAction<string>>;
    footerInViewRef: React.RefObject<HTMLDivElement>;
    pageNumber: number;
    setPageNumber: React.Dispatch<React.SetStateAction<number>>;
    listingPageImageIndex: number;
    setListingPageImageIndex: React.Dispatch<React.SetStateAction<number>>;
}

const GlobalStateContext = createContext<StateContextType | undefined>(
    undefined,
);

export const useGlobalState = (): StateContextType => {
    const context = useContext(GlobalStateContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a GlobalStateProvider");
    }
    return context;
};

interface ThemeProviderProps {
    children: ReactNode;
}

const GlobalStateProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const cookies = getCookies();
    const { data: session } = useSession();
    const [theme, setTheme] = useState<string>("KEEBY");
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [listingPageImageIndex, setListingPageImageIndex] =
        useState<number>(0);

    const footerInViewRef = useRef(null);

    const pathname = usePathname();
    const router = useRouter();

    const hasProfile = session?.user.hasProfile;

    useEffect(() => {
        if (cookies.theme) {
            setTheme(cookies.theme);
        }
    }, [cookies]);

    const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const isProfilePlus = pathname === "/profile-plus";
        if (session && hasProfile === false && !isProfilePlus) {
            void router.push("/profile-plus");
        }

        const cookieConsent = getCookie("cookieConsent");
        if (!cookieConsent) {
            setShowCookieBanner(true);
            setIsModalOpen(true);
        }
    }, [hasProfile, pathname, session]);

    const handleAcceptCookies = () => {
        setCookie("cookieConsent", "true", {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setShowCookieBanner(false);
    };

    const value = {
        theme,
        setTheme,
        footerInViewRef,
        pageNumber,
        setPageNumber,
        listingPageImageIndex,
        setListingPageImageIndex,
    };
    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
};

export default GlobalStateProvider;

//     const [showCookieBanner, setShowCookieBanner] = useState<boolean>(false);
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

//     const openModal = () => {
//         setIsModalOpen(true);
//     };

//     const closeModal = () => {
//         setIsModalOpen(false);
//     };

//     useEffect(() => {
//         const isProfilePlus = pathname === "/profile-plus";
//         if (session && hasProfile === false && !isProfilePlus) {
//             void router.push("/profile-plus");
//         }

//         const cookieConsent = getCookie("cookieConsent");
//         if (!cookieConsent) {
//             setShowCookieBanner(true);
//             setIsModalOpen(true);
//         }
//     }, [hasProfile, pathname, session]);

//     const handleAcceptCookies = () => {
//         setCookie("cookieConsent", "true", {
//             maxAge: 60 * 60 * 24 * 365,
//             path: "/",
//         });
//         setShowCookieBanner(false);
//     };

// {showCookieBanner && (
//                     <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
//                         <div className="flex flex-col items-center text-sm">
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 fill="currentColor"
//                                 className="h-12 w-12 text-green-500"
//                                 viewBox="0 0 32 32"
//                             >
//                                 <path d="M 16 4 C 9.371094 4 4 9.371094 4 16 C 4 22.628906 9.371094 28 16 28 C 22.628906 28 28 22.628906 28 16 C 28 15.515625 27.964844 15.039063 27.90625 14.566406 C 27.507813 14.839844 27.023438 15 26.5 15 C 25.421875 15 24.511719 14.3125 24.160156 13.359375 C 23.535156 13.757813 22.796875 14 22 14 C 19.789063 14 18 12.210938 18 10 C 18 9.265625 18.210938 8.585938 18.558594 7.992188 C 18.539063 7.996094 18.519531 8 18.5 8 C 17.117188 8 16 6.882813 16 5.5 C 16 4.941406 16.1875 4.433594 16.496094 4.019531 C 16.332031 4.011719 16.167969 4 16 4 Z M 23.5 4 C 22.671875 4 22 4.671875 22 5.5 C 22 6.328125 22.671875 7 23.5 7 C 24.328125 7 25 6.328125 25 5.5 C 25 4.671875 24.328125 4 23.5 4 Z M 14.050781 6.1875 C 14.25 7.476563 15 8.585938 16.046875 9.273438 C 16.015625 9.511719 16 9.757813 16 10 C 16 13.308594 18.691406 16 22 16 C 22.496094 16 22.992188 15.9375 23.46875 15.8125 C 24.152344 16.4375 25.015625 16.851563 25.953125 16.96875 C 25.464844 22.03125 21.1875 26 16 26 C 10.484375 26 6 21.515625 6 16 C 6 11.152344 9.46875 7.097656 14.050781 6.1875 Z M 22 9 C 21.449219 9 21 9.449219 21 10 C 21 10.550781 21.449219 11 22 11 C 22.550781 11 23 10.550781 23 10 C 23 9.449219 22.550781 9 22 9 Z M 14 10 C 13.449219 10 13 10.449219 13 11 C 13 11.550781 13.449219 12 14 12 C 14.550781 12 15 11.550781 15 11 C 15 10.449219 14.550781 10 14 10 Z M 27 10 C 26.449219 10 26 10.449219 26 11 C 26 11.550781 26.449219 12 27 12 C 27.550781 12 28 11.550781 28 11 C 28 10.449219 27.550781 10 27 10 Z M 11 13 C 9.894531 13 9 13.894531 9 15 C 9 16.105469 9.894531 17 11 17 C 12.105469 17 13 16.105469 13 15 C 13 13.894531 12.105469 13 11 13 Z M 16 15 C 15.449219 15 15 15.449219 15 16 C 15 16.550781 15.449219 17 16 17 C 16.550781 17 17 16.550781 17 16 C 17 15.449219 16.550781 15 16 15 Z M 12.5 19 C 11.671875 19 11 19.671875 11 20.5 C 11 21.328125 11.671875 22 12.5 22 C 13.328125 22 14 21.328125 14 20.5 C 14 19.671875 13.328125 19 12.5 19 Z M 19.5 20 C 18.671875 20 18 20.671875 18 21.5 C 18 22.328125 18.671875 23 19.5 23 C 20.328125 23 21 22.328125 21 21.5 C 21 20.671875 20.328125 20 19.5 20 Z" />
//                             </svg>
//                             <h1 className="mt-3 text-lg">We use cookies</h1>
//                             <p className="mt-3 w-80 text-sm ">
//                                 Keeby uses cookies to remember your active
//                                 settings and keep you signed in to provide a
//                                 better overall experience.
//                             </p>
//                             <Link
//                                 href="/cookie-policy"
//                                 aria-label="cookie policy"
//                                 className="mt-1 text-mediumGray underline transition-colors duration-400 ease-custom-cubic hover:text-green-500 "
//                             >
//                                 Cookie Policy
//                             </Link>

//                             <button
//                                 className="profile-manage-button mt-5 flex items-center gap-2 rounded-md  border-2 border-green-500 bg-green-500 py-2 pr-4 text-black hover:bg-darkGray "
//                                 onClick={handleAcceptCookies}
//                             >
//                                 <svg
//                                     className="profile-manage-button-arrow w-4"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="none"
//                                     viewBox="0 0 24 24"
//                                 >
//                                     <path
//                                         stroke="currentColor"
//                                         strokeLinecap="round"
//                                         strokeLinejoin="round"
//                                         strokeWidth="3"
//                                         d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
//                                     ></path>
//                                 </svg>
//                                 <span className="profile-manage-button-text">
//                                     Okay
//                                 </span>
//                                 <svg
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     fill="currentColor"
//                                     className="profile-manage-button-circle w-2"
//                                     viewBox="0 0 32 32"
//                                 >
//                                     <circle cx="16" cy="16" r="16" />
//                                 </svg>
//                             </button>
//                         </div>
//                     </ModalDialog>
//                 )}
