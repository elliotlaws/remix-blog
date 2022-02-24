import { Link, LoaderFunction, useLoaderData, json } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
  const slugs = await (context.BLOG as KVNamespace).list({ prefix: "blog/" });
  const posts = await Promise.all(
    slugs.keys.map(async ({ name }) => {
      const data = await context.BLOG.get(name, "json");
      const { slug, frontmatter, html } = data as any;
      return { slug, frontmatter, html };
    })
  );

  return json(posts, {
    headers: {
      "cache-control": "max-age=300",
    },
  });
};

export default function Index() {
  const posts: MdxListItem[] = useLoaderData();

  return (
    <div className="mt-6">
      <h1 className="text-3xl font-bold">Blog Posts</h1>
      <div className="inline-grid grid-cols-3 gap-6 mt-6">
        {posts.map(({ slug, frontmatter }) => (
          <Link
            key={slug}
            to={`/${slug}`}
            className="p-6 hover:cursor-pointer ring-2 hover:ring-4 rounded-md"
          >
            <div className="grid gap-2 justify-center">
              <div className="text-2xl font-medium">{frontmatter.title}</div>
              <p className="font-medium text-slate-700">
                {frontmatter.date &&
                  new Date(frontmatter.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <p>{frontmatter.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
