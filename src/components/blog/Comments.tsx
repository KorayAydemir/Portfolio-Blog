import { useState } from "react";
import { SingularComment } from "@component/components/blog/SingularComment";

type Comments = {
    _id: string;
    _createdAt: string;
    name: string;
    comment: string;
    replies: string;
};

export const Comments = ({
    comments,
    postId,
}: {
    comments: [];
    postId: string;
}) => {
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const toggleReplyForm = (commentId: string) => {
        setActiveReplyId(commentId === activeReplyId ? null : commentId);
    };

    return (
        <>
            <h2 className="mb-4 mt-10 text-4xl leading-tight lg:text-6xl">
                Comments:
            </h2>
            <ul>
                {comments?.map(
                    ({ _id, _createdAt, name, comment, replies }: Comments) => (
                        <SingularComment
                            postId={postId}
                            replies={replies}
                            key={_id}
                            _id={_id}
                            _createdAt={_createdAt}
                            name={name}
                            comment={comment}
                            isActive={activeReplyId === _id}
                            activeReplyId={activeReplyId}
                            toggleReplyForm={toggleReplyForm}
                        />
                    )
                )}
            </ul>
        </>
    );
};
