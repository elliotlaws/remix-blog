import { Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import type { MdxListItem } from "types";
import { BlurrableImage } from "./blurrable-image";
import { getImageProps } from "./image";

export function ArticleCard({ article }: { article: MdxListItem }) {
  const { slug, frontmatter, readTime } = article;

  return (
    <Link
      key={slug}
      to={`/${slug}`}
      className="group hover:cursor-pointer col-span-4 bg-white dark:bg-[#25252ef0] rounded-lg"
    >
      <div className="grid">
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
                className="rounded-t-lg"
              />
            }
          />
        )}
        <div className="px-4 py-4 grid ">
          <h2 className="text-xl mb-2">{frontmatter.title}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 mb-6">
            {frontmatter.description}
          </p>
          <p className="text-zinc-700 dark:text-zinc-400 text-sm mb-2 ">
            {frontmatter.date &&
              new Date(frontmatter.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            - {readTime?.text}
          </p>
        </div>
      </div>
    </Link>
  );
}
