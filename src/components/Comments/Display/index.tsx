import { api } from "~/utils/api";
import CreateComment from "../Create";
import Image from "next/image";
import keebo from "@public/Profile/profile-keebo.jpg";

interface DisplayCommentsProps {
    typeId: string;
}

export default function DisplayComments({ typeId }: DisplayCommentsProps) {
    const { data: comments, isLoading } = api.comment.getAllByTypeId.useQuery({
        type: "LISTING",
        typeId: typeId,
    });

    return (
        <>
            <div>{`${comments ? comments.length : 0} COMMENTS`} </div>
            <CreateComment typeId={typeId} type={"LISTING"} />
            {comments &&
                comments.map((e, i) => {
                    console.log(e, "heyyyy");

                    return (
                        <div key={i} className="flex">
                            <div className="">
                                {e.user.profile === null ? (
                                    <Image
                                        src={keebo}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={e.user.profile}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                )}
                            </div>
                            <div className="">
                                <div>{e.user.name}</div>
                                <div> {e.text}</div>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}
