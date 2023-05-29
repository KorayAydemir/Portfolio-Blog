import Head from "next/head";
import client from "tina/__generated__/client";
import { createClient } from "next-sanity";
import { useTina } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import WideLayout from "@component/components/shared/layout_wide";
import { CommentForm } from "@component/components/blog/CommentForm";
import { Comments } from "@component/components/blog/Comments";
import { fetchPostsPaths } from "data-api/fetchPosts";

import { InferGetStaticPropsType } from "next";

export default function Post(props: InferGetStaticPropsType<typeof getStaticProps> ) {
    const { data } = useTina({
        query: props.query,
        variables: props.variables,
        data: props.data,
    });

    const {summary, title, date, body, _sys} = data.posts

    return (
        <>
            <Head>
                <title>Blog - {title}</title>
                <meta name="description" content={summary} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Korayzzzzz" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={summary} />
                <meta property="og:url" content={`https://korayaydemir.dev/blog/${_sys.filename}`}/>
                <meta
                    property="og:image"
                    content="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg"
                />
            </Head>

            <WideLayout>
                <ToggleTheme />
                <main className="mb-auto">
                    <div className="mx-auto max-w-3x1 px-4 sm:px-6 xl:max-w-5xl xl:px-0">
                        <header>
                            <div className="space-y-1 border-b border-gray-200 pb-10 text-center dark:border-gray-700">
                                <dl>
                                    <div>
                                        <dt className="sr-only">
                                            Published on
                                        </dt>
                                        <dd className="text-base font-medium leading-6 text-gray-900 dark:text-gray-400">
                                            <time dateTime="2021-08-07T15:32:14.000Z">
                                                {date?.split("T")[0]}
                                            </time>
                                        </dd>
                                    </div>
                                </dl>
                                <div>
                                    <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
                                        {title}
                                    </h1>
                                </div>
                            </div>
                        </header>
                        <div className="prose prose-slate prose-lg dark:prose-invert dark:prose-pre:bg-white dark:prose-pre:text-neutral-800">
                            <TinaMarkdown
                                content={body}
                            ></TinaMarkdown>
                        </div>
                    </div>

                    <div className="mt-28">
                        <Comments comments={props.comments} postId={_sys.filename} />
                        <CommentForm _id={_sys.filename} />
                    </div>
                </main>
            </WideLayout>
        </>
    );
}

export const getStaticPaths = async () => {
    const paths = await fetchPostsPaths();

    return {
        paths,
        fallback: "blocking",
    };
};


export const getStaticProps = async (ctx: {params: {postSlug: string}} ) => {
    const { data, query, variables } = await client.queries.posts({
        relativePath: ctx.params.postSlug + ".md",
    });

    const postName = ctx.params.postSlug;

    const repliesQuery = `
    "replies": replies[@->.approved==true]->{
       "replies": replies[@->.approved==true]->{
           "replies": replies[@->.approved==true]->{
               _id,                 
               name,
               _createdAt,
               comment,                      
               email,
               type,
            },   
           _id,                 
           name,
           _createdAt,
           comment,                      
           email,
           type,
          },
       _id,                 
       name,
       _createdAt,
       comment,                      
       email,
       type,
    }`


// this previous query was pulling every comment that had more than 0 references
// const commentsQuery = `*[_type == "comment" && post == "${postName}" && approved == true && count(*[references(^._id)]) == 0]

    const commentsQuery = `*[_type == "comment" && post == "${postName}" && approved == true && !defined(parent)]
    {
    ...,
    ${repliesQuery}
}`;
    const comments = await sanityClient.fetch(commentsQuery);

    return {
        props: {
                data,
                query,
                variables,
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
