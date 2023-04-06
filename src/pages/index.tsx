import Layout from "@component/components/shared/layout";
import Head from "next/head";
import Typewriter from "typewriter-effect";

export default function Home() {

  let desc = "Hi, my name is Koray. I'm a software engineer based in Istanbul / Türkiye."
  let h1 = "Full-stack web developer, linux hobbyist."
  return (
    <>
      <Head>
        <title>Koray Aydemir</title>
        <meta name="description" content={desc} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Layout>
        <section className="flex flex-col">
          <h1 className="text-center">
            <Typewriter
              onInit={(typewriter) => {
                typewriter.changeDelay(30).typeString(h1)
                  .start();
              }}
            />
          </h1>

          <Typewriter
            onInit={(typewriter) => {
              typewriter.changeDelay(30).typeString(desc)
                .callFunction(() => {
                  console.log('String typed out!');
                })
                .start();
            }}
          />
          <h2>My Projects:</h2>
        </section>

      </Layout>
    </>
  );
}
