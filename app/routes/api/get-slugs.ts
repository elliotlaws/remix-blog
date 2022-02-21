import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
  console.log("getting slugs");
  const slugs = await context.BLOG.list();
  const posts = await Promise.all(
    slugs.keys.map(async ({ name }: any) => {
      const data = await context.BLOG.get(name, "json");
      const { slug, frontmatter, html } = data as any;
      return { slug, frontmatter };
    })
  );
  return json(posts);
};
