import { useSession } from "next-auth/react";
import MainFooter from "~/components/Footer";
import defaultProfile from "@public/Profile/profile-default.png";
import Image from "next/image";
import { api } from "~/utils/api";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Link from "next/link";

interface ErrorsObj {
    email?: string;
    emailConfirmation?: string;
    emailMatch?: string;
}

export default function VerifySeller() {
    const { data: sessionData, update } = useSession();

    const ctx = api.useContext();

    const [purchaseStage, setPurchaseStage] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [emailConfirmation, setEmailConfirmation] = useState<string>("");
    const [errors, setErrors] = useState<ErrorsObj>({});
    const [enableErrorDisplay, setEnableErrorDisplay] =
        useState<boolean>(false);

    const { mutate } =
        api.transaction.createVerificationTransaction.useMutation({
            onSuccess: async () => {
                toast.success("verified!", {
                    style: {
                        borderRadius: "10px",
                        background: "#333",
                        color: "#fff",
                    },
                });
                setPurchaseStage("");
                await update();
                await ctx.user.invalidate();
            },
        });

    useEffect(() => {
        const errorsObj: ErrorsObj = {};

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email.length) {
            errorsObj.email = "Please provide your PayPal associated email";
        } else if (!emailRegex.test(email)) {
            errorsObj.email = "Invalid email format";
        }

        if (!emailConfirmation.length) {
            errorsObj.emailConfirmation = "Please confirm email";
        }
        if (email !== emailConfirmation) {
            errorsObj.emailMatch = "Email and confirmation do not match";
        }

        setErrors(errorsObj);
    }, [email, emailConfirmation]);

    return (
        <>
            {sessionData && sessionData.user && (
                <div className="mb-40  text-white laptop:w-3/4  desktop:w-2/3">
                    <div className="flex h-full w-full gap-20">
                        <div className="h-full w-3/4">
                            <h1 className="px-10 text-5xl text-green-500">
                                Sell Your Keeb
                            </h1>
                            <p className="mt-5 rounded-xl bg-keebyGray p-10 text-white">
                                {`I wanted to create a fun and safe place to buy and sell keyboards, which is how keeby started! To sell your board on keeby you have
                                to register your paypal account. This will be a one time only $0.02 charge to verify your account. Finally, you will provide the email associated with your paypal account. This will only be shown to the verified buyer who has payed keeby's fee to purchase your board at the agreed upon price. `}
                            </p>

                            {purchaseStage === "" &&
                                sessionData.user.isVerified === true && (
                                    <div className="flex justify-center">
                                        <Link
                                            href="/create-listing"
                                            aria-label="privacy"
                                            className=" text-md keeb-shop-offer-button z-10 mt-20 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-3 pl-1 pr-5 text-black "
                                            style={{
                                                boxShadow: "0 0 20px #22C55E",
                                            }}
                                        >
                                            <>
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
                                                    {`Sell Your Keeb `}
                                                </span>
                                                {/* className="keeb-shop-offer-button-circle w-2" */}

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    className="keeb-shop-offer-button-circle w-2"
                                                    viewBox="0 0 32 32"
                                                >
                                                    <circle
                                                        cx="16"
                                                        cy="16"
                                                        r="16"
                                                    />
                                                </svg>
                                            </>
                                        </Link>
                                    </div>
                                )}

                            {purchaseStage === "" &&
                                sessionData.user.isVerified === false && (
                                    <div className="flex justify-center">
                                        <button
                                            className=" text-md keeb-shop-offer-button z-10 mt-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-3 pl-1 pr-5 text-black "
                                            style={{
                                                boxShadow: "0 0 20px #22C55E",
                                            }}
                                            onClick={() =>
                                                setPurchaseStage("EMAIL")
                                            }
                                        >
                                            <>
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
                                                    {`Verify `}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="keeb-shop-offer-button-circle w-5"
                                                    viewBox="-1.5 0 20 20"
                                                    version="1.1"
                                                >
                                                    <g
                                                        id="Page-1"
                                                        stroke="none"
                                                        strokeWidth="1"
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g
                                                            id="Dribbble-Light-Preview"
                                                            transform="translate(-222.000000, -7559.000000)"
                                                            fill="currentColor"
                                                        >
                                                            <g
                                                                id="icons"
                                                                transform="translate(56.000000, 160.000000)"
                                                            >
                                                                <path
                                                                    d="M182.475463,7404.9 C181.260804,7410.117 177.555645,7411 172.578656,7411 L171.078137,7419 L173.825411,7419 C174.325918,7419 174.53555,7418.659 174.627828,7418.179 C175.312891,7413.848 175.216601,7414.557 175.278788,7413.879 C175.337966,7413.501 175.664951,7413 176.049108,7413 C179.698098,7413 182.118387,7411.945 182.857614,7408.158 C183.120405,7406.811 183.034145,7405.772 182.475463,7404.9 M171.134306,7410.86 L170.011926,7417 L166.535456,7417 C166.206465,7417 165.954707,7416.598 166.006864,7416.274 L168.602682,7399.751 C168.670887,7399.319 169.045014,7399 169.484337,7399 L175.718111,7399 C179.409228,7399 181.894714,7400.401 181.319983,7404.054 C180.313953,7410.56 174.737157,7410 172.199514,7410 C171.760191,7410 171.203515,7410.428 171.134306,7410.86"
                                                                    id="paypal-[#140]"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </>
                                        </button>
                                    </div>
                                )}
                            {purchaseStage === "EMAIL" && (
                                <>
                                    <h2 className="mt-5 text-lg text-green-500">
                                        Please provide the email associated with
                                        your PayPal Account
                                    </h2>

                                    <form className="mt-3 flex w-full gap-10">
                                        <div className="flex w-1/2 flex-col ">
                                            <input
                                                id="email"
                                                value={email}
                                                onChange={(e) =>
                                                    setEmail(e.target.value)
                                                }
                                                className=" h-10 w-full rounded-md bg-darkGray p-1 text-white "
                                                placeholder="Email"
                                            />
                                            {enableErrorDisplay &&
                                                errors.email && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.email}
                                                    </p>
                                                )}
                                        </div>
                                        <div className="flex w-1/2 flex-col ">
                                            <input
                                                id="email"
                                                value={emailConfirmation}
                                                onChange={(e) =>
                                                    setEmailConfirmation(
                                                        e.target.value
                                                    )
                                                }
                                                className=" h-10 w-full rounded-md bg-darkGray p-1 text-white"
                                                placeholder="Email confirmation"
                                            />
                                            {enableErrorDisplay &&
                                                errors.emailConfirmation && (
                                                    <p className="text-sm text-red-400">
                                                        {
                                                            errors.emailConfirmation
                                                        }
                                                    </p>
                                                )}
                                            {enableErrorDisplay &&
                                                errors.emailMatch && (
                                                    <p className="text-sm text-red-400">
                                                        {errors.emailMatch}
                                                    </p>
                                                )}
                                        </div>
                                    </form>
                                    <p className=" mt-2 text-darkGray">
                                        {`*This email will only be shared with the
                                        verified buyer who has paid Keeby's fee
                                        to purchase your board at the agreed
                                        price in a private message between you
                                        and the buyer. All transactions must be
                                        conducted through this email via PayPal
                                        to ensure the safety of the buyer.`}
                                    </p>

                                    <div className="flex justify-center">
                                        <button
                                            className=" text-md keeb-shop-offer-button z-10 mt-10 flex cursor-pointer items-center gap-2 rounded-md bg-green-500 py-3 pl-1 pr-5 text-black "
                                            style={{
                                                boxShadow: "0 0 20px #22C55E",
                                            }}
                                            onClick={() => {
                                                if (
                                                    Object.values(errors)
                                                        .length > 0
                                                ) {
                                                    setEnableErrorDisplay(true);
                                                } else {
                                                    setPurchaseStage("PAYPAL");
                                                }
                                            }}
                                        >
                                            <>
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
                                                    {`Submit Email `}
                                                </span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="keeb-shop-offer-button-circle w-5"
                                                    viewBox="-1.5 0 20 20"
                                                    version="1.1"
                                                >
                                                    <g
                                                        id="Page-1"
                                                        stroke="none"
                                                        strokeWidth="1"
                                                        fill="none"
                                                        fillRule="evenodd"
                                                    >
                                                        <g
                                                            id="Dribbble-Light-Preview"
                                                            transform="translate(-222.000000, -7559.000000)"
                                                            fill="currentColor"
                                                        >
                                                            <g
                                                                id="icons"
                                                                transform="translate(56.000000, 160.000000)"
                                                            >
                                                                <path
                                                                    d="M182.475463,7404.9 C181.260804,7410.117 177.555645,7411 172.578656,7411 L171.078137,7419 L173.825411,7419 C174.325918,7419 174.53555,7418.659 174.627828,7418.179 C175.312891,7413.848 175.216601,7414.557 175.278788,7413.879 C175.337966,7413.501 175.664951,7413 176.049108,7413 C179.698098,7413 182.118387,7411.945 182.857614,7408.158 C183.120405,7406.811 183.034145,7405.772 182.475463,7404.9 M171.134306,7410.86 L170.011926,7417 L166.535456,7417 C166.206465,7417 165.954707,7416.598 166.006864,7416.274 L168.602682,7399.751 C168.670887,7399.319 169.045014,7399 169.484337,7399 L175.718111,7399 C179.409228,7399 181.894714,7400.401 181.319983,7404.054 C180.313953,7410.56 174.737157,7410 172.199514,7410 C171.760191,7410 171.203515,7410.428 171.134306,7410.86"
                                                                    id="paypal-[#140]"
                                                                ></path>
                                                            </g>
                                                        </g>
                                                    </g>
                                                </svg>
                                            </>
                                        </button>
                                    </div>
                                </>
                            )}

                            {purchaseStage === "PAYPAL" && (
                                <>
                                    <h2 className="mt-5 text-center text-lg  ">
                                        Complete your verification by paying a
                                        one-time fee of $0.02 through your
                                        PayPal account.
                                    </h2>
                                    <div className="mt-10 h-[100vh] w-full overflow-auto px-40 ">
                                        <PayPalButtons
                                            createOrder={(data, actions) => {
                                                return actions.order.create({
                                                    intent: "CAPTURE",
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                value: "0.02",
                                                                currency_code:
                                                                    "USD",
                                                            },
                                                        },
                                                    ],
                                                });
                                            }}
                                            onApprove={async (
                                                data,
                                                actions
                                            ) => {
                                                if (actions && actions.order) {
                                                    const details =
                                                        await actions.order.capture();
                                                    console.log(
                                                        "DATA BB",
                                                        data
                                                    );

                                                    console.log(
                                                        "DETAILS BB",
                                                        details
                                                    );
                                                    console.log(
                                                        "STATUS TESTING BB",
                                                        details.status
                                                    );

                                                    if (
                                                        details &&
                                                        details.purchase_units &&
                                                        details
                                                            .purchase_units[0] &&
                                                        details
                                                            .purchase_units[0]
                                                            .amount &&
                                                        sessionData &&
                                                        sessionData.user.id &&
                                                        details.id
                                                    ) {
                                                        const transactionData =
                                                            {
                                                                userId: sessionData
                                                                    .user.id,
                                                                paypalOrderId:
                                                                    data.orderID,
                                                                transactionId:
                                                                    details.id,

                                                                price: details
                                                                    .purchase_units[0]
                                                                    .amount
                                                                    .value,
                                                                email: email,
                                                            };
                                                        mutate(transactionData);
                                                    }
                                                }
                                            }}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className=" w-1/4">
                            <div className="flex w-full flex-col gap-5 rounded-xl bg-keebyGray p-10">
                                <Image
                                    alt="profile"
                                    src={
                                        sessionData.user.profile
                                            ? sessionData.user.profile
                                            : defaultProfile
                                    }
                                    className="h-full w-full rounded-md object-cover"
                                    width={800}
                                    height={800}
                                />
                                <div className="rounded-md bg-darkGray p-3 text-center text-white/40">
                                    Status:{" "}
                                    <span
                                        className={`${
                                            sessionData.user.isVerified === true
                                                ? "text-green-500"
                                                : ""
                                        }`}
                                    >
                                        {`${
                                            sessionData.user.isVerified === true
                                                ? "Verified"
                                                : "Not Verified"
                                        }`}
                                    </span>
                                </div>
                            </div>

                            <div className="mt-10 flex w-full flex-col rounded-xl bg-keebyGray p-10 text-darkGray ">
                                <Link
                                    href="/keebdex/how-keeby-works"
                                    aria-label="privacy"
                                    className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                                >
                                    How Keeby Works
                                </Link>
                                <Link
                                    href="/keebdex/rules"
                                    aria-label="keeby rules"
                                    className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                                >
                                    Keeby Rules
                                </Link>
                                <Link
                                    href="/keebdex/scam-prevention"
                                    aria-label="scam prevention"
                                    className="transition-colors duration-400 ease-custom-cubic hover:text-green-500"
                                >
                                    Scam Prevention
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <MainFooter />
        </>
    );
}
