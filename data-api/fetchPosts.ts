import client from "tina/__generated__/client";
export async function fetchPosts() {
    const { data } = await client.queries.postsConnection();
    const posts = data.postsConnection.edges?.map((post) => {
        return post?.node;
    });

    return posts;
}

export async function fetchPostsPaths() {
    const { data } = await client.queries.postsConnection();
    const paths = data.postsConnection.edges?.map((post) => {
        return { params: { postSlug: post?.node?._sys.filename } };
    });

    return paths;
}
