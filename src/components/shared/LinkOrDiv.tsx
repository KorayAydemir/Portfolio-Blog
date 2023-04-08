import Link from "next/link";
import { ReactNode } from "react";

export const LinkOrDiv = (props: { href: string, children: ReactNode, className?: string }) => (props.href ?
  <Link href={props.href} className={props.className}>
    {props.children}
  </Link>
  : <div className={props.className}>{props.children}</div>
);
