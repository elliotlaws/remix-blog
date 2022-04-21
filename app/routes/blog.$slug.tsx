import { useMemo } from "react";
import { json, MetaFunction, LoaderFunction, useLoaderData, Link } from "remix";
import { BlurrableImage } from "~/components/blurrable-image";
import { getImageProps } from "~/components/image";
import { TableContents } from "~/components/table-contents";
import { getMDXComponent } from "~/utils/mdx.client";
import { useInView } from "react-intersection-observer";
import { AnimatePresence } from "framer-motion";
import { Pre } from "~/components/mdx-components";
import { H1, Paragraph } from "~/components/typography";
import { Arrow } from "~/components/arrow";
import { useProgress } from "~/hooks/useProgress";

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

function HeroImage({ frontmatter }: Frontmatter) {
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
          className="md:rounded-lg"
          {...imageProps}
          style={{ zIndex: 100 }}
        />
      }
    />
  );
}

export const loader: LoaderFunction = async ({ request, params, context }) => {
  const slug = params.slug;
  if (slug === undefined) throw new Response("Not Found", { status: 404 });

  const data = (await context.env.CONTENT.get(
    `blog/${slug}`,
    "json"
  )) as BlogContentType;
  if (!data) throw new Response("Not Found", { status: 404 });

  return json(
    { ...data, slug },
    { headers: { "cache-control": "max-age=3600000" } }
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
  const { showTableOfContents = true } = frontmatter;
  const { ref, inView: imageInView } = useInView();
  const readingProgress = useProgress();
  let Component = null;

  const shouldShowTableOfContents = !imageInView && showTableOfContents;

  if (typeof window !== "undefined" && code) {
    Component = useMemo(() => getMDXComponent(code), [code]);
  }

  return (
    <div className="max-w-7xl mx-auto md:mx-[5vw] lg:mx-auto">
      <header className="">
        <div className="grid grid-cols-[1fr_2rem_repeat(6,_1fr)_2rem_4rem_1em_1fr]">
          <div className="lg:col-start-3 col-span-12 lg:col-span-6 px-4">
            <div className="mb-8">
              <Link
                to="/blog"
                className="group w-fit flex items-center text-lg text-primary"
              >
                <Arrow dir="left" />
                Articles
              </Link>
            </div>
            <div className="grid gap-4">
              <H1>{frontmatter.title}</H1>
              <Paragraph>
                {frontmatter.date &&
                  new Date(frontmatter.date).toLocaleDateString("en-GB", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                - {readTime?.text}
              </Paragraph>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-[1fr_1rem_repeat(8,_1fr)_1rem_1fr]">
          <div ref={ref} className="col-span-12 lg:col-start-3 lg:col-span-8">
            <HeroImage frontmatter={frontmatter} />
          </div>
        </div>
      </header>
      <div className="grid grid-cols-[1fr_1rem_1rem_repeat(5,_1fr)_4rem_1rem_1fr_1fr]">
        {Component ? (
          <Main>
            <Component components={{ pre: Pre }} />
          </Main>
        ) : (
          <Main dangerouslySetInnerHTML={{ __html: html }} />
        )}
        <AnimatePresence>
          {shouldShowTableOfContents ? (
            <div className="hidden xl:block col-start-11 col-span-2 sticky top-0 self-start pt-8">
              <TableContents readingProgress={readingProgress} />
            </div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
}

type MainProps =
  | { children: React.ReactNode }
  | { dangerouslySetInnerHTML: { __html: string } };

const Main = (props: MainProps) => {
  return (
    <main
      className="col-span-12 lg:col-start-4 lg:col-span-5 prose prose-light lg:prose-lg dark:prose-dark pb-14 max-w-[100vw]"
      {...props}
    />
  );
};
