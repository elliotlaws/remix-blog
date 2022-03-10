import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
  const slugs = await context.BLOG.list({ prefix: "blog/" });
  const posts = await Promise.all(
    slugs.keys.map(async ({ name }: any) => {
      const data = await context.BLOG.get(name, "json");
      const { slug, frontmatter, html } = data as any;
      return { slug, frontmatter };
    })
  );
  return json(posts);
};
