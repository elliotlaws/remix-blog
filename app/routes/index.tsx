import { Link, LoaderFunction, useLoaderData, json } from "remix";
import { MdxListItem } from "types";
import { ArticleCard } from "~/components/article-card";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";

export const loader: LoaderFunction = async ({ context }) => {
  const slugs = await (context.BLOG as KVNamespace).list({ prefix: "blog/" });
  const posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await context.BLOG.get(name, "json");
      const { slug, frontmatter, html, readTime } = data as any;
      return { slug, frontmatter, html, readTime };
    })
  );

  return json(posts, {
    headers: {
      "cache-control": "max-age=3600000",
    },
  });
};

export default function Index() {
  const posts: MdxListItem[] = useLoaderData();

  const orderedPosts = posts.sort(
    (a, b) =>
      Date.parse(b.frontmatter.date || "") -
      Date.parse(a.frontmatter.date || "")
  );

  const featuredArticle = orderedPosts[0];
  const otherPosts = orderedPosts.filter(
    (p) => p.slug !== featuredArticle.slug
  );

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 mt-6">
        <div className="col-span-12">
          <FeaturedArticle article={featuredArticle} />
        </div>
        {otherPosts.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
}

function FeaturedArticle({
  article: { slug, frontmatter, readTime },
}: {
  article: MdxListItem;
}) {
  return (
    <Link
      key={slug}
      to={`/${slug}`}
      className="group py-4 hover:cursor-pointer transition duration-50 hover:ease-in col-span-4"
    >
      <div className="grid grid-cols-12 gap-6">
        {frontmatter?.image?.url && (
          <BlurrableImage
            className="aspect-w-4 aspect-h-3 col-span-8"
            blurDataUrl={frontmatter.image.blurDataUrl}
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
                  aspectRatio: "4:3",
                })}
                className="rounded-md"
              />
            }
          />
        )}
        <div className="col-span-4 grid content-between">
          <div>
            <h3 className="font-medium text-lg mb-8">Featured Post</h3>

            <div className="text-3xl font-medium mb-2">{frontmatter.title}</div>
            <p className="text-lg dark:text-zinc-400 mb-2">
              {frontmatter.description}
            </p>
            <p className="font-medium text-slate-700 dark:text-zinc-400 mt-1.5">
              {frontmatter.date &&
                new Date(frontmatter.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              - {readTime?.text}
            </p>
          </div>

          <div>
            <div className="flex gap-2 items-center py-2">
              <p className="text-lg">Read the full post</p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 group-hover:translate-x-1 block mr-2 transition ease-out hover:ease-in"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
