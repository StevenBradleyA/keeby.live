import type { Listing, ListingOffer } from "@prisma/client";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

interface AcceptDeclineOfferProps {
    closeModal: () => void;
    listing: Listing & {
        listingOffer: ListingOfferWithBuyer[];
    };
    offer: ListingOfferWithBuyer;
    modalToggle: string;
}

interface ListingOfferWithBuyer extends ListingOffer {
    buyer: {
        username: string | null;
    };
}

export default function AcceptDeclineOffer({
    closeModal,
    listing,
    offer,
    modalToggle,
}: AcceptDeclineOfferProps) {
    const ctx = api.useContext();

    const { mutate: deleteOffer } = api.offer.delete.useMutation({
        onSuccess: () => {
            void ctx.offer.getAllByUserId.invalidate();
            toast.success("Offer Declined!", {
                style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                },
            });
            closeModal();
        },
    });

    const handleDelete = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: offer.id,
            buyerId: offer.buyerId,
            sellerId: listing.sellerId,
        };

        deleteOffer(data);
    };

    const handleAccept = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: offer.id,
            buyerId: offer.buyerId,
            sellerId: listing.sellerId,
        };

        // deleteOffer(data);
    };

    return (
        <>
            {modalToggle === "ACCEPT" && <div>accepting offer here</div>}
            {modalToggle === "DECLINE" && (
                <div>
                    <h1>
                        Are you sure you want to{" "}
                        <span className="text-red-500">Decline</span> this
                        offer?{" "}
                    </h1>

                    <div className="flex justify-center gap-10 ">
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-darkGray py-2 pr-4 text-black "
                            onClick={handleDelete}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-arrow w-3"
                                viewBox="0 0 25 25"
                                version="1.1"
                            >
                                <g
                                    stroke="none"
                                    stroke-width="1"
                                    fill="none"
                                    fill-rule="evenodd"
                                >
                                    <g
                                        transform="translate(-469.000000, -1041.000000)"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M487.148,1053.48 L492.813,1047.82 C494.376,1046.26 494.376,1043.72 492.813,1042.16 C491.248,1040.59 488.712,1040.59 487.148,1042.16 L481.484,1047.82 L475.82,1042.16 C474.257,1040.59 471.721,1040.59 470.156,1042.16 C468.593,1043.72 468.593,1046.26 470.156,1047.82 L475.82,1053.48 L470.156,1059.15 C468.593,1060.71 468.593,1063.25 470.156,1064.81 C471.721,1066.38 474.257,1066.38 475.82,1064.81 L481.484,1059.15 L487.148,1064.81 C488.712,1066.38 491.248,1066.38 492.813,1064.81 C494.376,1063.25 494.376,1060.71 492.813,1059.15 L487.148,1053.48"
                                            id="cross"
                                        ></path>
                                    </g>
                                </g>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`Yes I'm Sure `}
                            </span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="keeb-shop-offer-button-circle w-5"
                                fill="currentColor"
                                viewBox="0 0 32 32"
                            >
                                <path d="M0 16q0 3.264 1.28 6.208t3.392 5.12 5.12 3.424 6.208 1.248 6.208-1.248 5.12-3.424 3.392-5.12 1.28-6.208-1.28-6.208-3.392-5.12-5.088-3.392-6.24-1.28q-3.264 0-6.208 1.28t-5.12 3.392-3.392 5.12-1.28 6.208zM4 16q0-3.264 1.6-6.016t4.384-4.352 6.016-1.632 6.016 1.632 4.384 4.352 1.6 6.016-1.6 6.048-4.384 4.352-6.016 1.6-6.016-1.6-4.384-4.352-1.6-6.048zM9.76 20.256q0 0.832 0.576 1.408t1.44 0.608 1.408-0.608l2.816-2.816 2.816 2.816q0.576 0.608 1.408 0.608t1.44-0.608 0.576-1.408-0.576-1.408l-2.848-2.848 2.848-2.816q0.576-0.576 0.576-1.408t-0.576-1.408-1.44-0.608-1.408 0.608l-2.816 2.816-2.816-2.816q-0.576-0.608-1.408-0.608t-1.44 0.608-0.576 1.408 0.576 1.408l2.848 2.816-2.848 2.848q-0.576 0.576-0.576 1.408z" />
                            </svg>
                        </button>
                        <button
                            className=" text-md keeb-shop-offer-button mt-5 flex items-center gap-2 rounded-md bg-green-500 py-2 pr-4 text-black "
                            onClick={closeModal}
                        >
                            <svg
                                className="keeb-shop-offer-button-arrow w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M3.515 12h16.97m0 0L13.01 4.525M20.485 12l-7.475 7.476"
                                ></path>
                            </svg>
                            <span className="keeb-shop-offer-button-text">
                                {`No `}
                            </span>

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="currentColor"
                                className="keeb-shop-offer-button-circle w-2"
                                viewBox="0 0 32 32"
                            >
                                <circle cx="16" cy="16" r="16" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
