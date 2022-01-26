import styles from "highlight.js/styles/github-dark-dimmed.css";
import { LinksFunction, Outlet } from "remix";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Blog() {
  return (
    <div className="flex justify-center dark:bg-gray-900">
      <article className="prose prose-slate lg:prose-lg dark:prose-invert py-10 max-w-screen-lg">
        <Outlet />
      </article>
    </div>
  );
}
