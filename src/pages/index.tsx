import { FaNodeJs, FaRust } from "react-icons/fa";
import {
    SiDocker,
    SiGit,
    SiHtml5,
    SiJavascript,
    SiPostgresql,
    SiReact,
    SiTmux,
    SiTypescript,
    SiVim,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { VscTerminalBash } from "react-icons/vsc";

import Head from "next/head";
import { fetchPosts } from "data-api/fetchPosts";
import { Posts } from "tina/__generated__/types";

import ToggleTheme from "@component/components/shared/ToggleTheme";
import Layout from "@component/components/shared/layout";
import MyProjects from "@component/components/home/MyProjects";
import { Skill } from "@component/components/home/Skill";
import Contact from "@component/components/home/Contact";
import { IntroText } from "@component/components/home/IntroText";
import { LatestPosts } from "@component/components/home/LatestPosts";

export default function Home({ posts }: { posts: Posts[] }) {
    let desc =
        "Hi, my name is Koray. I'm a software developer based in Istanbul/Türkiye.";

    return (
        <>
            <Head>
                <title>Koray Aydemir</title>
                <meta name="description" content={desc} />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Korayzzzzz" />
                <meta property="og:title" content="Koray Aydemir" />
                <meta property="og:description" content={desc} />
                <meta property="og:url" content="https://korayaydemir.dev" />
                <meta
                    property="og:image"
                    content="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg"
                />
            </Head>

            <ToggleTheme />

            <Layout>
                <IntroText desc={desc} />
                <section>
                    <LatestPosts posts={posts} />
                </section>

                <section className="mt-4">
                    <MyProjects />
                </section>

                <section className="mt-8 space-y-6">
                    <h2 className=" text-center text-xl font-bold">Skills</h2>
                    <Skill
                        fields={[
                            {
                                name: "NextJs",
                                Icon: TbBrandNextjs,
                            },
                            {
                                name: "ReactJs",
                                Icon: SiReact,
                            },
                            {
                                name: "JavaScript",
                                Icon: SiJavascript,
                            },
                            {
                                name: "TypeScript",
                                Icon: SiTypescript,
                            },
                            {
                                name: "Node.js",
                                Icon: FaNodeJs,
                            },
                            {
                                name: "Rust",
                                Icon: FaRust,
                            },
                            {
                                name: "PostgreSQL",
                                Icon: SiPostgresql,
                            },
                            {
                                name: "Bash",
                                Icon: VscTerminalBash,
                            },
                            {
                                name: "HTML/CSS",
                                Icon: SiHtml5,
                            },
                        ]}
                    />

                    <h2 className="mt-4 text-center text-xl font-bold">
                        Tools
                    </h2>
                    <Skill
                        fields={[
                            { name: "Vim", Icon: SiVim },
                            { name: "Docker", Icon: SiDocker },
                            { name: "Tmux", Icon: SiTmux },
                            { name: "Git", Icon: SiGit },
                        ]}
                    />
                </section>

                <section>
                    <Contact />
                </section>
            </Layout>
        </>
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
