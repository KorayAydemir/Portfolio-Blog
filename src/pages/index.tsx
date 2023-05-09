import MyProjects from "@component/components/home/MyProjects";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import Layout from "@component/components/shared/layout";
import Head from "next/head";
import { useState } from "react";
import {
    FaNodeJs,
    FaRust,
} from "react-icons/fa";
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
import { Skill } from "@component/components/home/Skill";
import Contact from "@component/components/home/Contact";
import { client } from "../../tina/__generated__/client"
import { IntroText } from "@component/components/home/IntroText";
import { LatestPosts } from "@component/components/home/LatestPosts";

export default function Home({ posts }: any) {
    // show rest of the page when text loads
    const [showPage, setShowPage] = useState(true);
    const showPageHandler = () => {
        setShowPage(true)
    }

    let desc =
        "Hi, my name is Koray. I'm a software developer based in Istanbul/Türkiye.";

    return (
        <>
            <Head>
                <title>Koray Aydemir</title>
                <meta name="description" content={desc} />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />

                <meta name="twitter:card" content="summary" />
                <meta name="twitter:creator" content="@Korayzzzzz" />
                <meta property="og:title" content="Koray Aydemir" />
                <meta property="og:description" content={desc} />
                <meta property="og:url" content="https://korayaydemir.dev" />
                <meta property="og:image" content="https://m.media-amazon.com/images/M/MV5BMTQ5MzkzNTIyN15BMl5BanBnXkFtZTYwNzUzOTA2._V1_FMjpg_UX1000_.jpg" />
            </Head>

            <div className="flex justify-end mt-4 mr-4">
                <ToggleTheme />
            </div>

            <Layout>
                <IntroText desc={desc} showPageHandler={showPageHandler} />

                {showPage ? (
                    <>
                        <section>
                            <LatestPosts posts={posts} />
                        </section>

                        <section className="mt-4">
                            <MyProjects />
                        </section>

                        <section className="space-y-6 mt-8">
                            <h2 className=" text-xl font-bold text-center">Skills</h2>
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

                            <h2 className="mt-4 text-xl font-bold text-center">Tools</h2>
                            <Skill
                                fields={[
                                    { name: "Vim", Icon: SiVim },
                                    { name: "Docker", Icon: SiDocker },
                                    { name: "Tmux", Icon: SiTmux },
                                    { name: "Git", Icon: SiGit }
                                ]}
                            />
                        </section>

                        <section>
                            <Contact />
                        </section>
                    </>
                ) : null}
            </Layout>
        </>
    );
}

export const getStaticProps = async () => {
    const postsResponse = await client.queries.postConnection()
    const posts = postsResponse.data.postConnection.edges?.map((post) => {
        return post?.node
    })

    return {
        props: {
            posts
        },
    };
}
