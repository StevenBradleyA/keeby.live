import Image from "next/image";
import Link from "next/link";
import hackerman from "@public/Admin/admin-black.png";
import Custom404 from "~/pages/404";
import { useSession } from "next-auth/react";
import { api } from "~/trpc/react";
import EachAdminTicket from "~/app/_components/Admin/Tickets/Display/displayAdminTickets";
import Footer from "~/app/_components/Footer/mainFooter";

export default function AdminTickets() {
    const { data: session } = useSession();
    const accessDenied = !session || !session.user.isAdmin;

    const { data: tickets } = api.ticket.getAll.useQuery();

    if (accessDenied) {
        return <Custom404 />;
    }

    return (
        <div className="w-full">
            <div className="flex justify-center">
                <div className=" relative flex w-1/2 justify-center overflow-hidden rounded-xl bg-black bg-opacity-50 p-5">
                    <Link href="/admin" className="z-10 ">
                        <Image
                            src={hackerman}
                            alt="admin-logo"
                            className="png-red w-32 "
                        />
                    </Link>
                    <div className="absolute right-2 top-0 z-10 font-titillium text-2xl text-failure">
                        TICKETS
                    </div>

                    <div className=" absolute bottom-0 left-0 right-0 top-0  ">
                        <video className="-z-10 w-full" autoPlay loop muted>
                            <source
                                src="https://s3.us-west-2.amazonaws.com/keeby.live/matrix-red-fade.mp4"
                                type="video/mp4"
                            />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

            <div className="mt-10  flex justify-center">
                <div className="flex w-2/3 flex-wrap gap-10">
                    {tickets &&
                        tickets.length > 0 &&
                        tickets.map((ticket) => (
                            <div key={ticket.id}>
                                <EachAdminTicket ticket={ticket} />
                            </div>
                        ))}
                </div>
            </div>
            <div className="mt-96">
                <Footer />
            </div>
        </div>
    );
}
