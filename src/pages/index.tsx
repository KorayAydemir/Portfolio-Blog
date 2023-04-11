import MyProjects from "@component/components/home/MyProjects";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import Layout from "@component/components/shared/layout";
import Head from "next/head";
import { useState } from "react";
import {
  FaArrowRight,
  FaNodeJs,
  FaRust,
} from "react-icons/fa";
import Typewriter from "typewriter-effect";

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
import Link from "next/link";
import { client } from "../../tina/__generated__/client"

export default function Home({ posts }: any) {
  console.log(posts)
  let latestPosts = [];
  for (let i = 0; i < 3; i++) {
    if (posts[i] !== undefined) {
      latestPosts.push(
        <Link key={i} href="/blog">
          <div className="mt-3 flex">
            <span className="mr-8">{posts[i].date?.split("T")[0]}</span>
            <span>{posts[i].title}</span>
          </div>
          <span className="mt-2">Go to Blog <FaArrowRight className="inline" /></span>
        </Link>)
    }

  }

  let desc =
    "Hi, my name is Koray. I'm a software engineer based in Istanbul/Türkiye.";
  let h1 = "Full-stack web developer, ";
  let h1p2 = "linux hobbyist";

  // show rest of the page when text loads
  const [showPage, setShowPage] = useState(false);

  return (
    <>
      <Head>
        <title>Koray Aydemir</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <noscript>
          <link rel="stylesheet" type="text/css" href="/noscript.css" />
        </noscript>
      </Head>
      <div className="flex justify-end mt-4 mr-4">
        <ToggleTheme />
      </div>

      <Layout>
        <noscript>
          <h1 className="text-center font-bold text-2xl">
            {h1}
            {h1p2}
          </h1>

          <h2 className="mt-4 text-center text-xl">{desc}</h2>
          <h3 className="mt-4 text-xl">
            <MyProjects />
          </h3>
        </noscript>

        <section>
          <h1 className="text-center font-bold text-2xl">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(18)
                  .typeString(h1)
                  .pauseFor(580)
                  .typeString(h1p2)
                  .start();
              }}
              options={{
                cursor: "T",
                cursorClassName:
                  "bg-neutral-900 text-neutral-900 dark:bg-white dark:text-white Typewriter__cursor",
              }}
            />
          </h1>

          <h2 className="mt-4 text-center text-xl">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .changeDelay(16)
                  .typeString(desc)
                  .callFunction(() => {
                    setShowPage(true);
                  })
                  .start();
              }}
              options={{
                cursor: "",
                cursorClassName:
                  "p-[0.6px] bg-neutral-900 text-neutral-900 dark:bg-white dark:text-white Typewriter__cursor",
              }}
            />
          </h2>
        </section>

        {showPage ? (
          <>
            <section>
              <h2 className="font-bold text-2xl">Latest Posts</h2>
              {latestPosts}
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
