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
  return { title: "Elliot Laws Blog" };
};

export default function App() {
  return (
    <html lang="en" className="dark">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-screen dark:bg-[#1d1e25fc] dark:text-zinc-200">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1">
            <div className="container px-4 m-auto lg:max-w-screen-lg">
              <Outlet />
            </div>
          </div>
          <footer className="py-6 mt-16 border-t border-slate-600">
            <div className="max-w-7xl mx-auto px-4">
              <p className="font-medium">&copy; Elliot Laws</p>
            </div>
          </footer>
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </div>
      </body>
    </html>
  );
}
