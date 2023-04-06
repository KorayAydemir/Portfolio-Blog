import Typewriter from "typewriter-effect";
export default function MyProjects() {
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
    </div>
  );
}
