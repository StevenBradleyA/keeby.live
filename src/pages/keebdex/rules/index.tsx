import MainFooter from "~/components/Footer/mainFooter";

export default function KeebyRules() {
    return (
        <>
            <div className="rules-background relative bottom-36 h-full w-full overflow-x-hidden ">
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
                {/* <div className="pool"></div> */}
                {/* <div className="pool"></div> */}
                {/* <div className="inner-tube"></div> */}
                {/* <div className="sign">
                    <h1>Pool Rules</h1>
                    <ol>
                        <li>No Food, Drinks, or Glass</li>
                        <li>No Running</li>
                        <li>No Animals</li>
                        <li>No Diving</li>
                    </ol>
                    <h2>No Lifeguard On Duty</h2>
                    <h3>Swim at your own risk</h3>
                </div> */}
            </div>

            <div className="mt-96 w-full">
                <MainFooter />
            </div>
        </>
    );
}
