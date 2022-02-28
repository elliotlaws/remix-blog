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
import { useState } from "react";
import { NavLink } from "remix";
import { Link } from "remix";

const LINKS = [
  {
    name: "Blog",
    to: "/blog",
  },
  { name: "About", to: "/" },
];

export default function Navbar() {
  const [isExpanded, setIsExpanded] = useState(false);

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

          <div className="md:hidden flex items-center">
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
    <MenuButton>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
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
            top: `calc(${Number(r?.top) + Number(r?.height)}px + 1em)`, // 2.25 rem = py-9 from navbar
            left: 0,
            bottom: 0,
            right: 0,
          })}
          style={{
            zIndex: 50,
            background: "white",
            height: "fit-content",
            width: "100vw",
          }}
          className="slide-down"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: "linear",
            }}
          >
            <MenuItems className="divide-y-2 border-2 md:hidden focus:outline-none">
              {LINKS.map((link) => (
                <MenuLink
                  className="py-4 px-6 font-medium block hover:bg-gray-200 divide-y-2"
                  key={link.to}
                  to={link.to}
                  as={Link}
                >
                  {link.name}
                </MenuLink>
              ))}
            </MenuItems>
          </motion.div>
        </MenuPopover>
      ) : null}
    </AnimatePresence>
  );
}
