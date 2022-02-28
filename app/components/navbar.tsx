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

const LINKS = [
  {
    name: "Blog",
    to: "/blog",
  },
  { name: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <nav className="dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 py-9">
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div>
              <Link
                to="/"
                className="flex items-center px-2  hover:text-gray-900"
              >
                <h1 className="text-2xl font-semibold">Elliot Laws</h1>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                prefetch="intent"
                className={({ isActive }) =>
                  clsx(
                    isActive ? "active" : "text-gray-500 hover:text-slate-600",
                    "py-5 px-3 underlined font-medium"
                  )
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

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
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: shouldReduceMotion ? 0 : 0.15,
              ease: "linear",
            }}
            className="bg-white text-base flex h-full flex-col overflow-y-scroll border-t border-gray-200 pb-12 dark:border-gray-600"
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
