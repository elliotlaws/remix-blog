import { Link } from "@remix-run/react";
import type { MdxListItem } from "types";
import { BlurrableImage } from "./blurrable-image";
import { getImageProps } from "./image";

export function ArticleCard({ article }: { article: MdxListItem }) {
  const { slug, frontmatter, readTime } = article;
  return (
    <Link
      key={slug}
      to={`/${slug}`}
      className="group hover:cursor-pointer col-span-4"
    >
      <div className="grid gap-2 ">
        {frontmatter?.image?.url && (
          <BlurrableImage
            className="aspect-w-16 aspect-h-9"
            blurDataUrl={frontmatter?.image?.blurDataUrl}
            img={
              <img
                {...getImageProps({
                  url: frontmatter?.image.url,
                  alt: frontmatter?.image.credit,
                  widths: [280, 560, 840, 1100],
                  sizes: [
                    "(max-width:639px) 80vw",
                    "(min-width:640px) and (max-width:1023px) 40vw",
                    "(min-width:1024px) and (max-width:1620px) 25vw",
                    "420px",
                  ],
                  aspectRatio: "16:9",
                })}
                className="rounded-lg group-hover:scale-[1.01] group-hover:transition ease-out group-hover:ease-in"
              />
            }
          />
        )}
        <p className="font-medium text-zinc-700 dark:text-zinc-400 mt-1.5">
          {frontmatter.date &&
            new Date(frontmatter.date).toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
          - {readTime?.text}
        </p>
        <div className="text-2xl font-medium">{frontmatter.title}</div>
        <p className="text-lg text-zinc-500 dark:text-zinc-400">
          {frontmatter.description}
        </p>
      </div>
    </Link>
  );
}
