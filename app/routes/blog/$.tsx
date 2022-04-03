import clsx from "clsx";
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
import { TableContents } from "~/components/table-contents";
import { getMDXComponent } from "~/utils/mdx.client";
import { useInView } from "react-intersection-observer";
import { AnimatePresence } from "framer-motion";

const Pre = (props: any) => {
  const textInput = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    if (textInput.current && textInput.current?.textContent !== null) {
      setCopied(true);
      await navigator.clipboard
        .writeText(textInput.current.textContent)
        .then(() => {
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        });
    }
  };

  if (props["data-showcopybutton"] === "false") {
    return <pre {...props} />;
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
      className="relative mx-0 my-8"
    >
      <button
        aria-label="Copy code"
        type="button"
        className={clsx(
          "absolute right-3 top-3 h-[35px] w-[35px] bg-[#d3d3d3] dark:bg-[#20242d] p-1 rounded-md transition-opacity duration-100 ease-in backdrop-blur-md",
          copied
            ? "ring-emerald-500 dark:ring-emerald-600"
            : "ring-gray-500 dark:ring-[#989a9b]",
          hovered ? "opacity-100" : "opacity-0"
        )}
        onClick={onCopy}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          height={26}
          width={26}
          strokeWidth={1.7}
          className={clsx(
            copied
              ? "text-emerald-500 dark:text-emerald-600"
              : "text-gray-500 dark:text-[#989a9b]"
          )}
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
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </>
          )}
        </svg>
      </button>
      <pre {...props} />
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
      className="aspect-w-16 aspect-h-9 my-8"
      img={
        <img
          className="lg:rounded-lg"
          {...imageProps}
          style={{ zIndex: 100 }}
        />
      }
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
  const [ids, setIds] = useState<Array<{ id: string; title: string }>>([]);
  const { ref, inView: imageInView } = useInView({ rootMargin: "100px 0px" });
  let Component = null;

  useEffect(() => {
    /**
     * Working around some race condition quirks :) (don't judge)
     * TODO @MaximeHeckel: see if there's a better way through a remark plugin to do this
     */
    setTimeout(() => {
      const titles = document.querySelectorAll("h2");
      const idArrays = Array.prototype.slice
        .call(titles)
        .map((title) => ({ id: title.id, title: title.innerText })) as Array<{
        id: string;
        title: string;
      }>;
      setIds(idArrays);
    }, 500);
  }, []);

  if (typeof window !== "undefined" && code) {
    Component = useMemo(() => getMDXComponent(code), [code]);
  }

  return (
    <div className="max-w-5xl mx-auto lg:px-4">
      <header className="mx-auto">
        <div className="px-4 mx-auto xl:mx-0 lg:px-0 xl:px-4 lg:max-w-[70ch]">
          <div className="mb-14">
            <Link
              to="/blog"
              className="group w-fit flex items-center text-lg dark:text-zinc-400 dark:hover:text-gray-500"
            >
              <div className="h-6 w-6 text-2xl group-hover:-translate-x-1 flex items-center mr-2 transition ease-out hover:ease-in">
                ←
              </div>
              Articles
            </Link>
          </div>
          <div className="grid gap-4">
            <h1 className="text-4xl lg:text-5xl dark:text-white">
              {frontmatter.title}
            </h1>

            <p className="dark:text-zinc-400">
              {frontmatter.date &&
                new Date(frontmatter.date).toLocaleDateString("en-GB", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}{" "}
              - {readTime?.text}
            </p>
          </div>
        </div>
        <div ref={ref} className="">
          <HeroImage frontmatter={frontmatter} />
        </div>
      </header>
      {Component ? (
        <main className="max-w-none mx-auto lg:max-w-[65ch] xl:mx-0 prose prose-light lg:prose-lg dark:prose-dark">
          <Component components={{ pre: Pre }} />
        </main>
      ) : (
        <main
          className="max-w-none mx-auto lg:max-w-[65ch] xl:mx-0 prose prose-light lg:prose-lg dark:prose-dark pb-14"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
      <AnimatePresence>
        {!imageInView ? <TableContents ids={ids} /> : null}
      </AnimatePresence>
    </div>
  );
}

function generateWeakHash(commitSha: string, hash: string) {
  return `W/${commitSha.substring(0, 20)}-${hash.substring(0, 20)}`;
}
