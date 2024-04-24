import { motion } from "framer-motion";
import { useState } from "react";
import { useSession } from "next-auth/react";
import TitleScripts from "~/components/TitleScripts";
import Custom404 from "../404";
import CreateListing from "~/components/KeebShop/CreateListing/Create";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function CreateListingAgreement() {
    const { data: session } = useSession();

    const accessDenied = !session || !session.user.isVerified;


    if (accessDenied) {
        return <Custom404 />;
    }

    // TODO Setup modals for rules, scam prevention -- create keeby rules pool themed and we will link them

    return (
        <>
            <div className="matrix-full-screen fixed bottom-0 left-0 right-0 top-0 h-full w-full  ">
                <video
                    className="absolute bottom-0 left-0 right-0 top-0 -z-10 h-full w-full object-cover  object-center"
                    autoPlay
                    loop
                    muted
                >
                    <source
                        src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-fade-green.mp4"
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>
            </div>
            <div className="z-10 flex w-full flex-col items-center justify-center">
                <CreateListing  />
            </div>
        </>
    );
}
