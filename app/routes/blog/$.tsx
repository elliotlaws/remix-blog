import { useEffect, useMemo, useRef, useState } from "react";
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

const CopyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
      />
    </svg>
  );
};

const CheckIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
};

async function copyTextToClipboard(text: string) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand("copy", true, text);
  }
}

const Pre = (props: any) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (textInput.current && textInput.current?.textContent !== null) {
      copyTextToClipboard(textInput.current.textContent).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };

  return (
    <div
      ref={textInput}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setCopied(false);
      }}
      className="relative m-0"
    >
      {hovered && (
        <button
          aria-label="Copy code"
          type="button"
          className={`absolute right-2 top-2 h-8 w-8 border-[1.5px] p-1 rounded-md ${
            copied
              ? "border-emerald-500"
              : "border-gray-800 dark:border-gray-300"
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            strokeWidth={1.5}
            className={
              copied ? "text-emerald-500" : "text-gray-800 dark:text-gray-300"
            }
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                />
              </>
            )}
          </svg>
        </button>
      )}
      <pre>{props.children}</pre>
    </div>
  );
};

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
      className="aspect-w-16 aspect-h-9 lg:m-2"
      img={<img className="lg:rounded-lg" {...imageProps} />}
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

  const data = (await context.env.CONTENT.get(
    `blog/${slug}`,
    "json"
  )) as BlogContentType;
  if (!data) {
    throw new Response("Not Found", { status: 404 });
  }

  const { commit }: any = (await context.env.CONTENT.get(
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
    Component = useMemo(() => getMDXComponent(code), [code]);
  }

  // console.log("html", html);
  // console.log("code", code);

  return (
    <div className="py-6 max-w-screen-lg">
      <div className="mb-6 px-4">
        <Link
          to="/blog"
          className="group w-fit flex items-center font-medium text-lg dark:text-zinc-400 dark:hover:text-gray-500"
        >
          <div className="h-6 w-6 text-2xl group-hover:-translate-x-1 flex items-center mr-2 transition ease-out hover:ease-in">
            ←
          </div>
          Back to posts
        </Link>
      </div>
      <HeroImage frontmatter={frontmatter} />
      <div className="py-8 max-w-screen-lg lg:px-[4rem]">
        <div className="pb-8 grid gap-2 mx-[1rem] lg:mx-[2rem]">
          <h1 className="text-4xl font-bold dark:text-white">
            {frontmatter.title}
          </h1>

          <p className="dark:text-zinc-400 text-lg">
            {frontmatter.date &&
              new Date(frontmatter.date).toLocaleDateString("en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}{" "}
            - {readTime?.text}
          </p>
          {/* {frontmatter.tags && (
              <div className="flex items-center gap-2">
                {frontmatter.tags.map((tag: string) => (
                  <Link key={tag} to={`/blog/tags/${tag}`}>
                    <Tag>{tag}</Tag>
                  </Link>
                ))}
              </div>
            )} */}
        </div>
        {Component ? (
          <main className="max-w-none prose prose-zinc lg:prose-lg dark:prose-invert">
            <Component components={{ pre: Pre }} />
          </main>
        ) : (
          <main
            className="max-w-none prose prose-zinc lg:prose-lg dark:prose-invert pb-14"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
        <div className="text-4xl text-center">
          <p className="font-bold">〰</p>
        </div>
      </div>
    </div>
  );
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`;
}
