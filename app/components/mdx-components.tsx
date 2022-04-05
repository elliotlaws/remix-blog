import clsx from "clsx";
import { useRef, useState } from "react";

const Pre = (props: any) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (textInput.current && textInput.current?.textContent !== null) {
      setCopied(true);
      await navigator.clipboard
        .writeText(textInput.current.textContent)
        .then(() => {
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        });
    }
  };

  if (props["data-showcopybutton"] === "false") {
    return <pre {...props} />;
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="relative mx-0 my-8"
    >
      <button
        aria-label="Copy code"
        type="button"
        className={clsx(
          "absolute right-3 top-3 h-[35px] w-[35px] bg-[#d3d3d3] dark:bg-[#20242d] p-1 rounded-md transition-opacity duration-100 ease-in backdrop-blur-md",
          copied
            ? "ring-emerald-500 dark:ring-emerald-600"
            : "ring-gray-500 dark:ring-[#989a9b]",
          hovered ? "opacity-100" : "opacity-0"
        )}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          height={26}
          width={26}
          strokeWidth={1.7}
          className={clsx(
            copied
              ? "text-emerald-500 dark:text-emerald-600"
              : "text-gray-500 dark:text-[#989a9b]"
          )}
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </>
          )}
        </svg>
      </button>
      <pre {...props} />
    </div>
  );
};

export { Pre };
