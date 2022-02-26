import clsx from "clsx";
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
            <button onClick={() => setIsExpanded(!isExpanded)}>
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        className={clsx([
          isExpanded ? "block" : "hidden",
          "md:hidden divide-y-2 border-2  ",
        ])}
      >
        {/* <a href="#" className="block py-4 px-6 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-4 px-6 text-sm hover:bg-gray-200">
          Pricing
        </a> */}

        {LINKS.map((link) => (
          <NavLink
            onClick={() => setIsExpanded(false)}
            key={link.to}
            to={link.to}
            prefetch="intent"
            className={({ isActive }) =>
              clsx(
                isActive ? "active" : "text-gray-500 hover:text-slate-600",
                "py-4 px-6 font-medium block hover:bg-gray-200"
              )
            }
          >
            {link.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
