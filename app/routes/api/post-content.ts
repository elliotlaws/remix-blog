import { ActionFunction, json } from "remix";

declare var BLOG: KVNamespace;

export const action: ActionFunction = async ({ request }) => {
  try {
    // const key = request.headers.get("Authorization");
    // if (key !== `Bearer ${POST_API_KEY}`) {
    //   return new Response(`Unauthorized ${key}`, { status: 401 });
    // }
    const data = (await request.json()) as MdxListItem;
    await BLOG.put(data.slug, JSON.stringify(data));
    return json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      return json({ message: e.message, stack: e.stack });
    }
  }
};
