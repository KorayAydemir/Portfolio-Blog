import Typewriter from "typewriter-effect";
import { MySetup, Portfolio, This } from "@public/images/index";
import { useGlitch } from "react-powerglitch";
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

import { FcLikePlaceholder } from "react-icons/fc"

export default function MyProjects() {
  const manualGlitch = useGlitch({
    playMode: "hover",
    timing: { duration: 400 },
    glitchTimeSpan: false,
    shake: false,
  });

  return (
    <>
      <h3 className="mb-4 text-xl font-bold ">
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
          img={MySetup}
          alt="my setup"
          fields={[
            { name: "ShellScript", Icon: SiGnubash },
            { name: "Arch", Icon: SiArchlinux },
            { name: "Neovim", Icon: SiNeovim },
            { name: "Github", Icon: FaGithub, link: "https://github.com/KorayAydemir/Dots" },
          ]}
        />

        <Project
          img={This}
          alt="this-portfolio"
          fields={[{ name: "NextJS", Icon: TbBrandNextjs },
          { name: "TinaCMS", Icon: FcLikePlaceholder },
          { name: "Tailwind", Icon: SiTailwindcss },
          { name: "TypeScript", Icon: SiTypescript },
          { name: "GitHub", Icon: FaGithub, link: "https://github.com/KorayAydemir/NextLearn" },
          ]}
        />
      </div>
    </>
  );
}
