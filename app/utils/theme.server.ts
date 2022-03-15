import { createCookieSessionStorage } from "remix";

import { Theme, isTheme } from "./theme-provider";

function createSessionStorage(env: Env) {
  return createCookieSessionStorage({
    cookie: {
      name: "my_remix_theme",
      secure: true,
      secrets: [env.SESSION_SECRET],
      sameSite: "lax",
      path: "/",
      httpOnly: true,
    },
  });
}

async function getThemeSession(request: Request, env: Env) {
  const themeStorage = createSessionStorage(env);
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
