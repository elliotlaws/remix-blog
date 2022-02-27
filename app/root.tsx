import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "remix";
import type { MetaFunction } from "remix";
import Navbar from "./components/navbar";

import tailwindStyles from "~/styles/tailwind.css";
import globalStyles from "~/styles/global.css";
import vendorStyles from "~/styles/vendors.css";

export function links() {
  return [
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: vendorStyles },
  ];
}

export const meta: MetaFunction = () => {
  return { title: "New Remix App" };
};

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <div className="container p-4 m-auto lg:max-w-screen-lg">
              <Outlet />
            </div>
          </div>
          <footer className="px-12 py-6 mt-16 border-t border-slate-600">
            <div className="max-w-6xl mx-auto px-4">
              <p className="font-medium">&copy; Elliot Laws</p>
            </div>
          </footer>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
          {/* Cloudflare Web Analytics */}
          {/* {process.env.NODE_ENV === "production" && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon='{"token": "cf7ec1461d994872b4a5463f0a1b336b"}'
          ></script> */}
          {/* )} */}
        </div>
      </body>
    </html>
  );
}
