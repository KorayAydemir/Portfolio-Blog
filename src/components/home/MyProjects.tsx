import Typewriter from "typewriter-effect";
import { MySetup, Portfolio, Tailwind } from "@public/images/index";
import { useGlitch } from "react-powerglitch";
import Project from "./Project";
import { SiTailwindcss, SiTypescript } from "react-icons/si"
import { TbBrandNextjs } from "react-icons/tb"
import { TbBrandTailwind } from "react-icons/tb"
import { FaRust } from "react-icons/fa"

export default function MyProjects() {
  const manualGlitch = useGlitch({
    playMode: "hover",
    timing: { duration: 400 },
    glitchTimeSpan: false,
    shake: false,
  });

  return (
    <div>
      <h3 className="mb-4 font-bold ">
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
            { name: "NextJS", Icon: TbBrandNextjs, className: "text-black" },
            { name: "TypeScript", Icon: SiTypescript, className: "" },
            { name: "Tailwind", Icon: SiTailwindcss, className: "" },
            { name: "TypeScript", Icon: SiTypescript, className: "" },
            { name: "TypeScript", Icon: SiTypescript, className: "" },
            { name: "TypeScript", Icon: SiTypescript, className: "" },
          ]}
        />

        <Project
          img={MySetup}
          alt="my setup"
          fields={[
            { name: "Rust", Icon: FaRust, className: "" },
            { name: "Rust", Icon: FaRust, className: "" },
            { name: "Rust", Icon: FaRust, className: "" }
          ]}
        />
      </div>
    </div>
  );
}
