import { motion } from "framer-motion";
import TitleScripts from "~/components/TitleScripts";

export default function KeebDex() {

    return (
        <>
            <TitleScripts page={"keebdex"} />
            <div className="z-30 flex flex-col gap-5 rounded-3xl  bg-keebyGray px-20 py-10 text-green-500">
                <motion.button
                    className="keebdex-hover-effect rounded-2xl  bg-black  px-6 py-4 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    How Do Auctions Work?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    How to Prevent Scams?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Are There Returns?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    What Is KEEBY?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4 "
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Why Are We Still Here Just To Suffer?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Tactiles or Linears?
                </motion.button>
                <motion.button
                    className="keebdex-hover-effect  rounded-2xl bg-black px-6 py-4"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Can I support Keeby?
                </motion.button>
            </div>
        </>
    );
}
