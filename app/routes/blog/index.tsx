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
      <h1 className="text-3xl font-bold text-center md:text-left">
        Blog Posts
      </h1>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6 mt-6">
        {posts.map(({ slug, frontmatter }: any) => (
          <Link
            key={slug}
            to={`/${slug}`}
            className="group py-4 hover:cursor-pointer transition duration-50 hover:ease-in col-span-4"
          >
            <div className="grid gap-2 justify-center">
              <div className="aspect-w-3 aspect-h-4">
                {frontmatter.image.cropped && (
                  <img
                    src={frontmatter.image.cropped}
                    className="rounded-lg group-hover:scale-[1.01] transition ease-out group-hover:ease-in"
                  />
                )}
              </div>
              <p className="font-medium text-slate-700">
                {frontmatter.date &&
                  new Date(frontmatter.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <div className="text-2xl font-medium">{frontmatter.title}</div>
              <p>{frontmatter.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// 1366 x 768
// 560 x 747
