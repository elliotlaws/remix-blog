import clsx from "clsx";

type Direction = "left" | "right";

type ArrowProps = {
  dir?: Direction;
  className?: string;
};

const Arrow = ({ dir = "right", className }: ArrowProps) => {
  return (
    <span
      className={clsx(
        "h-10 w-10 text-2xl text-primary transition ease-out hover:ease-in flex items-center",
        dir === "left"
          ? "group-hover:-translate-x-1 "
          : "group-hover:translate-x-1",
        className
      )}
    >
      {dir === "left" ? "←" : "→"}
    </span>
  );
};

export { Arrow };
