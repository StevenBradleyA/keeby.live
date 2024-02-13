import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";
import keebo from "@public/Profile/keebo.png";

export default function CreatePostModal() {
    const { data: sessionData } = useSession();





    
    return (
        <>
            {sessionData === null ? (
                <div className="p-2">
                    <div className="flex items-end gap-2">
                        <h1 className="text-2xl text-green-500">
                            Sign in to post content
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <div className="mt-5 flex justify-center">
                        <motion.button
                            whileHover={{
                                scale: 1.1,
                            }}
                            whileTap={{ scale: 0.95 }}
                            className="  rounded-xl border-2 border-black bg-black px-6 py-2 text-green-500 hover:border-green-500 hover:bg-keebyGray"
                            onClick={() => void signIn()}
                        >
                            {`Let's go`}
                        </motion.button>
                    </div>
                </div>
            ) : (
                <div className="p-2">
                    <div className="flex items-end gap-3">
                        <h1 className="text-2xl text-green-500">
                            Create a Post
                        </h1>
                        <Image alt="keebo" src={keebo} className="h-12 w-12" />
                    </div>
                    <form></form>
                </div>
            )}
        </>
    );
}
