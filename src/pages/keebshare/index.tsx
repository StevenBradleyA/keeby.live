import { useEffect, useState } from "react";
import ModalDialog from "~/components/Modal";
import plus from "@public/Vectors/plus-plus.png";
import Image from "next/image";
import DisplayListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview";
import DisplayPopularListingPreviews from "~/components/KeebShop/DisplayListing/DisplayListingsPreview/displayPopularListingPreviews";
import ResetArrowSvg from "~/components/Svgs/reset";
import NotificationSvg from "~/components/Svgs/notification";
import { getCookies } from "cookies-next";
import { setCookie } from "cookies-next";
import CreatePostModal from "~/components/KeebShare/CreatePost";

export default function KeebShare() {
    // todo Cookies? do we want to save filters? not sure yet maybe just save hot/ new with cookies

    // todo cookies for hot and new is a must lol
    // todo throughly test pagination
    // Conversion to SSR

    const cookies = getCookies();

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [filter, setFilter] = useState<string>("Hot");
    const [isSpecify, setIsSpecify] = useState<boolean>(false);
    const [searchInput, setSearchInput] = useState<string>("");
    const [isSearchFocus, setIsSearchFocus] = useState<boolean>(false);

    // specify
    // thinking tags like memes, builds, discussion, tutorials

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
            if (tag === "builds") {
                setTag("builds");
            }
            if (tag === "meme") {
                setTag("meme");
            }
            if (tag === "clicky") {
                setTag("clicky");
            }
            if (tag === "other") {
                setTag("other");
            }
        }
    };

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
        <div className="mt-10 flex w-full flex-col px-16 text-darkGray">
            <div className=" flex w-full  gap-10 ">
                <div className=" very-sticky flex w-1/4 flex-col">
                    <div className="mb-5 flex gap-5 ">
                        <button
                            onClick={handleSearchClick}
                            className={`${
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
                                className={`${
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

                    <div className=" relative h-[70vh] w-full overflow-hidden rounded-xl bg-keebyGray p-5 text-darkGray">
                        {isSpecify ? (
                            <div className="flex w-full flex-col items-start gap-5">
                                <div className="flex w-full flex-col items-start">
                                    <div className="relative flex w-full">
                                        <h1 className="text-green-500">Tag:</h1>
                                        <button
                                            className=" absolute -top-1 right-0 h-7 w-7"
                                            onClick={handleResetSpecify}
                                        >
                                            <ResetArrowSvg />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() =>
                                            handleTagSelect("builds")
                                        }
                                        className={`${
                                            tag === "builds"
                                                ? "border-b border-white text-white"
                                                : "border-b border-white border-opacity-0"
                                        }`}
                                    >
                                        builds
                                    </button>
                                    <button
                                        onClick={() => handleTagSelect("memes")}
                                        className={`${
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
                                        className={`${
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
                                        className={`${
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
                                    className={` search-input-hack absolute h-10 w-full rounded-md ${
                                        isSearchFocus
                                            ? "search-input-placeholder bg-blackAlternative"
                                            : "bg-darkGray"
                                    } p-1 text-green-500 outline-none `}
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
                                                src="/Videos/matrix-fade-green.mp4"
                                                type="video/mp4"
                                            />
                                            Your browser does not support the
                                            video tag.
                                        </video>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                <div className=" flex w-3/4 flex-col">
                    <div className=" very-sticky flex w-full justify-between bg-dark">
                        <div className="mb-5 flex gap-5 text-white/40">
                            <button
                                className={`${
                                    filter === "Hot"
                                        ? "border-b border-white text-white"
                                        : "border-b border-white border-opacity-0"
                                }`}
                                onClick={() => handleFilters("Hot")}
                            >
                                Hot
                            </button>
                            <button
                                className={`${
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
                                    className="shop-create-listing w-12  transition duration-150 ease-in-out "
                                />
                            </button>
                        </div>
                    </div>
                    <ModalDialog isOpen={isModalOpen} onClose={closeModal}>
                        <CreatePostModal />
                    </ModalDialog>

                    <div>
                        {filter === "New" && <div> new posts</div>}
                        {filter === "Hot" && <div> popular posts</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}
