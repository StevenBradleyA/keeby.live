import type { Keeb } from "@prisma/client";
import { api } from "~/utils/api";

interface DeleteKeebProps {
    keeb: Keeb;
}

export default function DeleteKeeb({ keeb }: DeleteKeebProps) {
    const ctx = api.useContext();

    // const {mutate} = api.keeb

    const deleteKeeb = () => {};

    return (
        <>
            <div> Are you sure you want to delete </div>
            <div>{keeb.name}</div>

            <div>
                {" "}
                Deleting a keyboard will permanently delete the typing data
                associated with it{" "}
            </div>

            <button>GoodBye Forever </button>
            <button>Cancel </button>
        </>
    );
}
