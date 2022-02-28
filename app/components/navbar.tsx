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
import { AnimatePresence, motion } from "framer-motion";
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
    <nav className="bg-gray-100 dark:bg-gray-800">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            <div>
              <Link
                to="/"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <h1 className="text-2xl font-bold">Elliot Laws</h1>
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

  return (
    <AnimatePresence>
      {isExpanded ? (
        <MenuPopover
          position={(r) => ({
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.5em)`,
            left: 0,
            bottom: 0,
            right: 0,
          })}
          className="z-50 bg-white"
          style={{ display: "block" }}
        >
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.15,
              easeInOut: "linear",
            }}
            className="border-b-2"
          >
            <MenuItems className="divide-y-2 border-none md:hidden focus:outline-none p-0">
              {LINKS.map((link) => (
                <MenuLink
                  className="p-6 font-medium text-base hover:bg-gray-200 focus:bg-gray-200 divide-y-2 flex items-center"
                  key={link.to}
                  to={link.to}
                  as={Link}
                >
                  {link.name}
                </MenuLink>
              ))}
            </MenuItems>
            {/* <div>
              <svg
                className="scale-[0.2]"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M14.228 7.9439C10.5176 8.82869 7.75757 12.1054 7.75757 15.9987C7.75757 20.5716 11.5618 24.2919 16.2367 24.2919C19.2323 24.2919 21.9337 22.7699 23.4514 20.3585C23.2779 20.3676 23.1033 20.3722 22.9287 20.3722C17.7826 20.3722 13.5951 16.2772 13.5951 11.2435C13.5951 10.1032 13.8108 8.98914 14.228 7.9439M16.2367 26.4993C10.3171 26.4993 5.50037 21.7899 5.50037 15.9987C5.50037 10.2109 10.3171 5.49927 16.2367 5.49927C16.6598 5.49927 17.0501 5.72963 17.2435 6.09753C17.438 6.46428 17.4087 6.90668 17.1638 7.24363C16.3059 8.42297 15.8535 9.80631 15.8535 11.2435C15.8535 15.06 19.0272 18.1637 22.9287 18.1637C23.6483 18.1637 24.3573 18.0582 25.0359 17.8531C25.4378 17.7293 25.8785 17.8359 26.1738 18.1304C26.4715 18.425 26.5758 18.8559 26.4446 19.2467C25.0019 23.5847 20.9 26.4993 16.2367 26.4993"
                  fill="currentColor"
                />
              </svg>
            </div> */}
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
}
