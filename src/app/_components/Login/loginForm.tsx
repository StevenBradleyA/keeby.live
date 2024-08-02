"use client";
import { useEffect, useRef, useState } from "react";
import TitleScripts from "../TitleScripts";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingSpinner from "../Loading";

export default function LoginForm() {
    const { data: session, status } = useSession();
    const hasShownToast = useRef(false);
    const router = useRouter();

    // form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        if (status === "authenticated" && !hasShownToast.current) {
            toast.success(`Welcome, ${session.user.name}!`, {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            hasShownToast.current = true;
            router.push("/");
        }
    }, [status, router, session]);

    if (status === "loading") {
        return <LoadingSpinner size="30px" />;
    }

    return (
        <>
            <div className="absolute top-3 right-3 text-xs flex gap-1 text-white/50">
                <h3>Dont have an account?</h3>
                <button className="text-green-500 hover:opacity-75">
                    Create one
                </button>
            </div>
            <h1 className="text-2xl">Sign In!</h1>
            <div className="relative mt-2 h-5 w-full flex justify-center ">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 text-center w-full">
                    <TitleScripts page="login" />
                </div>
            </div>
            <form className="flex flex-col w-full mt-5">
                <input
                    className="w-full p-3 bg-black rounded-lg placeholder:text-mediumGray "
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <div className="relative mt-3">
                    <input
                        className="w-full pl-3 py-3 pr-10 bg-black rounded-lg placeholder:text-mediumGray"
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        className="absolute right-2 top-1/2 -translate-y-1/2 hover:opacity-70 text-mediumGray "
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 "
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M4.51848 5.55639L6.82251 7.86611C5.6051 8.85592 4.65508 10.1872 4.09704 11.7195L4 11.9859L4.10384 12.2498C4.69454 13.7507 5.68174 15.1297 6.90031 16.1241C8.31938 17.2822 10.1044 17.9758 12.0449 17.9758C13.4414 17.9758 14.7584 17.6164 15.9164 16.9824L18.4277 19.5L19.4815 18.4436L17.1775 16.1339L16.1167 15.0705L9.19255 8.12922L8.08361 7.01755L5.57226 4.5L4.51848 5.55639ZM7.88326 8.92948C6.89207 9.69943 6.09644 10.7454 5.59957 11.9656C6.10925 13.1365 6.90095 14.1982 7.84116 14.9655C9.01025 15.9196 10.467 16.4819 12.0449 16.4819C13.0265 16.4819 13.9605 16.2644 14.8075 15.8708L13.875 14.9361C13.3341 15.2838 12.6902 15.4859 12 15.4859C10.0795 15.4859 8.52268 13.9252 8.52268 12C8.52268 11.3081 8.72429 10.6626 9.07117 10.1203L7.88326 8.92948ZM10.1701 11.2219C10.0688 11.4609 10.013 11.7237 10.013 12C10.013 13.1001 10.9026 13.9919 12 13.9919C12.2756 13.9919 12.5378 13.936 12.7762 13.8345L10.1701 11.2219Z"
                                fill="currentColor"
                            />
                            <path
                                d="M11.9551 6.02417C11.2163 6.02417 10.4988 6.1248 9.81472 6.31407C9.69604 6.3469 9.57842 6.38239 9.4619 6.42047L10.6812 7.64274C11.0937 7.56094 11.5195 7.51813 11.9551 7.51813C13.533 7.51813 14.9898 8.08041 16.1588 9.03448C17.099 9.80176 17.8907 10.8635 18.4004 12.0344C18.0874 12.803 17.6557 13.503 17.1308 14.1083L18.1868 15.1669C18.9236 14.3372 19.5102 13.359 19.903 12.2805L20 12.0141L19.8962 11.7502C19.3055 10.2493 18.3183 8.87033 17.0997 7.87589C15.6806 6.71782 13.8956 6.02417 11.9551 6.02417Z"
                                fill="currentColor"
                            />
                        </svg>
                    </button>
                </div>
                <button className="flex justify-end w-full  mt-3 text-sm text-opacity-50 text-white hover:opacity-50">
                    Forgot Password?
                </button>

                <button
                    className="w-full p-3 bg-green-500 shadow-2xl rounded-lg mt-5"
                    style={{
                        boxShadow: "0 0 20px #22C55E",
                    }}
                >
                    Sign In
                </button>
            </form>
            <div className="flex items-center w-full my-5 gap-2 text-white/50 text-xs">
                <div className="h-[2px] bg-white/50 w-full"></div>
                <h3 className="flex-shrink-0">Or continue with</h3>
                <div className="h-[2px] bg-white/50 w-full"></div>
            </div>
        </>
    );
}
