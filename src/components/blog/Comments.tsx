export const Comments = ({ comments = [] }) => {
    return (
        <>
            <h2 className="mt-10 mb-4 text-4xl lg:text-6xl leading-tight">
                Comments:
            </h2>
            <ul>
                {comments?.map(({ _id, _createdAt, name, comment }: any) => (
                    <li key={_id} className="mb-5">
                        <hr className="mb-5" />
                        <h4 className="mb-2 leading-tight">
                            <span>{name}</span>
                            <br />{" "}
                            <time dateTime={_createdAt}>
                                {_createdAt.split("T")[0]}
                            </time>
                        </h4>
                        <p>{comment}</p>
                        <hr className="mt-5 mb-5" />
                    </li>
                ))}
            </ul>
        </>
    );
};
