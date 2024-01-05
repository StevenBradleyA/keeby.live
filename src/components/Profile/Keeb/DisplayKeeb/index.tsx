import type { Keeb } from "@prisma/client";

interface KeebProps {
    keeb: Keeb;
}

export default function DisplayKeebs({ keeb }: KeebProps) {
    return (
            <div className="bg-black rounded-2xl p-10">
                <div className="flex justify-center">{keeb.name}</div>
                <div>switches: {keeb.switches}</div>
                <div>keycaps: {keeb.keycaps}</div>
            </div>
    );
}
