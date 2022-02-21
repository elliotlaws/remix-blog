import { ActionFunction, json } from "remix";

export const action: ActionFunction = async ({ request, context }) => {
  try {
    // const key = request.headers.get('Authorization')
    // if (key !== `Bearer ${POST_API_KEY}`) {
    //   return new Response(`Unauthorized ${key}`, { status: 401 })
    // }
    const data = await request.json();
    await context.BLOG.put("$$deploy-sha", JSON.stringify(data));
    return json({ success: true });
  } catch (e) {
    //@ts-expect-error
    return json({ message: e.message, stack: e.stack });
  }
};
