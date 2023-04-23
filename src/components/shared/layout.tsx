import { ReactNode } from "react";
interface Props {
  children: ReactNode;
}
export default function Layout({ children }: Props) {
  return (
    <>
      <main className="text-neutral-900 dark:text-white bg-blue max-w-xs m-l:max-w-sm sm:max-w-xl  mx-auto my-4 sm:mt-16">
        {children}
      </main>
    </>
  );
}
