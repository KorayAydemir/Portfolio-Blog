import { ReplyForm } from "./ReplyForm";
import { createContext, useContext } from "react";

interface SingularComment {
    isActive: boolean;
    toggleReplyForm: Function;
    replies: any;
    activeReplyId: string | null;
    _id: string;
    _createdAt: string;
    name: string;
    comment: string;
    postId: string;
}

export const DepthContext = createContext<number>(0);

export const SingularComment = ({
    _id,
    _createdAt,
    name,
    comment,
    toggleReplyForm,
    isActive,
    replies,
    activeReplyId,
    postId,
}: SingularComment) => {
    const parentDepth = useContext(DepthContext);

    const renderReplies = replies ? (
        <DepthContext.Provider value={parentDepth + 1}>
            <ul className="ml-10">
                {replies.map((c: SingularComment) => (
                    <SingularComment
                        postId={postId}
                        key={c._id}
                        replies={c.replies}
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
        </DepthContext.Provider>
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

            {parentDepth < 3 && (
                <div className="flex">
                    <button
                        className="ml-auto mr-5 mt-2 rounded-md border-2 border-black px-2 py-1
                            hover:bg-black hover:text-white dark:border-white dark:hover:bg-white
                            dark:hover:text-black"
                        onClick={() => toggleReplyForm(_id)}
                    >
                        <span className="font-bold">Reply</span>
                    </button>
                    {isActive && <ReplyForm _id={_id} postId={postId} />}
                </div>
            )}
            <hr className="mb-3 mt-3 border-black dark:border-white" />
            {renderReplies}
        </li>
    );
};
