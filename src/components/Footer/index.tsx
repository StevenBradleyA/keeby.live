import Image from "next/image";
import hacktime from "@public/Vectors/hacktime.png";
import keebo from "@public/Profile/keebo.png";
import title from "@public/Nav/home.png";
import Link from "next/link";

export default function MainFooter() {
    return (
        <div className=" w-full bg-keebyGray px-20 pt-10 text-darkGray">
            <div className="flex w-full justify-between">
                <div className="flex flex-col">
                    <div className="flex items-center">
                        <Image
                            alt="hacktime logo"
                            src={title}
                            width={200}
                            height={200}
                            className=" h-12 object-contain"
                        />
                        <Image
                            alt="hacktime logo"
                            src={keebo}
                            width={200}
                            height={200}
                            className=" h-9 w-9 object-contain"
                        />
                    </div>

                    <p className="mt-2 flex w-96 flex-wrap">
                        Keeby is the one place for everything mechanical
                        keyboards.
                    </p>
                </div>
                <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Explore</h2>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Keeb Shop
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Keeb Share
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Keeb Type
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Profile
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Product</h2>
                        <Link href="/privacy-policy" aria-label="privacy">
                            What do we sell?
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            How does Keeby Profit?
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Help</h2>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Rules
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Return Policy
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Contact Us
                        </Link>
                    </div>
                    <div className="flex flex-col gap-1">
                        <h2 className="text-green-500">Company</h2>
                        <Link href="/privacy-policy" aria-label="privacy">
                            About
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Support Keeby
                        </Link>
                        <Link href="/privacy-policy" aria-label="privacy">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex justify-between border-t-2 border-[#616161] py-5">
                <div className="flex items-center gap-2">
                    <div>{`Built for enthusiasts | powered by Hacktime`}</div>
                    <Image
                        alt="hacktime logo"
                        src={hacktime}
                        width={200}
                        height={200}
                        className="png-green h-6 w-6 object-contain"
                    />
                </div>
                <div className="flex gap-5">
                    <Link href="/privacy-policy" aria-label="privacy">
                        Terms
                    </Link>
                    <Link href="/privacy-policy" aria-label="privacy">
                        Privacy
                    </Link>
                    <Link href="/privacy-policy" aria-label="privacy">
                        Cookie
                    </Link>
                </div>
            </div>
        </div>
    );
}
