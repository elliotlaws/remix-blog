import { Link } from "@remix-run/react";
import { motion, MotionConfig } from "framer-motion";
import { useState } from "react";
import type { MdxListItem } from "types";
import { BlurrableImage } from "./blurrable-image";
import { getImageProps } from "./image";

export function ArticleCard({ article }: { article: MdxListItem }) {
  const { slug, frontmatter, readTime } = article;
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      onMouseEnter={() => setHovered(true)}
      key={slug}
      to={`/${slug}`}
      className="group hover:cursor-pointer col-span-4  rounded-lg  transition-all duration-100 ease-out "
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
                className="rounded-lg"
              />
            }
          />
        )}
        <div className="pt-4 grid rounded-b-lg">
          <div className="mb-6">
            <h2 className="text-2xl mb-2">{frontmatter.title}</h2>
            <p className="text-zinc-600 dark:text-zinc-400 ">
              {frontmatter.description}
            </p>
          </div>
          {/* <div className="text-2xl transition-all duration-150 ease-in opacity-0 group-hover:opacity-100">
            →
          </div> */}
          <p className="text-zinc-600 dark:text-zinc-400 mb-2">
            {frontmatter.date &&
              new Date(frontmatter.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            - {readTime?.text}
          </p>
        </div>
        <div className="my-4 opacity-60 border-cyan-900 dark:border-cyan-700 border-b-[3px] w-0 group-hover:w-full group-hover:opacity-100 transition-all duration-300 ease-out"></div>
      </div>
    </Link>
  );
}
