import { Link } from "remix";

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
            <Link to="/blog" prefetch="intent" className="py-5 px-3">
              Blog
            </Link>
            <Link to="" className="py-5 px-3">
              About
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button className="mobile-menu-button">
              {/* <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg> */}
            </button>
          </div>
        </div>
      </div>

      <div className="mobile-menu hidden md:hidden">
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Features
        </a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-200">
          Pricing
        </a>
      </div>
    </nav>
  );
}
