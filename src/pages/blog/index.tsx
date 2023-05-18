import ToggleTheme from "@component/components/shared/ToggleTheme";
import WideLayout from "@component/components/shared/layout_wide";
import { fetchPosts } from "data-api/fetchPosts";
import Head from "next/head";
import Link from "next/link";
import { Posts } from "tina/__generated__/types";

let desc =
    "Hi, my name is Koray. I'm a software developer based in Istanbul/Türkiye. Welcome to my personal blog.";

type PostPreviews = Omit<Posts, "id" | "_values" | "body">;
export default function Blog({ posts }: { posts: PostPreviews[] }) {
    return (
        <>
            <Head>
                <title>Blog - Koray Aydemir</title>
                <meta name="description" content={desc} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Korayzzzzz" />
                <meta property="og:title" content="Blog Posts" />
                <meta
                    property="og:description"
                    content="Most recent posts about technology."
                />
                <meta
                    property="og:url"
                    content={`https://korayaydemir.dev/blog`}
                />
                <meta
                    property="og:image"
                    content="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg"
                />
            </Head>

            <WideLayout>
                <div className="mr-4 mt-4 flex justify-end">
                    <ToggleTheme />
                </div>
                <div className="space-y-2 pb-8 pt-6 md:space-y-5">
                    <h1 className="md:leading-14 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl">
                        Latest
                    </h1>
                    <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
                        A blog of me talking about anything and tutorials.
                    </p>
                </div>

                <PostsList posts={posts} />

                <main className="mb-auto">
                    <div className="flex items-center justify-center pt-4">
                        <div></div>
                    </div>
                </main>
            </WideLayout>
        </>
    );
}

function PostsList({ posts }: { posts: PostPreviews[] }) {
    return (
        <>
            {posts.map((post) => {
                return (
                    <Post
                        key={post.title}
                        title={post.title}
                        _sys={post._sys}
                        summary={post.summary}
                        date={post.date}
                        tags={post.tags}
                    />
                );
            })}
        </>
    );
}

function Post({ title, date, summary, tags, _sys }: PostPreviews) {
    const tag = tags?.map((tag: string) => (
        <span
            key={tag}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400 mr-3 text-sm font-medium uppercase"
        >
            {tag}
        </span>
    ));

    return (
        <div
            className="divide-y divide-gray-200 dark:divide-gray-700"
            key={title}
        >
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                <li className="py-12">
                    <article>
                        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
                            <dl>
                                <dt className="sr-only">Published on</dt>
                                <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                                    <time dateTime={date}>
                                        {date?.split("T")[0]}
                                    </time>
                                </dd>
                            </dl>
                            <div className="space-y-5 xl:col-span-3">
                                <div className="space-y-6">
                                    <div>
                                        <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                            <Link
                                                className="text-gray-900 dark:text-gray-100"
                                                href={`/blog/${_sys.filename}`}
                                            >
                                                {title}
                                            </Link>
                                        </h2>
                                        <div className="flex flex-wrap">
                                            {tag}
                                        </div>
                                    </div>
                                    <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                                        {summary}
                                    </div>
                                </div>
                                <div className="text-base font-medium leading-6">
                                    <Link
                                        className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                                        aria-label='Read "New features in v1"'
                                        href={`/blog/${_sys.filename}`}
                                    >
                                        Read more →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </article>
                </li>
            </ul>
        </div>
    );
}

export const getStaticProps = async () => {
    const posts = await fetchPosts();

    return {
        props: {
            posts,
        },
    };
};
