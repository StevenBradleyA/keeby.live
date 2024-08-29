"use client";
import { setCookie } from "cookies-next";
import { useGlobalState } from "../../Context/GlobalState/globalState";

interface ThemeModalProps {
    closeThemeModal: () => void;
}

export default function ThemeModal({ closeThemeModal }: ThemeModalProps) {
    const { theme, setTheme } = useGlobalState();

    const handleThemeChange = (newTheme: string) => {
        setCookie("theme", newTheme, {
            maxAge: 60 * 60 * 24 * 365,
            path: "/",
        });
        setTheme(newTheme);
        closeThemeModal();
    };

    return (
        <>
            <div className="flex gap-2 w-[300px] h-[500px] flex-col overflow-y-auto px-5">
                <button
                    onClick={() => handleThemeChange("KEEBY")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-green-300/10 p-2`}
                >
                    keeby
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-green-300/30"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("KEEBYRED")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-red-500/10 p-2`}
                >
                    keeby red
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-red-500/50"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("BANANA")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-[#FFFBEA] hover:bg-opacity-10 p-2`}
                >
                    banana
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#FFFBEA]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("HACKERMAN")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-[#FFFBEA] hover:bg-opacity-10 p-2`}
                >
                    hackerman
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#FFFBEA]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("HIPYO")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-[#FFFBEA] hover:bg-opacity-10 p-2`}
                >
                    hipyo
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#FFFBEA]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("PIGGY")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-[#FFFBEA] hover:bg-opacity-10 p-2`}
                >
                    piggy
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#FFFBEA]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
                <button
                    onClick={() => handleThemeChange("PRIMEAGEN")}
                    className={` w-full items-center rounded-lg hover:brightness-110 ease-in flex justify-between text-white hover:bg-[#FFFBEA] hover:bg-opacity-10 p-2`}
                >
                    primeagen
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-[#FFFBEA]"
                        viewBox="0 0 24 24"
                        fill="none"
                    >
                        <g>
                            <path
                                d="M2 14.8002V9.2002C2 8.08009 2 7.51962 2.21799 7.0918C2.40973 6.71547 2.71547 6.40973 3.0918 6.21799C3.51962 6 4.08009 6 5.2002 6H18.8002C19.9203 6 20.4796 6 20.9074 6.21799C21.2837 6.40973 21.5905 6.71547 21.7822 7.0918C22 7.5192 22 8.07899 22 9.19691V14.8031C22 15.921 22 16.48 21.7822 16.9074C21.5905 17.2837 21.2837 17.5905 20.9074 17.7822C20.48 18 19.921 18 18.8031 18H5.19691C4.07899 18 3.5192 18 3.0918 17.7822C2.71547 17.5905 2.40973 17.2837 2.21799 16.9074C2 16.4796 2 15.9203 2 14.8002Z"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                        <g>
                            <path
                                d="M18 15H19"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M9 15H15"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M6 15H5"
                                stroke="gray"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 12H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M5 9H19"
                                stroke="#8A6201"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </g>
                    </svg>
                </button>
            </div>
        </>
    );
}
