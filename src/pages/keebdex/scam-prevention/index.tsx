import MainFooter from "~/components/Footer";

export default function PreventingScams() {
    return (
        <>
            <div>all disputes are handled via paypal</div>
            <div>
                keeby does not handle disputes, we only refund buyer if seller
                does not ship in time.{" "}
            </div>
            <div>
                This is a community site so Please read seller reviews and
                understand that there is a higher risk for new sellers or
                sellers that have poor reviews.{" "}
            </div>
            <div>
                Disputes are handled via paypal. To prevent scams for sellers
                please record a video of your working keyboard / packaging.
                Buyers record a short video of unboxing in case sellers send you
                something different or non functional.{" "}
            </div>
            <div>
                Understand that by listing a keyboard on keeby you are agreeing
                to be honest in your representation of your keyboard. And scams
                by either buyers or sellers will not be tolerated here.{" "}
            </div>
            <div className="mt-32 w-full">
                <MainFooter />
            </div>
        </>
    );
}
