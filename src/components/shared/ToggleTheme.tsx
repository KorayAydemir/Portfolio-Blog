import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function ToggleTheme() {
    const [mounted, setMounted] = useState(false);
    const { resolvedTheme, setTheme } = useTheme();
    const defaultChecked = resolvedTheme === "dark" ? true : false;

    // to combat hydration error
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // has to use `resolvedTheme`.
    // if using `theme`, and system theme is light, toggling makes theme light again.
    const changeEvent = () => {
        setTheme(resolvedTheme === "light" ? "dark" : "light");
    };

    const Checkbox = (
        <label
            className="relative inline-block h-6 min-h-[24px] w-14"
            htmlFor="checkbox"
        >
            <input
                type="checkbox"
                id="checkbox"
                onChange={changeEvent}
                defaultChecked={defaultChecked}
                className="peer hidden checked:translate-x-6"
            />
            <div
                className="absolute inset-0 cursor-pointer rounded-3xl bg-[#ccc] transition before:absolute before:bottom-0
        before:left-1 before:h-6 before:w-6 before:rounded-[50%] before:bg-white before:transition before:content-[''] peer-checked:bg-zinc-700 peer-checked:before:translate-x-6 dark:before:bg-zinc-900"
            ></div>
        </label>
    );

    return (
        <div className="flex flex-row items-center gap-1">
            <span>☀️</span>
            {Checkbox}
            <span>🌒</span>
        </div>
    );
}
