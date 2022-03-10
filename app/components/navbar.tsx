import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuLink,
  MenuList,
  MenuPopover,
  useMenuButtonContext,
} from "@reach/menu-button";
import clsx from "clsx";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { NavLink } from "remix";
import { Link } from "remix";
import { Switch } from "@headlessui/react";
import { Theme, useTheme } from "~/utils/theme-provider";

const LINKS = [
  {
    name: "Blog",
    to: "/blog",
  },
  { name: "Music", to: "/music" },
  { name: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <nav className="dark:text-zinc-200">
      <div className="max-w-7xl mx-auto px-4 py-9">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div>
              <Link
                to="/"
                className="flex items-center px-2 hover:text-gray-900 dark:hover:text-zinc-300"
              >
                <h1 className="text-2xl font-semibold">Elliot Laws</h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-5">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? "active dark:text-zinc-100"
                      : "dark:text-zinc-400",
                    "py-5 underlined font-medium dark:text-zinc-200 dark:hover:text-zinc-200"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
          <MyToggle />
          <div className="md:hidden flex items-center z-100">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

export function MobileMenu() {
  return (
    <Menu>
      <MobileMenuButton />
      <MobileMenuList />
    </Menu>
  );
}

const topVariants = {
  open: { rotate: 45, y: 7 },
  closed: { rotate: 0, y: 0 },
};

const centerVariants = {
  open: { opacity: 0 },
  closed: { opacity: 1 },
};

const bottomVariants = {
  open: { rotate: -45, y: -5 },
  closed: { rotate: 0, y: 0 },
};

function MobileMenuButton() {
  const { isExpanded } = useMenuButtonContext();
  const state = isExpanded ? "open" : "closed";

  return (
    <MenuButton className="focus:outline-none">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="z-100"
      >
        <motion.rect
          animate={state}
          variants={topVariants}
          x="6"
          y="9"
          width="20"
          height="2"
          rx="1"
          fill="currentColor"
        />
        <motion.rect
          animate={state}
          variants={centerVariants}
          x="6"
          y="15"
          width="20"
          height="2"
          rx="1"
          fill="currentColor"
        />
        <motion.rect
          animate={state}
          variants={bottomVariants}
          x="6"
          y="21"
          width="20"
          height="2"
          rx="1"
          fill="currentColor"
        />
      </svg>
    </MenuButton>
  );
}

function MobileMenuList() {
  const { isExpanded } = useMenuButtonContext();
  const shouldReduceMotion = useReducedMotion();

  // useEffect(() => {
  //   if (isExpanded) {
  //     // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
  //     document.body.classList.add("fixed");
  //     document.body.classList.add("overflow-y-scroll");
  //     // alternatively, get bounding box of the menu, and set body height to that.
  //     document.body.style.height = "100vh";
  //   } else {
  //     document.body.classList.remove("fixed");
  //     document.body.classList.remove("overflow-y-scroll");
  //     document.body.style.removeProperty("height");
  //   }
  // }, [isExpanded]);

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 2.5rem)`, // 2.25 rem = py-9 from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{ display: "block" }}
          className="z-50"
        >
          <motion.div
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: "linear",
            }}
            className="bg-white dark:bg-zinc-900 text-base flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 "
          >
            <MenuItems className="border-none bg-transparent p-0">
              {LINKS.map((link) => (
                <MenuLink
                  className="text-base font-medium p-6  hover:bg-gray-200 focus:bg-gray-200 hover:text-black border-b border-gray-200"
                  key={link.to}
                  as={Link}
                  to={link.to}
                >
                  {link.name}
                </MenuLink>
              ))}
              {/* <div className="noscript-hidden py-9 text-center">
                <DarkModeToggle variant="labelled" />
              </div> */}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
}

function MyToggle() {
  const [theme, setTheme] = useTheme();
  const enabled = theme === Theme.DARK;

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  return (
    <div className="flex gap-2">
      <Switch.Group>
        <Switch.Label passive>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={clsx(
              "h-6 w-6",
              theme === Theme.LIGHT ? "opacity-100" : "opacity-50"
            )}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={toggleTheme}
          className={`${
            enabled ? "bg-blue-600" : "bg-gray-500"
          } relative inline-flex items-center h-6 rounded-full w-11`}
        >
          <span
            className={`${
              enabled ? "translate-x-6" : "translate-x-1"
            } inline-block w-4 h-4 transform bg-white rounded-full transform transition ease-in-out duration-200`}
          />
        </Switch>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={clsx(
            "h-6 w-6",
            theme === Theme.DARK ? "opacity-100" : "opacity-50"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </Switch.Group>
    </div>
  );
}
