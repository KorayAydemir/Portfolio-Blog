import { ReactNode } from "react";
import ToggleTheme from "./ToggleTheme";
interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <div className="flex justify-end mt-4 mr-4">
        <ToggleTheme />
      </div>
      <main className="text-neutral-900 dark:text-white bg-blue max-w-xs m-l:max-w-sm sm:max-w-xl  mx-auto my-4 sm:mt-16">
        {children}
      </main>
    </>
  );
}