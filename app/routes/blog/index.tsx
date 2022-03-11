import { LoaderFunction, useLoaderData, json } from "remix";
import { MdxListItem } from "types";
import { ArticleCard } from "~/components/article-card";

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
      Date.parse(b?.frontmatter?.date || "") -
      Date.parse(a.frontmatter.date || "")
  );

  return (
    <div className="mt-4 dark:text-zinc-200">
      <div className="flex justify-between items-baseline">
        <h1 className="text-3xl font-semibold text-center md:text-left dark:text-zinc-200">
          Blog Posts
        </h1>
        <p className="text-lg">{posts.length} Articles</p>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 mt-6">
        {orderedPosts.map((article) => (
          <ArticleCard article={article} />
        ))}
      </div>
    </div>
  );
}
