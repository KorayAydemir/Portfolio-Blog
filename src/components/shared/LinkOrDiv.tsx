import { ReactNode } from "react";

//https://stackoverflow.com/questions/33710833/how-do-i-conditionally-wrap-a-react-component
export const LinkOrDiv = (props: { href: string, children: ReactNode, className?: string }) => (
  typeof props.href === "string" ?
    <a target="_blank" rel="noopener noreferrer" href={props.href} className={props.className}>
      {props.children}
    </a>
    : <div className={props.className}>{props.children}</div>
);
