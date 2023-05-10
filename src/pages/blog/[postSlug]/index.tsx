import { useTina } from "tinacms/dist/react";
import client from "tina/__generated__/client";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import WideLayout from "@component/components/shared/layout_wide";
import { CommentForm } from "@component/components/blog/CommentForm";
import { Comments } from "@component/components/blog/Comments";
import { createClient } from "next-sanity";
import Head from "next/head";

export default function Post(props: any) {
    const { data } = useTina({
        query: props.tina.query,
        variables: props.tina.variables,
        data: props.tina.data,
    });

    return (
        <>
            <Head>
                <title>Blog - Koray Aydemir</title>
                <meta name="description" content={data.post.summary} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <WideLayout>
                <div className="flex justify-end mr-4 mt-5">
                    <ToggleTheme />
                </div>
                <main className="mb-auto">
                    <div className="mx-auto max-w-3x1 px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                        <header>
                            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                                <dl>
                                    <div>
                                        <dt className="sr-only">
                                            Published on
                                        </dt>
                                        <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                            <time dateTime="2021-08-07T15:32:14.000Z">
                                                {data.post.date?.split("T")[0]}
                                            </time>
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                        {data.post.title}
                                    </h1>
                                </div>
                            </div>
                        </header>
                        <div className="prose prose-slate prose-lg dark:prose-invert dark:prose-pre:bg-white dark:prose-pre:text-neutral-800">
                            <TinaMarkdown
                                content={data.post.body}
                            ></TinaMarkdown>
                        </div>
                    </div>

                    <div className="mt-28">
                        <Comments comments={props.comments} />
                        <CommentForm _id={data.post._sys.filename} />
                    </div>
                </main>
            </WideLayout>
        </>
    );
}

export const getStaticPaths = async () => {
    const { data } = await client.queries.postConnection();
    const paths = data.postConnection.edges?.map((post) => {
        return { params: { postSlug: post?.node?._sys.filename } };
    });

    return {
        paths,
        fallback: "blocking",
    };
};

export const getStaticProps = async (ctx: any) => {
    const { data, query, variables } = await client.queries.post({
        relativePath: ctx.params.postSlug + ".md",
    });

    const postName = ctx.params.postSlug;
    const commentsQuery = `*[_type == "comment" && post == "${postName}" && approved == true]`;
    const comments = await sanityClient.fetch(commentsQuery);

    return {
        props: {
            tina: {
                data,
                query,
                variables,
            },
            comments,
        },
    };
};

const sanityClient = createClient({
    projectId: "j13exjw5",
    dataset: "production",
    apiVersion: "2022-03-25",
    useCdn: false,
});
