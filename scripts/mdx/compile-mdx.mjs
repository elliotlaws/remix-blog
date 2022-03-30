import { config } from "dotenv";
import * as fs from "fs";
import * as fsp from "fs/promises";
import * as path from "path";
import * as crypto from "crypto";
import fetch from "node-fetch";
import * as React from "react";
import { renderToString } from "react-dom/server.js";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client/index.js";
import rehypePrism from "rehype-prism-plus";
import { Command } from "commander/esm.mjs";
import calculateReadTime from "reading-time";
import { visit } from "unist-util-visit";

function rehypeCodeTitles() {
  return (tree) => visit(tree, "element", visitor);

  function visitor(node, index, parent) {
    if (!parent || node.tagName !== "pre") {
      return;
    }

    const pre = node;
    const code = Array.isArray(pre.children) ? pre.children[0] : pre.children;

    if (!code.data || !code.data.meta) {
      return;
    }

    const meta = code.data.meta;
    const properties = meta.split(" ");

    properties.forEach((property) => {
      const [key, value] = property.split("=");
      pre.properties[key] = value;
    });
  }
}

(async function () {
  config();
  const program = new Command();
  program
    .option("-R, --root <path>", "Root path (content is relative to root")
    .option("-f, --file [files...]", "Files to compile")
    .option("-j, --json", "Output JSON");

  program.parse(process.argv);
  const options = program.opts();

  if (!process.env.API_URL) {
    console.error("missing API_URL");
    process.exit(1);
  }

  const rootPath = options.root ?? process.cwd();
  const mdxPaths = options.file;
  const results = {};
  let hasError = false;
  const processed = {};

  // process files until empty
  while (mdxPaths.length) {
    let mdxPath = mdxPaths[0];
    try {
      if (processed[mdxPath]) continue;

      // remove index.mdx from path
      if (mdxPath.endsWith("/index.mdx")) {
        mdxPath = mdxPath.replace("/index.mdx", "");
      }

      console.error(`Compiling ${mdxPath}...`);
      let fullPath = path.join(rootPath, mdxPath);

      const parts = mdxPath.split("/");
      const slug = parts.slice(1).join("/").replace(".mdx", "");

      let mdxSource = "";
      let files = {};
      const exists = fs.existsSync(fullPath);

      if (exists && (await fsp.lstat(fullPath)).isDirectory()) {
        mdxSource = await fsp.readFile(`${fullPath}/index.mdx`, "utf8");
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
        if (!fullPath.endsWith(".mdx")) fullPath += ".mdx";
        if (!fs.existsSync(fullPath)) continue;
        mdxSource = await fsp.readFile(fullPath, "utf8");
      }
      const cwd = Object.keys(files).length
        ? path.join(rootPath, mdxPath)
        : undefined;
      const { frontmatter, code } = await bundleMDX({
        source: mdxSource,
        files,
        // set cwd if mdx has file imports
        cwd,
        xdmOptions(options) {
          options.rehypePlugins = [
            ...(options.rehypePlugins ?? []),
            // rehypeCodeTitles must go before rehypePrism
            rehypeCodeTitles,
            [rehypePrism, { showLineNumbers: true }],
          ];
          return options;
        },
      });
      const Component = getMDXComponent(code);

      const html = renderToString(React.createElement(Component));
      // const hasComponents = Object.keys(files).length > 0;

      const hash = crypto
        .createHash("sha256")
        .update(`${JSON.stringify(frontmatter)}${""}${code}`)
        .digest("hex");

      const readTime = calculateReadTime(mdxSource);

      const response = await fetch(`${process.env.API_URL}/api/post-content`, {
        method: "post",
        body: JSON.stringify({
          slug,
          frontmatter,
          readTime,
          hash,
          html,
          code,
        }),
        headers: {
          authorization: `Bearer ${process.env.POST_API_KEY}`,
        },
      });

      if (!response.ok) {
        const body = await response.text();
        results[mdxPath] = {
          status: response.status,
          statusText: response.statusText,
          body,
        };
        hasError = true;
      }

      results[mdxPath] = {
        status: response.status,
        statusText: response.statusText,
        slug,
        hash,
      };
    } finally {
      // remove file from list
      processed[mdxPath] = true;
      mdxPaths.splice(0, 1);
    }
  }
  if (options.json) {
    console.log(JSON.stringify(results, null, 2));
  }
  process.exit(hasError ? 1 : 0);
})();
