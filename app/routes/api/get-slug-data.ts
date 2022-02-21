import { LoaderFunction, json } from "remix";

export const loader: LoaderFunction = async ({ params, request, context }) => {
  //   console.log("hello", params);
  //   const slug = params["*"];
  //   if (slug === undefined) {
  //     throw new Response("Not Found", { status: 404 });
  //   }
  const data = await context.BLOG.get("example", "json");
  return json(data);
};

// import { json, LoaderFunction } from 'remix'
// declare var CONTENT: KVNamespace

// export const loader: LoaderFunction = async () => {
//   const data = (await CONTENT.get('$$content-sha', 'json')) || {
//     commit: { sha: '' },
//   }
//   return json(data)
// }
