import { api } from "~/utils/api";
import EachDisplayKeebCard from "./eachDisplayKeebCard";
import Image from "next/image";
import plus from "@public/Vectors/plus-plus.png";
import { useState } from "react";
import ModalDialog from "~/components/Modal";
import CreateKeeb from "../CreateKeeb";

export default function DisplayKeebs({ userId }: { userId: string }) {
    const { data: keebData } = api.keeb.getAllByUserId.useQuery(userId);

    const [isOpen, setIsOpen] = useState<boolean>(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <div className="w-full">
            <div className="mt-5 flex justify-end">
                <button onClick={openModal}>
                    <Image
                        src={plus}
                        alt="create keeb"
                        width={200}
                        height={200}
                        className="shop-create-listing w-12  transition duration-150 ease-in-out "
                    />
                </button>
            </div>
            <ModalDialog isOpen={isOpen} onClose={closeModal}>
                <CreateKeeb closeModal={closeModal} userId={userId} />
            </ModalDialog>

            <div className="mt-5 flex w-full flex-wrap gap-5">
                {keebData?.map((keeb, i) => (
                    <EachDisplayKeebCard
                        key={i}
                        keeb={keeb}
                        length={keebData.length}
                        userId={userId}
                    />
                ))}
            </div>
        </div>
    );
}
