import Typewriter from "typewriter-effect";
import { MySetup, Portfolio, This } from "@public/images/index";
import Project from "./Project";
import {
    SiArchlinux,
    SiGnubash,
    SiNeovim,
    SiTailwindcss,
    SiTypescript,
} from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";

import { FcLikePlaceholder } from "react-icons/fc";

export default function MyProjects() {
    return (
        <>
            <h3 className="mb-4 min-h-[28px] text-xl font-bold">
                <Typewriter
                    onInit={(typewriter) => {
                        typewriter
                            .changeDelay(30)
                            .typeString("My Projects")
                            .callFunction((state) => {
                                state.elements.cursor.remove();
                            })
                            .start();
                    }}
                />
            </h3>

            <div className="space-y-8">
                <Project
                    priority={true}
                    img={Portfolio}
                    alt="portfolio"
                    fields={[
                        { name: "NextJS", Icon: TbBrandNextjs },
                        { name: "TypeScript", Icon: SiTypescript },
                        { name: "Tailwind", Icon: SiTailwindcss },
                        {
                            name: "Github",
                            Icon: FaGithub,
                            link: "https://github.com/KorayAydemir/Portfolio-Blog",
                        },
                    ]}
                />

                <Project
                    priority={true}
                    img={MySetup}
                    alt="my setup"
                    fields={[
                        { name: "ShellScript", Icon: SiGnubash },
                        { name: "Arch", Icon: SiArchlinux },
                        { name: "Neovim", Icon: SiNeovim },
                        {
                            name: "Github",
                            Icon: FaGithub,
                            link: "https://github.com/KorayAydemir/Dots",
                        },
                    ]}
                />

                <Project
                    priority={false}
                    img={This}
                    alt="this-portfolio"
                    fields={[
                        { name: "NextJS", Icon: TbBrandNextjs },
                        { name: "TinaCMS", Icon: FcLikePlaceholder },
                        { name: "Tailwind", Icon: SiTailwindcss },
                        { name: "TypeScript", Icon: SiTypescript },
                        {
                            name: "GitHub",
                            Icon: FaGithub,
                            link: "https://github.com/KorayAydemir/NextLearn",
                        },
                    ]}
                />
            </div>
        </>
    );
}
