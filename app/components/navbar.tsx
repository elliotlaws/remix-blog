import {
  Menu,
  MenuButton,
  MenuItems,
  MenuLink,
  MenuPopover,
  useMenuButtonContext,
} from "@reach/menu-button";
import clsx from "clsx";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { useEffect } from "react";
import { NavLink } from "remix";
import { Link } from "remix";
import { Theme, useTheme } from "~/utils/theme-provider";

const LINKS = [
  { name: "Blog", to: "/blog" },
  { name: "About", to: "/about" },
];

export default function Navbar() {
  return (
    <nav className="dark:text-zinc-200">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              <Link
                to="/"
                className="flex items-center hover:text-gray-900 dark:hover:text-zinc-300"
              >
                <h1 className="text-2xl">Elliot Laws</h1>
              </Link>
            </div>
          </div>
          <div className="flex justify-between items-center space-x-8">
            <div className="hidden md:flex items-center space-x-6 ml-24">
              {LINKS.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  prefetch="intent"
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? "active dark:text-zinc-100 "
                        : "dark:text-zinc-400",
                      "py-5 underlined dark:text-zinc-200 dark:hover:text-zinc-200"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
            <div className="hidden md:block">
              <DarkModeToggle />
            </div>
          </div>
          <div className="md:hidden flex items-center z-100">
            <MobileMenu />
          </div>
        </div>
      </div>
    </nav>
  );
}

function MobileMenu() {
  return (
    <Menu>
      <MobileMenuButton />
      <MobileMenuList />
    </Menu>
  );
}

const topVariants = {
  open: { rotate: 45, y: 3 },
  closed: { rotate: 0, y: 0 },
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
          y="12"
          width="20"
          height="2"
          rx="1"
          fill="currentColor"
        />
        <motion.rect
          animate={state}
          variants={bottomVariants}
          x="6"
          y="20"
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

  useEffect(() => {
    if (isExpanded) {
      // don't use overflow-hidden, as that toggles the scrollbar and causes layout shift
      document.body.classList.add("fixed");
      document.body.classList.add("overflow-y-scroll");
      // alternatively, get bounding box of the menu, and set body height to that.
      document.body.style.width = "100vw";
    } else {
      document.body.classList.remove("fixed");
      document.body.classList.remove("overflow-y-scroll");
      document.body.style.removeProperty("height");
    }
  }, [isExpanded]);

  return (
    <AnimatePresence>
      <MenuPopover
        position={(r) => ({
          top: `calc(${Number(r?.top) + Number(r?.height)}px + 1.75rem)`, // 2.25 rem = py-9 from navbar
          left: 0,
          bottom: 0,
          right: 0,
        })}
        style={{ zIndex: 200 }}
      >
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -30, opacity: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.15,
            ease: "linear",
          }}
          className="text-base flex h-full flex-col overflow-y-scroll border-t-2 border-gray-200 pb-12 bg-primary"
        >
          <MenuItems className="border-none p-0 min-h-screen bg-transparent">
            {LINKS.map((link) => (
              <MenuLink
                className="text-base font-medium p-6 bg-primary hover:bg-gray-200 focus:bg-gray-200 hover:text-black border-b-2 border-gray-200"
                key={link.to}
                as={Link}
                to={link.to}
              >
                {link.name}
              </MenuLink>
            ))}
            <div className="p-8 w-screen flex justify-center">
              <DarkModeToggle />
            </div>
          </MenuItems>
        </motion.div>
      </MenuPopover>
    </AnimatePresence>
  );
}

function DarkModeToggle() {
  const [theme, setTheme] = useTheme();

  const toggleTheme = () => {
    setTheme((prevTheme) =>
      prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    );
  };

  const duration = 0.7;

  const moonVariants = {
    checked: {
      scale: 1,
    },
    unchecked: {
      scale: 0,
    },
  };

  const sunVariants = {
    checked: {
      scale: 0,
    },
    unchecked: {
      scale: 1,
    },
  };

  const isChecked = theme === Theme.DARK;

  const scaleMoon = useMotionValue(isChecked ? 1 : 0);
  const scaleSun = useMotionValue(isChecked ? 0 : 1);

  const pathLengthMoon = useTransform(scaleMoon, [0.6, 1], [0, 1]);
  const pathLengthSun = useTransform(scaleSun, [0.6, 1], [0, 1]);

  return (
    <motion.button
      className="hover:bg-gray-200 transition duration-60 hover:ease-in dark:hover:bg-[#25252ef0] p-1 rounded-lg"
      onClick={toggleTheme}
      initial={false}
      animate={isChecked ? "checked" : "unchecked"}
      transition={{ duration }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <motion.path
          custom={isChecked}
          variants={sunVariants}
          transition={{ duration }}
          style={{
            pathLength: pathLengthSun,
            scale: scaleSun,
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
        />
        <motion.path
          custom={isChecked}
          variants={moonVariants}
          transition={{ duration }}
          style={{
            pathLength: pathLengthMoon,
            scale: scaleMoon,
          }}
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </svg>
    </motion.button>
  );
}
