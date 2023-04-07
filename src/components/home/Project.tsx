import Image, { StaticImageData } from "next/image";
import { useGlitch } from "react-powerglitch";

interface Props {
  img: StaticImageData;
  alt: string;
  fields: [string, StaticImageData][];
}

export default function Project(props: Props) {
  const alwaysGlitch = useGlitch({
    playMode: "hover",
    timing: { duration: 950, easing: "ease-in-out" },
    glitchTimeSpan: { start: 0, end: 0.5 },
    shake: false,
    slice: {
      count: 25,
      velocity: 15,
      minHeight: 0.02,
      maxHeight: 0.15,
      hueRotate: true,
    },
  });

  const fields = props.fields.map((field, i) => (
    <div
      key={i}
      className="text-center grow border-solid rounded border-2 dark:border-gray-200 border-gray-800 px-1"
    >
      <span className="font-bold">{field[0]}</span>
    </div>
  ));

  return (
    <div>
      <Image
        ref={alwaysGlitch.ref}
        loading="eager"
        src={props.img}
        alt={props.alt}
        className="rounded-lg"
      />

      <div className="flex space-x-2 mt-4">{fields}</div>
    </div>
  );
}
