import Image from "next/image";
import { useState } from "react";
import Typewriter from "typewriter-effect";
import { MySetup, Portfolio, Rust, DownScaled } from '@public/images/index';
import { useGlitch } from "react-powerglitch";



export default function MyProjects() {
  const [imageIsLoaded, setImageIsLoaded] = useState(false)
  const glitch = useGlitch({ playMode: 'hover' });
  return (
    <div>
      <Typewriter
        onInit={(typewriter) => {
          typewriter
            .changeDelay(30)
            .typeString("My Projects:")
            .callFunction((state) => {
              state.elements.cursor.remove();
            })
            .start();
        }}
      />

      {!imageIsLoaded && <Image src={DownScaled} loading="eager" alt="mysetup" />}
      <Image quality={100} onLoad={event => {
        console.log(event.target)
        setImageIsLoaded(true)
      }} placeholder="blur" ref={glitch.ref} loading="eager" src={MySetup} alt="dots" />

      <Image quality={50} ref={glitch.ref} loading="eager" src={Portfolio} alt="portfolio" />
      <Image ref={glitch.ref} loading="eager" src={Rust} alt="rust" />
    </div>
  );
}
