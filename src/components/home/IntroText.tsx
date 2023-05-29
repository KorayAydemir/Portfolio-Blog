import Typewriter from "typewriter-effect";
let h1 = "Full-stack web developer, ";
let h1p2 = "linux hobbyist";
import MyProjects from "./MyProjects";
import Contact from "./Contact";

export const IntroText = ({ desc }: { desc: string }) => {
    return (
        <>
            <noscript>
                <h1 className="text-center text-2xl font-bold">
                    {h1}
                    {h1p2}
                </h1>

                <h2 className="mt-4 text-center text-xl">{desc}</h2>
                <div className="mt-4">
                    <MyProjects />
                </div>
                <Contact />
            </noscript>

            <section className="min-h-[175px] sm:min-h-[120px]">
                <h1 className="min-h-[48px] text-center text-2xl font-bold">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter
                                .changeDelay(16)
                                .typeString(h1)
                                .pauseFor(280)
                                .typeString(h1p2)
                                .start();
                        }}
                        options={{
                            cursor: "",
                            cursorClassName:
                                "px-[7.3px] bg-neutral-900 text-neutral-900 dark:bg-white dark:text-white Typewriter__cursor",
                        }}
                    />
                </h1>

                <h2 className="h-20 text-center text-xl">
                    <Typewriter
                        onInit={(typewriter) => {
                            typewriter.changeDelay(1).typeString(desc).start();
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
    );
};
