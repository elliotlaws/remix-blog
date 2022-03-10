import { Link, LoaderFunction, useLoaderData, json } from "remix";
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
    (a, b) => Date.parse(b.frontmatter.date) - Date.parse(a.frontmatter.date)
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
        {orderedPosts.map(({ slug, frontmatter, readTime }: any) => (
          <Link
            key={slug}
            to={`/${slug}`}
            className="group py-4 hover:cursor-pointer transition duration-50 hover:ease-in col-span-4"
          >
            <div className="grid gap-2 justify-center">
              {frontmatter.image.url && (
                <BlurrableImage
                  className="aspect-w-4 aspect-h-3"
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
                      className="rounded-lg group-hover:scale-[1.01] transition ease-out group-hover:ease-in"
                    />
                  }
                />
              )}
              <p className="font-medium text-slate-700 dark:text-zinc-400 mt-1.5">
                {frontmatter.date &&
                  new Date(frontmatter.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                - {readTime?.text}
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
