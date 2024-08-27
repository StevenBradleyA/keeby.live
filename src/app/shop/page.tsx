import Footer from "../_components/Footer/footer";
import PickParams from "../_components/Picks/Display/pickParams";

export default function Shop() {
    // click a param
    // sub params show up...

    // really simply just shows links
    // we should add some cool featured listings later and stuff but for now let's just get products showing up...

    return (
        <>
            <div className="px-16 mt-40 flex flex-col w-full items-center">
                <div className="flex desktop:w-3/4 gap-3 h-72">
                    <div className="w-[35rem] bg-mediumGray rounded-3xl shadow-lg h-full"></div>
                    <div className="flex w-96 h-full flex-col gap-3">
                        <div className="w-full h-3/4 bg-darkGray rounded-3xl shadow-lg"></div>
                        <div className="w-full h-1/4 bg-darkGray rounded-3xl shadow-lg"></div>
                    </div>
                    <div className="h-full w-full flex flex-col ">
                        <h1 className="text-6xl w-full flex justify-end">
                            Explore Keyboard Parts
                        </h1>
                        <div className="flex w-full  h-full gap-3">
                            <div className="w-full h-full bg-darkGray rounded-3xl shadow-lg"></div>
                            <div className="w-20 h-full bg-mediumGray rounded-3xl shadow-lg"></div>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-center mt-5">
                    <PickParams />
                </div>
            </div>

            <div className="mt-10">
                <Footer />
            </div>
        </>
    );
}
