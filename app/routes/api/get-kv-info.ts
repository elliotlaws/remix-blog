import { json, LoaderFunction } from "remix";

export const loader: LoaderFunction = async ({ context }) => {
  const data = await context.BLOG.list();
  return json(data);
};
