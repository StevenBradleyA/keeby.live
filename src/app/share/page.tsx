"use client";
import { useEffect, useState } from "react";
import ModalDialog from "~/app/_components/Modal";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import ResetArrowSvg from "~/app/_components/Svgs/reset";
import NotificationSvg from "~/app/_components/Svgs/notification";
import { getCookies } from "cookies-next";
import { setCookie } from "cookies-next";
import CreatePostModal from "~/app/_components/Posts/CreatePost";
import DisplayNewPostPreviews from "~/app/_components/Posts/DisplayPosts/DisplayPostPreviews/displayNewPostPreviews";
import DisplayPopularPostPreviews from "~/app/_components/Posts/DisplayPosts/DisplayPostPreviews/displayPopularPostPreviews";
import Footer from "../_components/Footer/footer";

import { debounce } from "lodash";
import CreatePostButton from "../_components/Posts/CreatePost/createPostButton";

export default function KeebShare() {
    const cookies = getCookies();

    const [filter, setFilter] = useState<string>("Hot");
    const [searchInput, setSearchInput] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const [tag, setTag] = useState<string>("");

    const handleSearchClick = () => {
        setIsSpecify(false);
    };

    const handleSpecifyClick = () => {
        setIsSpecify(true);
    };

    const handleResetSpecify = () => {
        setTag("");
    };

    const handleTagSelect = (type: string) => {
        if (tag === type) {
            setTag("");
        } else {
            if (type === "builds") {
                setTag("builds");
            }
            if (type === "memes") {
                setTag("memes");
            }
            if (type === "tutorials") {
                setTag("tutorials");
            }
            if (type === "discussion") {
                setTag("discussion");
            }
        }
    };
    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchQuery(searchInput);
        }, 250);

        handler();
        return () => {
            handler.cancel();
        };
    }, [searchInput]);

    useEffect(() => {
        if (cookies.filter) {
            setFilter(cookies.filter);
        }
    }, [cookies]);

    const handleFilters = (isNew: string) => {
        setFilter(isNew);
        setCookie("filter", isNew, {
            maxAge: 60 * 60 * 24 * 365, // 1 year
            path: "/",
        });
    };

    // going to have to do a lot of refactoring here to use ssr without use client parents as well so new components for state management etc...

    return (
        <>
            <div className="h-44 w-full fixed top-0 left-0 right-0 z-20 bg-dark"></div>
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
                                filter === "Hot"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("Hot")}
                        >
                            Hot
                        </button>
                        <button
                            className={`ease-in ${
                                filter === "New"
                                    ? "border-b border-white text-white hover:text-white"
                                    : "border-b border-white border-opacity-0 hover:text-white/40"
                            }`}
                            onClick={() => handleFilters("New")}
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
                                    <h1 className="text-green-500">Tag:</h1>
                                    <button
                                        className=" absolute -top-1 right-0 h-7 w-7 text-mediumGray ease-in hover:text-green-500"
                                        onClick={handleResetSpecify}
                                    >
                                        <ResetArrowSvg />
                                    </button>
                                </div>
                                <button
                                    onClick={() => handleTagSelect("builds")}
                                    className={` ease-in hover:text-white  ${
                                        tag === "builds"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    builds
                                </button>
                                <button
                                    onClick={() => handleTagSelect("memes")}
                                    className={`ease-in hover:text-white  ${
                                        tag === "memes"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    memes
                                </button>
                                <button
                                    onClick={() => handleTagSelect("tutorials")}
                                    className={`ease-in hover:text-white  ${
                                        tag === "tutorials"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                >
                                    tutorials
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

            <div className="mt-56  text-mediumGray tablet:px-5 desktop:px-16 flex flex-col relative items-end w-full min-h-[60rem] ">
                <div className=" flex w-3/4 flex-col h-full pl-10">
                    <div className=" flex w-full justify-between">
                        <div>
                            {filter === "New" && (
                                <div>
                                    <DisplayNewPostPreviews
                                        searchInput={debouncedSearchQuery}
                                        tag={tag}
                                    />
                                </div>
                            )}
                            {filter === "Hot" && (
                                <div>
                                    <DisplayPopularPostPreviews
                                        searchInput={debouncedSearchQuery}
                                        tag={tag}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-96 w-full relative z-30">
                <Footer />
            </div>
        </>
    );
}
