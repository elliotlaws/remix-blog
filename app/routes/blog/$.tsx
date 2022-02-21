import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { getMDXComponent } from "~/utils/mdx.client";

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
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const slug = params["*"];

  if (slug === undefined) {
    throw new Response("Not Found", { status: 404 });
  }

  const data = (await context.BLOG.get(
    `blog/${slug}`,
    "json"
  )) as BlogContentType;
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }
  const { commit }: any = (await context.BLOG.get("$$deploy-sha", "json")) ?? {
    commit: {},
  };
  const commitSha = commit.sha ?? "0";
  const { frontmatter, html, code, hash } = data;

  // weak hash should include commit sha since changes in code
  // could result in changes to the content page
  const weakHash = generateWeakHash(commitSha, hash);
  const etag = request.headers.get("If-None-Match");
  if (etag === weakHash) {
    return new Response(null, { status: 304 });
  }

  return json(
    { slug, frontmatter, html, code },
    {
      headers: {
        // use weak etag because Cloudflare only supports
        // strong etag on Enterprise plans :(
        ETag: weakHash,
        // // add cache control and status for cloudflare?
        // "Cache-Control": "maxage=1, s-maxage=60, stale-while-revalidate",
        // //'CF-Cache-Status': 'MISS',
        // "x-remix": "test",
      },
    }
  );
};

export default function Post() {
  const { html, frontmatter, code } = useLoaderData();
  let Component = null;

  if (typeof window !== "undefined" && code) {
    Component = getMDXComponent(code);
  }

  return (
    <div className="flex justify-center dark:bg-gray-900">
      <h1>{frontmatter.title}</h1>
      {Component ? (
        <article className="prose prose-slate lg:prose-lg dark:prose-invert py-10 max-w-screen-lg">
          <Component />
        </article>
      ) : (
        <article
          className="prose prose-slate lg:prose-lg dark:prose-invert py-10 max-w-screen-lg"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`;
}
