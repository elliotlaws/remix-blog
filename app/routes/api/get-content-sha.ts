import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
  const data = (await context.env.CONTENT.get("$$content-sha", "json")) || {
    commit: { sha: "" },
  };
  return json(data);
};
