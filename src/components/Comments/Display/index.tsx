import { api } from "~/utils/api";
import CreateComment from "../Create";
import Image from "next/image";
import keebo from "@public/Profile/profile-keebo.jpg";
import DisplayLikes from "~/components/KeebShop/Likes/DisplayLikes";
import MainFooter from "~/components/Footer";
import Link from "next/link";
import CreateReplyComment from "../Create/CreateReplyComment";

interface DisplayCommentsProps {
    typeId: string;
}

export default function DisplayComments({ typeId }: DisplayCommentsProps) {
    // TODO integrate likes and reply logic
    // TODO filter comments by likes  and new

    // when replying to a reply we want it to show in the og parentiD replies but have an @username to the nested reply

    // const { data: comments, isLoading } = api.comment.getAllByTypeId.useQuery({
    //     type: "LISTING",
    //     typeId: typeId,
    // });

    const { data: comments, isLoading } =
        api.comment.getAllWithReplies.useQuery({
            type: "LISTING",
            typeId: typeId,
        });


    return (
        <>
            <div>{`${comments ? comments.length : 0} COMMENTS`} </div>
            <CreateComment typeId={typeId} type={"LISTING"} />
            {comments &&
                comments.map((comment, i) => (
                    <div key={i} className="mb-5 flex flex-col">
                        <div className="mb-5 flex gap-2">
                            <div className="">
                                {comment.user.profile === null ? (
                                    <Image
                                        src={keebo}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                ) : (
                                    <Image
                                        src={comment.user.profile}
                                        alt="profile"
                                        height={600}
                                        width={600}
                                        className="h-12 w-12 object-cover"
                                    />
                                )}
                            </div>
                            <div className=" w-full flex-wrap text-sm ">
                                <Link href="/profile" className="text-darkGray">
                                    {comment.user.username}
                                </Link>
                                <div className="whitespace-pre-wrap">
                                    {comment.text}
                                </div>
                                <div className="flex justify-between">
                                    <DisplayLikes
                                        typeId={comment.id}
                                        type="COMMENT"
                                    />
                                    <CreateReplyComment
                                        typeId={typeId}
                                        type={"LISTING"}
                                        parentId={comment.id}
                                    />
                                </div>
                            </div>
                        </div>
                        {comment.replies &&
                            comment.replies.map((reply, i) => (
                                <div key={i} className="mb-5 flex gap-2 pl-16">
                                    <div className="">
                                        {reply.user.profile === null ? (
                                            <Image
                                                src={keebo}
                                                alt="profile"
                                                height={600}
                                                width={600}
                                                className="h-12 w-12 object-cover"
                                            />
                                        ) : (
                                            <Image
                                                src={reply.user.profile}
                                                alt="profile"
                                                height={600}
                                                width={600}
                                                className="h-12 w-12 object-cover"
                                            />
                                        )}
                                    </div>
                                    <div className=" w-full flex-wrap text-sm ">
                                        <Link
                                            href="/profile"
                                            className="text-darkGray"
                                        >
                                            {reply.user.username}
                                        </Link>
                                        {reply.referencedUser ? (
                                            <div className="flex gap-1 ">
                                                <div className="text-green-500">
                                                    {`@${
                                                        reply.referencedUser as string
                                                    }`}
                                                </div>
                                                <div className="whitespace-pre-wrap">
                                                    {reply.text}
                                                </div>
                                            </div>
                                        ) : (
                                            <div>{reply.text}</div>
                                        )}
                                        <div className="flex justify-between">
                                            <DisplayLikes
                                                typeId={reply.id}
                                                type="COMMENT"
                                            />
                                            {reply.user.username && (
                                                <CreateReplyComment
                                                    typeId={typeId}
                                                    type={"LISTING"}
                                                    parentId={comment.id}
                                                    referencedUser={
                                                        reply.user.username
                                                    }
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                    </div>
                ))}
            <MainFooter />
        </>
    );
}
