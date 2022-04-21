import {
  Links,
  LiveReload,
  LoaderFunction,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "remix";
import type { MetaFunction } from "remix";
import Navbar from "./components/navbar";
import tailwindStyles from "~/styles/tailwind.css";
import globalStyles from "~/styles/global.css";
import vendorStyles from "~/styles/vendors.css";
import proseStyles from "~/styles/prose.css";
import clsx from "clsx";
import {
  NonFlashOfWrongThemeEls,
  Theme,
  ThemeProvider,
  useTheme,
} from "./utils/theme-provider";
import { getThemeSession } from "./utils/theme.server";
import { Footer } from "./components/footer";

export function links() {
  return [
    {
      rel: "preload",
      as: "font",
      href: "/fonts/dm-sans-regular.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/dm-sans-500.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "font",
      href: "/fonts/dm-sans-700.woff2",
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    { rel: "stylesheet", href: tailwindStyles },
    { rel: "stylesheet", href: globalStyles },
    { rel: "stylesheet", href: vendorStyles },
    { rel: "stylesheet", href: proseStyles },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
    { rel: "icon", href: "/favicon.ico" },
  ];
}

export const meta: MetaFunction = () => {
  return {
    title: "Elliot Laws",
    description: "Elliot Laws Blog",
    keywords:
      "Learn React, Learn TypeScript, Node, Software Engineering, Software Developer, Remix Run",
  };
};

export type LoaderData = {
  theme: Theme | null;
};

export const loader: LoaderFunction = async ({ context, request }) => {
  const themeSession = await getThemeSession(request, context?.env);

  const data: LoaderData = {
    theme: themeSession.getTheme(),
  };

  return data;
};

function App() {
  const data = useLoaderData<LoaderData>();
  const [theme] = useTheme();

  return (
    <html lang="en" className={clsx(theme)}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <NonFlashOfWrongThemeEls ssrTheme={Boolean(data.theme)} />
      </head>
      <body className="min-h-screen min-w-screen bg-primary">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1 mb-6">
            <Outlet />
          </div>
          <Footer />
          <ScrollRestoration />
          <Scripts />
          {process.env.NODE_ENV === "development" && <LiveReload />}
        </div>
      </body>
    </html>
  );
}

export default function AppWithProviders() {
  const data = useLoaderData<LoaderData>();
  return (
    <ThemeProvider specifiedTheme={data.theme}>
      <App />
    </ThemeProvider>
  );
}
