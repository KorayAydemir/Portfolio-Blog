import Image, { StaticImageData } from "next/image";
import { IconType } from "react-icons";
import { useGlitch } from "react-powerglitch";
import { LinkOrDiv } from "../shared/LinkOrDiv";

interface Props {
  img: StaticImageData;
  alt: string;
  fields: { name: string, Icon: IconType, link?: string }[]
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


  const fields = props.fields.map((field, i) => {
    const { name, Icon, link } = field;
    return (
      <LinkOrDiv href={link!} className="px-3 py-0.5 flex-1 flex border-solid rounded border-2 dark:border-slate-400 border-gray-800 px-1 text-center" key={i}>
        <Icon className="block my-auto " />
        <span className="font-bold text-base ml-1.5">{name}</span>
      </LinkOrDiv>
    )
  });

  return (
    <div>
      <Image
        ref={alwaysGlitch.ref}
        loading="eager"
        src={props.img}
        alt={props.alt}
        className="rounded-lg animate-slowfadein"
      />

      <div className="flex flex-wrap gap-2 mt-4">{fields}</div>
    </div>
  );
}
