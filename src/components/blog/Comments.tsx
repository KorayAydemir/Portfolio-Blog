import { useState } from "react";
import { ReplyForm } from "./ReplyForm";
import { createClient } from "next-sanity";
const sanityClient = createClient({
    projectId: "j13exjw5",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
});

type Comments = {
    _id: string;
    _createdAt: string;
    name: string;
    comment: string;
    children: string;
};

export const Comments = ({
    comments = [],
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
                    ({
                        _id,
                        _createdAt,
                        name,
                        comment,
                        children,
                    }: Comments) => (
                        <Comment
                            postId={postId}
                            _children={children}
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

interface SingularComment {
    isActive: boolean;
    toggleReplyForm: Function;
    _children: any;
    activeReplyId: string | null;
    _id: string;
    _createdAt: string;
    name: string;
    comment: string;
    postId: string;
}

const Comment = ({
    _id,
    _createdAt,
    name,
    comment,
    toggleReplyForm,
    isActive,
    _children,
    activeReplyId,
    postId,
}: SingularComment) => {
    const renderChildren = _children ? (
        <ul className="ml-10">
            {_children.map((c: any) => (
                <Comment
                    postId={postId}
                    key={c.id}
                    _children={c.children}
                    _id={c._id}
                    _createdAt={c._createdAt}
                    name={c.name}
                    comment={c.comment}
                    isActive={activeReplyId === c._id}
                    toggleReplyForm={toggleReplyForm}
                    activeReplyId={activeReplyId}
                />
            ))}
        </ul>
    ) : (
        false
    );

    return (
        <li className={`mb-5`}>
            <h4 className="mb-2 leading-tight">
                <span>{name}</span>
                <br />{" "}
                <time dateTime={_createdAt}>{_createdAt.split("T")[0]}</time>
            </h4>
            <p>{comment}</p>
            <div className="flex">
                <button
                    className="ml-auto mr-5 mt-4 rounded-md border-2 border-black px-2 py-1
                            hover:bg-black hover:text-white dark:border-white dark:hover:bg-white
                            dark:hover:text-black"
                    onClick={() => toggleReplyForm(_id)}
                >
                    <span className="font-bold">Reply</span>
                </button>
                {isActive && <ReplyForm _id={_id} postId={postId} />}
            </div>
            <hr className="mb-5 mt-5 border-black dark:border-white" />
            {renderChildren}
        </li>
    );
};
