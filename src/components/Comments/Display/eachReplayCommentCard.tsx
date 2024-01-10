import Image from "next/image";
import Link from "next/link";
import keebo from "@public/Profile/profile-keebo.jpg";
import { useSession } from "next-auth/react";
import DisplayLikes from "~/components/KeebShop/Likes/DisplayLikes";
import CreateReplyComment from "../Create/CreateReplyComment";
import { useState } from "react";

interface EachReplyCardProps {
    typeId: string;
    reply: ReplyContents;
    parentId: string;
}

interface ReplyUser {
    id: string;
    username: string | null;
    profile: string | null;
}

interface ReplyContents {
    user: ReplyUser;
    id: string;
    text: string;
    userId: string;
    type: string;
    typeId: string;
    parentId: string | null;
    referencedUser: string | null;
}

export default function EachReplyCommentCard({
    reply,
    typeId,
    parentId,
}: EachReplyCardProps) {

// TODO We are sending a ton of queries when we like a comment
// we only want to be sending a single... 


    const { data: session } = useSession();
    const [showNestedReply, setShowNestedReply] = useState<boolean>(false);

    return (
        <div className="mb-5 flex gap-2 pl-16">
            <div className="">
                {reply.user.profile === null ? (
                    <Image
                        src={keebo}
                        alt="profile"
                        height={600}
                        width={600}
                        className="h-10 w-10 object-cover"
                    />
                ) : (
                    <Image
                        src={reply.user.profile}
                        alt="profile"
                        height={600}
                        width={600}
                        className="h-10 w-10 object-cover"
                    />
                )}
            </div>
            <div className=" w-full flex-wrap text-sm ">
                <div className="relative flex justify-between">
                    <Link href="/profile" className="text-darkGray">
                        {reply.user.username}
                    </Link>

                    {session && session.user.id === reply.userId && (
                        <button className="absolute right-0">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="#616161"
                            >
                                <circle cx="9" cy="4.5" r="1.5" />
                                <circle cx="9" cy="9" r="1.5" />
                                <circle cx="9" cy="13.5" r="1.5" />
                            </svg>
                        </button>
                    )}
                </div>

                {reply.referencedUser ? (
                    <div className="flex gap-1 ">
                        <div className="text-green-500">
                            {`@${reply.referencedUser}`}
                        </div>
                        <div className="whitespace-pre-wrap">{reply.text}</div>
                    </div>
                ) : (
                    <div>{reply.text}</div>
                )}
                <div className="flex gap-5">
                    {/* <DisplayLikes typeId={reply.id} type="COMMENT" /> */}
                    <button
                        onClick={() => setShowNestedReply(!showNestedReply)}
                    >
                        reply
                    </button>
                </div>
                {showNestedReply && reply.user.username && (
                    <CreateReplyComment
                        typeId={typeId}
                        type={"LISTING"}
                        parentId={parentId}
                        replyId={reply.id}
                        referencedUser={reply.user.username}
                        setShowNestedReply={setShowNestedReply}
                    />
                )}
            </div>
        </div>
    );
}
