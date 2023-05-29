import { FaArrowRight } from "react-icons/fa";
import Link from "next/link";
import Typewriter from "typewriter-effect";
import { Posts } from "tina/__generated__/types";

export const LatestPosts = ({ posts }: { posts: Posts[] }) => {
    let latestPosts = [];
    for (let i = 0; i < 3; i++) {
        if (posts[i] !== undefined) {
            latestPosts.push(
                <Link key={i} href="/blog">
                    <div className="mt-3 flex">
                        <span className="mr-8 text-lg">
                            {posts[i].date?.split("T")[0]}
                        </span>
                        <span className="text-lg font-bold">
                            {posts[i].title}
                        </span>
                    </div>
                    <span className="mt-2">
                        Go to Blog <FaArrowRight className="inline" />
                    </span>
                </Link>
            );
        }
    }

    return (
        <>
            <h2 className="min-h-[32px] text-2xl font-bold">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(18)
                            .typeString("Latest Posts")
                            .start();
                    }}
                    options={{
                        cursor: "",
                    }}
                />
            </h2>
            {latestPosts}
        </>
    );
};
