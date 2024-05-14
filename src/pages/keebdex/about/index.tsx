import MainFooter from "~/components/Footer/mainFooter";
import Image from "next/image";
import portrait from "@public/About/portrait.png";
import leftKeeb from "@public/About/left.png";
import rightKeeb from "@public/About/right.png";
import template from "@public/About/template.png";
import keebo from "@public/Profile/keebo.png";

export default function KeebyAbout() {
    return (
        <>
            <div className="relative flex h-[80vh] w-full justify-center text-darkGray">
                <Image
                    alt="about"
                    src={template}
                    className=" png-dark-gray absolute left-1/2 w-3/4 -translate-x-1/2 object-cover "
                />
                <div className="z-10 flex h-full w-2/3  flex-col  justify-between pb-5 pl-28 pr-32 pt-16">
                    <div className="flex h-full w-full items-center gap-5  ">
                        <div className="h-full w-40 flex-shrink-0 overflow-hidden border-2 border-[#616161]">
                            <Image
                                alt="keyboard"
                                src={leftKeeb}
                                className="relative bottom-2 h-[105%] w-full object-cover  "
                            />
                        </div>

                        <div className="flex h-full w-full flex-col  ">
                            <div className="h-1 bg-darkGray"></div>
                            <p className=" mt-5">
                                I love mechanical keyboards, so I built Keeby. A
                                place where you can buy, sell, share and even
                                type with different boards. The keyboard
                                community is amazing, and I hope this
                                retro-futuristic inspired platform helps bring
                                people together.
                            </p>
                            <div className=" z-10 mt-5 h-1/2 w-full pb-5">
                                <Image
                                    alt="profile"
                                    src={portrait}
                                    className="h-full w-full  rounded-t-[80px] border-2 border-[#616161] object-cover "
                                />
                            </div>
                            <div className="relative h-full  w-full">
                                <h1
                                    className="absolute -bottom-10  font-titillium text-[230px]   "
                                    style={{
                                        transform: "scaleY(1.5)",
                                        letterSpacing: "5px",
                                    }}
                                >
                                    KEEBY
                                </h1>
                            </div>
                        </div>

                        <div className="h-full w-40 flex-shrink-0 overflow-hidden border-2 border-[#616161]  ">
                            <Image
                                alt="keyboard"
                                src={rightKeeb}
                                className="relative bottom-2 h-[105%] w-full object-cover "
                            />
                        </div>
                    </div>
                    <div
                        className=" overflow-hidden whitespace-nowrap p-1 text-green-500 "
                        style={{ letterSpacing: "32px" }}
                    >
                        {` LOVE MECHANICAL KEYBOARDS`}
                    </div>
                </div>
            </div>

            <div className="mt-5 flex w-full justify-end px-10">
                <Image
                    alt="keeby mascot"
                    src={keebo}
                    className="relative bottom-12 h-40 w-40"
                />
            </div>

            <div className="flex w-[40%] justify-center gap-20 items-center  ">
                <div className="flex-shrink-0 text-xl flex flex-col gap-2">
                    <button className="w-full">Support Keeby</button>
                    <button className="w-full justify-start flex">Hire Me</button>
                </div>
                <p className="rounded-md border-2 border-[#616161]  p-10 text-lg text-green-500">
                    {` If you are a software engineer and can give me a
                    recommendation for a role or an interview that would mean a
                    lot. I'm a entry level dev currently looking for work so
                    please reach out :D`}
                </p>
            </div>

            <div className="mt-96 w-full">
                <MainFooter />
            </div>
        </>
    );
}
