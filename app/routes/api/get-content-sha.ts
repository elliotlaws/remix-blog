import { json, LoaderFunction } from "remix";
declare var CONTENT: KVNamespace;

export const loader: LoaderFunction = async ({ context }) => {
  const data = (await context.env.BLOG.get("$$content-sha", "json")) || {
    commit: { sha: "" },
  };
  return json(data);
};
