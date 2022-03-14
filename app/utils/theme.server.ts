import { createCookieSessionStorage } from "remix";

import { Theme, isTheme } from "./theme-provider";

// const sessionSecret = process.env.SESSION_SECRET;
// if (!sessionSecret) {
//   throw new Error("SESSION_SECRET must be set");
// }

const createThemeStorage = (sessionSecret: string) =>
  createCookieSessionStorage({
    cookie: {
      name: "my_remix_theme",
      secure: true,
      secrets: [sessionSecret],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });

async function getThemeSession(request: Request, sessionSecret = "secret") {
  const themeStorage = createThemeStorage(sessionSecret);
  const session = await themeStorage.getSession(request.headers.get("Cookie"));
  return {
    getTheme: () => {
      const themeValue = session.get("theme");
      return isTheme(themeValue) ? themeValue : Theme.DARK;
    },
    setTheme: (theme: Theme) => session.set("theme", theme),
    commit: () => themeStorage.commitSession(session),
  };
}

export { getThemeSession };
