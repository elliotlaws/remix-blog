import * as path from "path";
import * as fs from "fs";
import * as fsp from "fs/promises";
import * as crypto from "crypto";
import { bundleMDX } from "mdx-bundler";
import rehypeHighlight from "rehype-highlight";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import { renderToString } from "react-dom/server.js";
import * as React from "react";
import fetch from "node-fetch";

(async function () {
  const dir = "../../content/blog";
  const mdxPaths = await fsp.readdir(dir);

  mdxPaths.forEach(async (fileName) => {
    console.error(`Compiling ${fileName}...`);

    let mdxSource = "";
    let files = {};

    const fullPath = path.join(dir, fileName);
    const exists = fs.existsSync(fullPath);

    const slug = `blog/${fileName.replace(".mdx", "")}`;

    if (exists && (await fsp.lstat(fullPath)).isDirectory()) {
      const mdxPath = path.join(fullPath, "index.mdx");
      mdxSource = await fsp.readFile(mdxPath, "utf8");
      const mdxFiles = (await fsp.readdir(fullPath)).filter(
        (filename) => filename !== "index.mdx"
      );

      const results = await Promise.all(
        mdxFiles.map(async (filename) =>
          fsp.readFile(`${fullPath}/${filename}`, "utf8")
        )
      );

      files = Object.fromEntries(
        results.map((content, i) => [`./${mdxFiles[i]}`, content])
      );
    } else {
      mdxSource = await fsp.readFile(fullPath, "utf8");
    }

    const { frontmatter, code } = await bundleMDX({
      source: mdxSource,
      files,
      xdmOptions(options) {
        options.rehypePlugins = [
          ...(options.rehypePlugins ?? []),
          rehypeHighlight,
        ];
        return options;
      },
    });

    const Component = getMDXComponent(code);
    const html = renderToString(React.createElement(Component));
    const hasComponents = Object.keys(files).length > 0;

    const hash = crypto
      .createHash("sha256")
      .update(`${JSON.stringify(frontmatter)}${""}${code}`)
      .digest("hex");

    const response = await fetch(
      `https://remix-blog-a0z.pages.dev/api/post-content`,
      {
        method: "post",
        body: JSON.stringify({
          slug,
          frontmatter,
          hash,
          html,
          code: hasComponents ? code : undefined,
        }),
      }
    );

    if (!response.ok) {
      const body = await response.text();
      console.log(body);
    }
  });
})();
