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
    <div>
      <h2>Articles</h2>
      <ul>
        {posts.map(({ slug, frontmatter }) => (
          <li key={slug}>
            <Link to={slug}>{frontmatter.title}</Link>
            {frontmatter.description ? (
              <p className="m-0 lg:m-0">{frontmatter.description}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
