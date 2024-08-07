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

export default function KeebShare() {
    const cookies = getCookies();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const [filter, setFilter] = useState<string>("Hot");
    const [searchInput, setSearchInput] = useState<string>("");
    const [debouncedSearchQuery, setDebouncedSearchQuery] =
        useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const [tag, setTag] = useState<string>("");

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

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

    return (
        <>
            <div className="mt-10 flex w-full flex-col text-mediumGray tablet:px-5 desktop:px-16">
                <div className=" flex w-full  gap-10 ">
                    <div className=" very-sticky flex w-1/4 flex-col">
                        <div className="mb-5 flex gap-5 ">
                            <button
                                onClick={handleSearchClick}
                                className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                    !isSpecify
                                        ? "border-b border-white text-white"
                                        : "border-b border-white border-opacity-0"
                                }`}
                            >
                                Search
                            </button>
                            <div className="relative flex">
                                <button
                                    onClick={handleSpecifyClick}
                                    className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                        isSpecify
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
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

                        <div
                            className={` relative tablet:h-[68vh] desktop:h-[72vh] ${
                                isSpecify ? "overflow-auto" : "overflow-hidden"
                            } w-full rounded-xl bg-darkGray p-5 text-mediumGray`}
                        >
                            {isSpecify ? (
                                <div className="flex w-full flex-col items-start gap-5">
                                    <div className="flex w-full flex-col items-start">
                                        <div className="relative flex w-full">
                                            <h1 className="text-green-500">
                                                Tag:
                                            </h1>
                                            <button
                                                className=" absolute -top-1 right-0 h-7 w-7 text-mediumGray transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                                                onClick={handleResetSpecify}
                                            >
                                                <ResetArrowSvg />
                                            </button>
                                        </div>
                                        <button
                                            onClick={() =>
                                                handleTagSelect("builds")
                                            }
                                            className={` transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                                tag === "builds"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            builds
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleTagSelect("memes")
                                            }
                                            className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                                tag === "memes"
                                                    ? "border-b border-white text-white"
                                                    : "border-b border-white border-opacity-0"
                                            }`}
                                        >
                                            memes
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleTagSelect("tutorials")
                                            }
                                            className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
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
                                            className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
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
                                        onChange={(e) =>
                                            setSearchInput(e.target.value)
                                        }
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
                                                Your browser does not support
                                                the video tag.
                                            </video>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className=" flex w-3/4 flex-col">
                        <div className=" very-sticky flex w-full justify-between bg-dark">
                            <div className="mb-5 flex gap-5 text-white/40 ">
                                <button
                                    className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                        filter === "Hot"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                    onClick={() => handleFilters("Hot")}
                                >
                                    Hot
                                </button>
                                <button
                                    className={`transition-colors duration-400 ease-custom-cubic hover:text-white  ${
                                        filter === "New"
                                            ? "border-b border-white text-white"
                                            : "border-b border-white border-opacity-0"
                                    }`}
                                    onClick={() => handleFilters("New")}
                                >
                                    New
                                </button>
                            </div>
                            <div className="flex items-center gap-16 ">
                                <button onClick={openModal}>
                                    <Image
                                        src={plus}
                                        alt="create listing"
                                        width={200}
                                        height={200}
                                        className="shop-create-listing w-12 "
                                    />
                                </button>
                            </div>
                        </div>
                        <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                            <CreatePostModal closeModal={closeModal} />
                        </ModalDialog>

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
            <div className="mt-96 w-full">
                <Footer />
            </div>
        </>
    );
}
