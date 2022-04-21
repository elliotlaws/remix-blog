import { LoaderFunction, useLoaderData, json } from "remix";
import { MdxListItem } from "types";
import { ArticleCard } from "~/components/article-card";
import { H2 } from "~/components/typography";

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
      Date.parse(b?.frontmatter?.date || "") -
      Date.parse(a.frontmatter.date || "")
  );

  return (
    <div className="grid grid-cols-[1fr_minmax(auto,_1024px)__1fr]">
      <div className="col-start-2 mt-4 dark:text-zinc-200 px-4 py-2 md:px-6 lg:px-4">
        <div className="flex justify-between items-baseline">
          <H2 className="pb-2 text-center md:text-left">
            Articles&nbsp;<span className="text-xl"> / {posts.length}</span>
          </H2>
        </div>
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 mt-6">
          {orderedPosts.map((article) => (
            <ArticleCard article={article} key={article.slug} />
          ))}
        </div>
      </div>
    </div>
  );
}
