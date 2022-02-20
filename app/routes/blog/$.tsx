import {
  HeadersFunction,
  json,
  LinksFunction,
  LoaderFunction,
  useLoaderData,
} from "remix";
import { getMDXComponent } from "~/utils/mdx.client";
import { useEffect } from "react";
import styles from "highlight.js/styles/github-dark-dimmed.css";
import React from "react";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

type BlogContentType = {
  frontmatter: { [key: string]: any };
  html: string;
  code?: string;
  hash?: string;
};

export const headers: HeadersFunction = ({ loaderHeaders }) => loaderHeaders;

export const loader: LoaderFunction = async ({ params, context }) => {
  const slug = params["*"];

  if (slug === undefined) {
    throw new Response("Not Found", { status: 404 });
  }
  const data = (await context.BLOG.get(slug, "json")) as BlogContentType;

  if (data === undefined) {
    throw new Response("Not Found", { status: 404 });
  }

  return json(data, {
    headers: {
      // use weak etag because Cloudflare only supports
      // strong etag on Enterprise plans :(
      // ETag: weakHash,
      // add cache control and status for cloudflare?
      "Cache-Control": "maxage=1, s-maxage=60, stale-while-revalidate",
      //'CF-Cache-Status': 'MISS',
      "x-remix": "test",
    },
  });
};

export default function Post() {
  const { html, frontmatter, code } = useLoaderData();
  let Component = null;

  if (typeof window !== "undefined" && code) {
    Component = getMDXComponent(code);
  }

  return (
    <div className="flex justify-center dark:bg-gray-900">
      {Component ? (
        <article className="prose prose-slate lg:prose-lg dark:prose-invert py-10 max-w-screen-lg">
          <h1>{frontmatter.title}</h1>
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
