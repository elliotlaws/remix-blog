import { createPagesFunctionHandler } from "@remix-run/cloudflare-pages";

// @ts-ignore
import * as build from "../build";

const handleRequest = createPagesFunctionHandler({
  build,
  getLoadContext: (context) => {
    return {
      BLOG: context.env.BLOG,
      SESSION_SECRET: context.env.SESSION_SECRET,
    };
  },
});

export function onRequest(context) {
  return handleRequest(context);
}
