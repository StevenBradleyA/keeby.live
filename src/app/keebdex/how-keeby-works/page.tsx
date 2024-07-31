import MainFooter from "~/app/_components/Footer/mainFooter";

export default function HowKeebyWorks() {
    // what do I actually want here lmao????
    //

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
                            <h2 className=" mt-5 text-3xl">KEEBSHOP </h2>
                            <p className="mt-2">
                                {`A marketplace where users can buy and sell
                                mechanical keyboards. I wanted a safe and fun
                                place to buy and look at other builds for sale.
                                So I created a marketplace where seller's are
                                verified and can be reviewed by the community.`}
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Buying
                            </h2>
                            <p>
                                When you purchase a keyboard. Buyers pay Keeby
                                5% of the total agreed price. When payed, Keeby
                                connects the buyer and seller in a private
                                message. Once in a private message the buyer and
                                seller confirm details and perform a transaction
                                of the agreed price via paypal. Keeby provides
                                instructions, and seller information to help
                                protect you as a buyer and prevent scams.
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Selling
                            </h2>
                            <p>
                                {`To Sell a keyboard you must pay a $0.02 fee via
                                paypal to verify your account. Once verified you
                                can sell as many keyboards as you like! During
                                verification, you must also provide the email
                                associated with your paypal account. This will
                                be shown to the buyer when he pays the keeby fee
                                to purchase your keyboard. Seller's pay for
                                shipping and must sell at the agreed price to
                                the buyer via Paypal.`}
                            </p>

                            <h2 className=" mt-5 text-3xl">KEEBSHARE </h2>
                            <p className="mt-2">
                                A fun place to share your builds, post sound
                                tests, and talk about anything mechanical
                                keyboard related.
                            </p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Internet points
                            </h2>
                            <p>
                                Earn internet points by receiving comment likes, or favorites on listings and posts. Bigger number better person.
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
                            <p>Wpm is calculated like this</p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Speed Mode
                            </h2>
                            <p>Wpm is calculated like this</p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Scholar Mode
                            </h2>
                            <p>Wpm is calculated like this</p>
                            <h2 className=" mt-2 text-xl text-hotPink">
                                Freeplay mode
                            </h2>
                            <p>Wpm is calculated like this</p>

                            <h2 className=" mt-2 text-xl text-hotPink">
                                Ranks
                            </h2>
                            <p>Wpm is calculated like this</p>
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
                <MainFooter />
            </div>
        </>
    );
}
