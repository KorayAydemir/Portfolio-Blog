import Typewriter from "typewriter-effect"
let h1 = "Full-stack web developer, ";
let h1p2 = "linux hobbyist";
import MyProjects from "./MyProjects";
import Contact from "./Contact";

export const IntroText = ({ desc, showPageHandler }: { desc: string, showPageHandler: Function }) => {
    return (
        <>
            <noscript>
                <h1 className="text-center font-bold text-2xl">
                    {h1}
                    {h1p2}
                </h1>

                <h2 className="mt-4 text-center text-xl">{desc}</h2>
                <div className="mt-4">
                    <MyProjects />
                </div>
                <Contact />
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
                                    showPageHandler();
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
        </>
    )
}
