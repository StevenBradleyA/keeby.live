import Link from "next/link";
import Footer from "../_components/Footer/footer";

export default function HowKeebyWorks() {
    // calculations
    // const timeInSeconds = stopwatch.getElapsedRunningTime() / 1000;
    // const timeInMinutes = timeInSeconds / 60;
    // const pureWpm = totalTypedCharacters / 5 / timeInMinutes;
    // const wpm = totalCorrectlyTypedCharacters / 5 / timeInMinutes;
    // const accuracy =
    //     (totalCorrectlyTypedCharacters / totalPromptCharacters) * 100;

    // wpm - total number of characters in the correctly typed words (including spaces), divided by 5 and normalised to 60 seconds.
    // pure wpm - calculated just like wpm, but also includes incorrect words.
    // accuracy - percentage of correctly pressed keys.

    return (
        <>
            <div className="rules-background relative bottom-36 h-full w-full overflow-x-hidden  ">
                <div className="palm-tree one">
                    <div className="palm-frond"></div>
                    <div className="divet first"></div>
                    <div className="divet second"></div>
                </div>
                <div className="palm-tree two">
                    <div className="palm-frond"></div>
                    <div className="divet first"></div>
                    <div className="divet second"></div>
                </div>
                <div className="palm-tree three">
                    <div className="palm-frond"></div>
                    <div className="divet first"></div>
                    <div className="divet second"></div>
                </div>
                <div className="palm-tree four">
                    <div className="palm-frond"></div>
                    <div className="divet first"></div>
                    <div className="divet second"></div>
                </div>
                <div className="parasol"></div>
                <div className="flip-flop"></div>
                <div className="flip-flop" id="second-flip-flop"></div>
                <div className="chair"></div>
            </div>
            <div className="pool-edge relative bottom-36 -mb-36 h-[2000px] w-full bg-white p-6">
                <div className="pool h-full w-full"></div>
                <div className="inner-tube"></div>
                <div className="pool-sign-edge absolute -top-60 left-1/2 w-[800px] -translate-x-1/2 rounded-2xl p-2">
                    <div className="pool-sign h-full w-full rounded-2xl border-8 pb-5 pt-10 font-bungee     ">
                        <div className="flex justify-center text-5xl">
                            <h1 className="px-10 font-bungeeShade">
                                HOW KEEBY WORKS
                            </h1>
                        </div>
                        <div className="mt-10 px-10 ">
                            <p>
                                Keeby is the one place for everything mechanical
                                keyboard, built for enthusiasts!
                            </p>
                            <h2 className=" mt-5 text-3xl">MARKETPLACE </h2>
                            <p className="mt-2">
                                {`Marketplace is where users can enjoy
                                mechanical keyboard listings. I wanted a fun and safe
                                place to buy/sell and look at other builds for sale, 
                                so I created a marketplace where seller's and
                                buyers can be reviewed by the community.`}
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                How does it work?
                            </h2>
                            <p>
                                Keeby does not handle any transactions between
                                buyers and sellers, we are not a marketplace
                                facilitator. Keeby only makes profit from ads
                                and support from the community. When you agree
                                to buy a keyboard from a seller or your offer is
                                accepted by a seller, you are put in a private
                                message with the seller. You and the seller will
                                arrange payment and shipping details. We
                                recommend all transactions only occur through
                                paypal as they have a strong dispute resolution
                                support so you don&apos;t get scammed. Please
                                protect yourself as both a buyer and a seller by
                                reading and following
                                <Link
                                    href="/scam-prevention"
                                    aria-label="learn how to prevent scams"
                                    className="text-hotPink hover:underline hover:opacity-70"
                                >
                                    Scam Prevention
                                </Link>
                            </p>

                            <h2 className=" mt-2 text-xl text-hotPink">
                                Newsletter
                            </h2>
                            <p>
                                Want to see cool mechanical keyboards for sale
                                in your inbox everyday? I know my wallet
                                doesn&apos;t! Sign up here{" "}
                                <Link
                                    href="/newsletter"
                                    aria-label="Sign up for our newsletter"
                                    className="text-hotPink hover:underline hover:opacity-70"
                                >
                                    Newsletter
                                </Link>
                            </p>

                            <h2 className=" mt-5 text-3xl">KEEBSHARE </h2>
                            <p className="mt-2">
                                A fun place to share your builds, post sound
                                tests, memes, and talk about anything and
                                everything mechanical keyboard related.
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Internet points
                            </h2>
                            <p>
                                Earn internet points by receiving likes on
                                comments and posts, or favorites on listings and
                                posts. Just remember, bigger number = better
                                person.
                            </p>

                            <h2 className=" mt-5 text-3xl">KEEBSHOP </h2>
                            <p className="mt-2">
                                Check out links to products and companies I like
                                to use for building and buying keyboards. All of
                                these links are to companies I&apos;ve used
                                before. Keeby does not sell any keyboard
                                products.
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Affiliate Links
                            </h2>
                            <p>
                                Currently none of the links are affliate, but we
                                would love to work with you! If we&apos;ve used
                                and like your product we would be honored to
                                promote and work with you!
                            </p>

                            <h2 className=" mt-5 text-3xl">KEEBTYPE </h2>
                            <p className="mt-2">
                                A Typing game made for the keyboard connoisseur.
                                KeebType features keyboard based profiles with
                                an integrated rank and tag unlock system.
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Statistics
                            </h2>
                            <p>
                                Wpm: Total number of characters in the correctly
                                typed words (including spaces), divided by 5 and
                                adjusted to a 60-second timeframe.
                            </p>
                            <p>
                                Pure Wpm: Similar to WPM, but also includes
                                incorrect words.
                            </p>
                            <p>
                                Ranked Score: The average speed across your top
                                10 fastest ranked games.
                            </p>
                            <p>
                                Accuracy: The percentage of keys pressed
                                correctly.
                            </p>
                        </div>

                        <div className="mt-10 flex w-full justify-center bg-hotPink p-2 text-2xl text-lightYellow">
                            NO LIFEGUARD ON DUTY
                        </div>
                        <div className="mt-2 flex justify-center text-hotPink">
                            SWIM AT YOUR OWN RISK
                        </div>
                    </div>
                </div>
            </div>

            <div className=" w-full ">
                <Footer />
            </div>
        </>
    );
}
