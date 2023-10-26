import { useSession } from "next-auth/react";
import Image from "next/image";
import TitleScripts from "~/components/TitleScripts";
import keebo from "../../../public/Nav/bmo-test.jpg";
import { Canvas } from "@react-three/fiber";
import RotatingSphere from "~/components/Profile/RotatingSphere";
import { useState } from "react";

export default function UserProfile() {
    // todo consider hashing or some simple change that doesn't display the correct userID
    // todo does it really matter if this source code is avail...
    // todo could make a simple button to turn off scanlines
    // mdn digest() -- might be useful for us here
    // npm install three @types/three @react-three/fiber

    const { data: sessionData } = useSession();
    const [isRetro, setIsRetro] = useState<boolean>(true);

    return (
        <div className="flex w-3/4 flex-col items-center font-retro text-green-500">
            {isRetro && <div className="retro-scanlines"></div>}

            <TitleScripts page="profile" />
            <div className="mb-10 flex w-full justify-center gap-10">
                <div className="flex flex-col">
                    {sessionData && sessionData.user.profile ? (
                        <Image
                            alt="profile"
                            src={sessionData?.user.profile}
                            width={300}
                            height={300}
                        />
                    ) : (
                        <Image
                            alt="profile"
                            src={keebo}
                            width={300}
                            height={300}
                        />
                    )}
                    <div className=" mt-5 p-5 outline outline-1 outline-green-500">
                        {sessionData?.user.username}
                    </div>
                    <div>tag selection dropdown here</div>
                </div>

                <div className="flex w-1/3 flex-col">
                    <div className="h-72 outline outline-1 outline-green-500 ">
                        <Canvas
                            className="h-full w-full cursor-pointer"
                            onClick={() => setIsRetro(!isRetro)}
                        >
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} />
                            <RotatingSphere />
                        </Canvas>
                    </div>
                    <div className=" p-10 outline outline-1 outline-green-500">
                        hello moving text
                    </div>
                </div>
            </div>

            <div className="flex gap-5">
                <button>KeebType</button>
                <button>KeebShop</button>
                <button>KeebShare</button>
            </div>

            <button className="rounded-2xl bg-green-600 px-6 py-2">
                isVerifiedSeller
            </button>
            <button className="rounded-2xl bg-red-600 px-6 py-2">
                or show dis Register to Sell a KEEB
            </button>
            <button className="rounded-2xl bg-green-600 px-6 py-2">
                My Listings
            </button>
            <button className="rounded-2xl bg-green-600 px-6 py-2">
                My Posts
            </button>
            <div>graph with wpm date and keeb etc</div>
            <div>Keeb Information and highest avg wpm</div>
            <div>user only -- show 10 highest wpm</div>
            <div>Rank information</div>
            <div>Seller Reputation aka reviews with average star rating</div>
        </div>
    );
}
