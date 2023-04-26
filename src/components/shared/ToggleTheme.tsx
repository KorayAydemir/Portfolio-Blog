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
    <label className="relative inline-block h-6 w-14" htmlFor="checkbox">
      <input
        type="checkbox"
        id="checkbox"
        onChange={changeEvent}
        defaultChecked={defaultChecked}
        className="peer hidden checked:translate-x-6"
      />
      <div
        className="peer-checked:bg-zinc-700 peer-checked:before:translate-x-6 bg-[#ccc] absolute cursor-pointer inset-0 transition rounded-3xl
        before:bottom-0 before:content-[''] before:h-6 before:left-1 before:absolute before:transition before:w-6 before:bg-white dark:before:bg-zinc-900 before:rounded-[50%]"
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
