"use client";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import CreatePostButton from "../../Create/createPostButton";
import ResetArrowSvg from "~/app/_components/Svgs/reset";
import NotificationSvg from "~/app/_components/Svgs/notification";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
// import { getCookies, setCookie } from "cookies-next";

export default function SharePreviewFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const filter = searchParams.get("filter") || "hot";
    const search = searchParams.get("search") || "";
    const tag = searchParams.get("tag") || "";

    // const cookies = getCookies();
    // const [filter, setFilter] = useState<string>("Hot");
    // const [debouncedSearchQuery, setDebouncedSearchQuery] =
    // useState<string>("");
    // const [tag, setTag] = useState<string>("");

    const [searchInput, setSearchInput] = useState<string>(search);
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);

    const updateQueryParams = (params: Record<string, string>) => {
        const newSearchParams = new URLSearchParams(searchParams.toString());

        Object.keys(params).forEach((key) => {
            if (params[key]) {
                newSearchParams.set(key, params[key]);
            } else {
                newSearchParams.delete(key);
            }
        });

        router.replace(`${pathname}?${newSearchParams.toString()}`);
    };

    const handleSearchClick = () => {
        setIsSpecify(false);
    };

    const handleSpecifyClick = () => {
        setIsSpecify(true);
    };

    const handleResetSpecify = () => {
        updateQueryParams({ tag: "" });
    };

    const handleTagSelect = (type: string) => {
        updateQueryParams({ tag: tag === type ? "" : type });
    };

    const handleFilters = (isNew: string) => {
        updateQueryParams({ filter: isNew });
    };

    useEffect(() => {
        const handler = debounce(() => {
            updateQueryParams({ search: searchInput });
        }, 250);

        handler();
        return () => {
            handler.cancel();
        };
    }, [searchInput]);

    return (
        <>
            <div className="flex w-full items-start z-20 fixed top-44 bg-dark px-2 tablet:px-5 desktop:px-16 text-mediumGray">
                <div className="w-1/4 flex gap-5 items-start justify-start ">
                    <button
                        onClick={handleSearchClick}
                        className={`ease-in ${
                            !isSpecify
                                ? "border-b border-white text-white hover:text-white"
                                : "border-b border-white border-opacity-0 hover:text-white/40"
                        }`}
                    >
                        Search
                    </button>
                    <div className="relative flex">
                        <button
                            onClick={handleSpecifyClick}
                            className={`ease-in ${
                                isSpecify
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                        >
                            Specify
                        </button>
                        {tag && (
                            <div className="absolute -right-5 bottom-3 h-5 w-5 text-green-500  ">
                                <NotificationSvg />
                            </div>
                        )}
                    </div>
                </div>
                <div className="w-3/4  flex justify-between pl-10">
                    <div className="flex gap-5 items-start">
                        <button
                            className={`ease-in ${
                                filter === "hot"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("hot")}
                        >
                            Hot
                        </button>
                        <button
                            className={`ease-in ${
                                filter === "new"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("new")}
                        >
                            New
                        </button>
                    </div>
                    <CreatePostButton />
                </div>
            </div>

            <div className=" flex w-[23%] flex-col fixed top-56 left-16 z-20 ">
                <div
                    className={` relative tablet:h-[68vh] desktop:h-[72vh] ${
                        isSpecify ? "overflow-auto" : "overflow-hidden"
                    } w-full rounded-xl bg-darkGray p-5 text-mediumGray`}
                >
                    {isSpecify ? (
                        <div className="flex w-full flex-col items-start gap-5">
                            <div className="flex w-full flex-col items-start">
                                <div className="relative flex w-full">
                                    <h1 className="text-green-500">Tags:</h1>
                                    <button
                                        className=" absolute -top-1 right-0 h-7 w-7 text-mediumGray ease-in hover:text-green-500"
                                        onClick={handleResetSpecify}
                                    >
                                        <ResetArrowSvg />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleTagSelect("showcase")}
                                    className={` mt-1 ease-in hover:text-white  ${
                                        tag === "showcase"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    showcase
                                </button>
                                <button
                                    onClick={() => handleTagSelect("meme")}
                                    className={`ease-in hover:text-white  ${
                                        tag === "meme"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    meme
                                </button>
                                <button
                                    onClick={() => handleTagSelect("guide")}
                                    className={`ease-in hover:text-white  ${
                                        tag === "guide"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    guide
                                </button>
                                <button
                                    onClick={() =>
                                        handleTagSelect("discussion")
                                    }
                                    className={`ease-in hover:text-white  ${
                                        tag === "discussion"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    discussion
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full ">
                            <input
                                id="searchInput"
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className={`search-input-hack absolute h-10 w-full rounded-md px-3 ${
                                    isSearchFocus
                                        ? "search-input-placeholder bg-blackAlternative"
                                        : "bg-mediumGray"
                                } py-1 text-green-500 outline-none `}
                                placeholder="Search"
                                onFocus={() => setIsSearchFocus(true)}
                                onBlur={() => setIsSearchFocus(false)}
                            />

                            {isSearchFocus && (
                                <div className=" search-input-matrix absolute -bottom-[70vh] left-0 top-0 -m-5 rounded-md opacity-70  ">
                                    <video
                                        className="h-full object-cover"
                                        autoPlay
                                        loop
                                        muted
                                    >
                                        <source
                                            src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                                            type="video/mp4"
                                        />
                                        Your browser does not support the video
                                        tag.
                                    </video>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
