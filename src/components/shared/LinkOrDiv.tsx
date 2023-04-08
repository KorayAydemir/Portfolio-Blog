import Link from "next/link";
import { ReactNode } from "react";

//https://stackoverflow.com/questions/33710833/how-do-i-conditionally-wrap-a-react-component
export const LinkOrDiv = (props: { href: string, children: ReactNode, className?: string }) => (
  typeof props.href === "string" ?
    <Link href={props.href} className={props.className}>
      {props.children}
    </Link>
    : <div className={props.className}>{props.children}</div>
);
