import MyProjects from "@component/components/home/MyProjects";
import ToggleTheme from "@component/components/shared/ToggleTheme";
import Layout from "@component/components/shared/layout";
import Head from "next/head";
import { useState } from "react";
import Typewriter from "typewriter-effect";

export default function Home() {
  let desc =
    "Hi, my name is Koray. I'm a software engineer based in Istanbul/Türkiye.";
  let h1 = "Full-stack web developer, ";
  let h1p2 = "linux hobbyist";

  // show projects when text loads
  const [showMyProjects, setShowMyProjects] = useState(false);
  const myProjects = showMyProjects ? <MyProjects /> : null;

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
          <h1>
            {h1}
            {h1p2}
          </h1>
          <h2>{desc}</h2>
          <MyProjects />
        </noscript>
        <section className="flex flex-col">
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
                    setShowMyProjects(true);
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

          <h3 className="mt-4 text-xl">{myProjects}</h3>
        </section>
      </Layout>
    </>
  );
}
