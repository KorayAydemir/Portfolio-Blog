import Link from "next/link";
import Typewriter from "typewriter-effect";
import { FaArrowRight } from "react-icons/fa";
export const LatestPosts = ({ posts }: { posts: { date: string, title: string }[] }) => {
    let latestPosts = [];
    for (let i = 0; i < 3; i++) {
        if (posts[i] !== undefined) {
            latestPosts.push(
                <Link key={i} href="/blog">
                    <div className="mt-3 flex">
                        <span className="mr-8 text-lg">{posts[i].date?.split("T")[0]}</span>
                        <span className="font-bold text-lg">{posts[i].title}</span>
                    </div>
                    <span className="mt-2">Go to Blog <FaArrowRight className="inline" /></span>
                </Link>)
        }
    }

    return (
        <>
            <h2 className="min-h-full font-bold text-2xl">
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
    )
}
