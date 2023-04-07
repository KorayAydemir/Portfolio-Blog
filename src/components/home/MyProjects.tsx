import Image from "next/image";
import Typewriter from "typewriter-effect";
import { MySetup, Portfolio, Rust } from "@public/images/index";
import { useGlitch } from "react-powerglitch";
import Project from "./Project";

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
          img={MySetup}
          alt="my setup"
          fields={[
            ["NextJS", Portfolio],
            ["Rust", Rust],
          ]}
        />

        <Project
          img={Portfolio}
          alt="portfolio"
          fields={[
            ["NextJS", Portfolio],
            ["Rust", Rust],
          ]}
        />
      </div>
    </div>
  );
}
