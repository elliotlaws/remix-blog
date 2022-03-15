import {
  HeadersFunction,
  json,
  MetaFunction,
  LoaderFunction,
  useLoaderData,
  LinksFunction,
  Link,
} from "remix";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";
import { getMDXComponent } from "~/utils/mdx.client";

export function Tag(props: any) {
  return (
    <span className="inline-flex items-center px-2 py-0.5 rounded font-medium bg-indigo-100 text-indigo-800 mt-2">
      <span>#</span>
      {props.children}
    </span>
  );
}

export function HeroImage({ frontmatter }: any) {
  if (!frontmatter?.image.url) return null;

  const imageProps = getImageProps({
    url: frontmatter?.image.url,
    alt: frontmatter?.image.credit,
    widths: [280, 560, 840, 1100, 1650, 2500, 2100, 3100],
    sizes: [
      "(max-width:1023px) 80vw",
      "(min-width:1024px) and (max-width:1620px) 67vw",
      "1100px",
    ],
    aspectRatio: "16:9",
  });

  return (
    <BlurrableImage
      blurDataUrl={frontmatter.image.blurDataUrl}
      className="aspect-w-16 aspect-h-9"
      img={<img className="rounded-lg" {...imageProps} />}
    />
  );
}

export const links: LinksFunction = () => [
  {
    rel: "stylesheet",
    href: "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github-dark.min.css",
  },
];

type Frontmatter = {
  [key: string]: any;
};

type BlogContentType = {
  slug: string;
  frontmatter: Frontmatter;
  html: string;
  code: string;
  hash: string;
  readTime: any;
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const slug = params["*"];

  if (slug === undefined) {
    throw new Response("Not Found", { status: 404 });
  }

  const data = (await context.env.BLOG.get(
    `blog/${slug}`,
    "json"
  )) as BlogContentType;
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  const { commit }: any = (await context.env.BLOG.get(
    "$$deploy-sha",
    "json"
  )) ?? {
    commit: {},
  };
  const commitSha = commit.sha ?? "0";

  const { frontmatter, html, code, hash, readTime } = data;

  // weak hash should include commit sha since changes in code
  // could result in changes to the content page
  const weakHash = generateWeakHash(commitSha, hash);
  const etag = request.headers.get("If-None-Match");

  if (etag === weakHash) {
    return new Response(null, { status: 304 });
  }

  return json(
    { slug, frontmatter, html, code, readTime },
    {
      headers: {
        // use weak etag because Cloudflare only supports
        // strong etag on Enterprise plans :(
        // ETag: weakHash,
        // // add cache control and status for cloudflare?
        "cache-control": "max-age=3600000",
        // //'CF-Cache-Status': 'MISS',
        // "x-remix": "test",
      },
    }
  );
};

export const meta: MetaFunction = ({ data }) => {
  let title = "Elliot Laws Blog";
  let description = "";
  if (data) {
    title = `${data.frontmatter.title} - ${title}`;
    description = data.frontmatter.description;
  }
  return {
    title,
    description,
  };
};

export default function Post() {
  const { html, frontmatter, code, readTime } = useLoaderData();
  let Component = null;

  if (typeof window !== "undefined" && code) {
    Component = getMDXComponent(code);
  }

  return (
    <div className="py-6 max-w-screen-lg">
      <div className="mb-6">
        <Link
          to="/blog"
          className="group w-fit flex items-center font-medium text-xl dark:text-zinc-400 dark:hover:text-gray-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 group-hover:-translate-x-1 block mr-2 transition ease-out hover:ease-in"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
            />
          </svg>
          Back to posts
        </Link>
      </div>
      <HeroImage frontmatter={frontmatter} />
      <div className="py-8 max-w-screen-lg">
        <div className="lg:px-16">
          <div className="pb-8 grid gap-2">
            <h1 className="text-4xl font-bold dark:text-white">
              {frontmatter.title}
            </h1>
            <p className="font-medium dark:text-zinc-400 text-lg">
              {frontmatter.date &&
                new Date(frontmatter.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              - {readTime?.text}
            </p>
            {frontmatter.tags && (
              <div className="flex items-center gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <Link key={tag} to={`/blog/tags/${tag}`}>
                    <Tag>{tag}</Tag>
                  </Link>
                ))}
              </div>
            )}
          </div>
          {Component ? (
            <main className="max-w-none prose prose-zinc lg:prose-lg dark:prose-invert">
              <Component />
            </main>
          ) : (
            <main
              className="max-w-none prose prose-zinc lg:prose-lg dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`;
}
