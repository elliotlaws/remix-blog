import { externalLinks } from "~/external-links";
import { GithubIcon, LinkedInIcon } from "./icons";

export function Footer() {
  return (
    <footer className="text-primary py-8 mt-16 border-t-2 border-slate-600 dark:border-white">
      <div className="max-w-5xl mx-auto px-4 lg:px-2 flex items-center justify-between">
        <p className="flex items-center gap-2">
          <span className="text-xl">&copy;</span> 2022 Elliot Laws - Leeds
        </p>
        <div className="flex gap-4 items-center">
          <a href={externalLinks.github}>
            <GithubIcon size={32} />
          </a>
          <a href={externalLinks.linkedIn}>
            <LinkedInIcon size={38} />
          </a>
        </div>
      </div>
    </footer>
  );
}
