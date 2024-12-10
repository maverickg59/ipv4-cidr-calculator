import { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

type ButtonProps = {
  invert?: boolean;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<"button">;

export function Button({ className, invert, children, ...props }: ButtonProps) {
  className = clsx(
    className,
    "inline-flex rounded-full px-4 py-1.5 text-sm font-semibold transition",
    invert
      ? "bg-white text-ocean-base hover:bg-ocean-300 hover:ring-2 hover:text-white ring-white"
      : "bg-ocean-400 text-sun-base hover:bg-white hover:text-ocean-500 hover:ring-2 ring-ocean-500"
  );

  const inner = <span className="relative top-px">{children}</span>;

  return (
    <button className={className} {...props}>
      {inner}
    </button>
  );
}
