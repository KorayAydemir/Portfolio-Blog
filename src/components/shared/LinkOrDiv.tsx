import { ReactNode } from "react";
import { FaArrowRight } from "react-icons/fa";

// TODO: Look for bettering this component.
// https://stackoverflow.com/questions/33710833/how-do-i-conditionally-wrap-a-react-component
export const LinkOrDiv = (props: {
    href: string;
    children: ReactNode;
    className?: string;
}) =>
    typeof props.href === "string" ? (
        <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.href}
            className={props.className}
        >
            {props.children}
            <FaArrowRight className="ml-auto mr-0 block my-auto text-xl" />
        </a>
    ) : (
        <div className={props.className}>{props.children}</div>
    );
