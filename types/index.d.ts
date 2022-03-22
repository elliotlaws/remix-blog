import calculateReadingTime from "reading-time";

type MdxPage = {
  code: string;
  slug: string;
  editLink: string;
  readTime?: ReturnType<typeof calculateReadingTime>;

  /**
   * It's annoying that all these are set to optional I know, but there's
   * no great way to ensure that the MDX files have these properties,
   * especially when a common use case will be to edit them without running
   * the app or build. So we're going to force you to handle situations when
   * these values are missing to avoid runtime errors.
   */
  frontmatter: {
    title?: string;
    date?: string;
    description?: string;
    tags?: Array<string>;
    image?: {
      url: string;
      blurDataUrl?: string;
      credit: string;
    };
    meta?: {
      [key: string]: string;
    };
  };
};

/**
 * This is a separate type from MdxPage because the code string is often
 * pretty big and the pages that simply list the pages shouldn't include the code.
 */
type MdxListItem = Omit<MdxPage, "code">;

declare global {
  type Env = { BLOG: string; SESSION_SECRET: string };
}

declare module useImageColor {
  type useImageColor = any;
}
