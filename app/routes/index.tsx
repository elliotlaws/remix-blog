import { Link, LoaderFunction, useLoaderData, json } from "remix";
import type { MdxListItem } from "types";
import { ArticleCard } from "~/components/article-card";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";

export const loader: LoaderFunction = async ({ context }) => {
  const slugs = await (context.env.CONTENT as KVNamespace).list({
    prefix: "blog/",
  });

  const posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await context.env.CONTENT.get(name, "json");
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
    <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-8 mt-6 px-6 py-4 lg:px-4">
      <div className="col-span-4 md:col-span-8 lg:col-span-12">
        <FeaturedArticle article={featuredArticle} />
      </div>
      {otherPosts.map((article) => (
        <ArticleCard article={article} key={article.slug} />
      ))}
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
      className="lg:bg-inherit rounded-lg group  hover:cursor-pointer transition duration-50 hover:ease-in col-span-4 grid grid-cols-4 md:grid-cols-span-12 lg:grid-cols-12 gap-6"
    >
      <div className="col-span-4 md:col-span-6 lg:col-span-8">
        {frontmatter?.image?.url && (
          <BlurrableImage
            className="aspect-w-16 aspect-h-9"
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
                  aspectRatio: "16:9",
                })}
                className="rounded-lg"
              />
            }
          />
        )}
      </div>
      <div className="col-span-4 grid content-around">
        <div>
          <h2 className="text-3xl mb-2">{frontmatter.title}</h2>
          <p className="dark:text-zinc-400 mb-2">{frontmatter.description}</p>
          <p className="text-slate-700 dark:text-zinc-400 mt-4">
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
          <div className="flex gap-2 items-center mt-10">
            <p className="text-xl dark:text-white  dark:group-hover:text-zinc-300">
              Read the full post
            </p>
            <div className="h-10 w-10 text-2xl group-hover:translate-x-1 transition ease-out hover:ease-in flex items-center">
              →
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
