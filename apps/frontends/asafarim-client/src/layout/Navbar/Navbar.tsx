// src/components/Navbar.tsx
import React, { useState, useRef, useEffect } from "react";
import AsmLogo from "./components/AsmLogo";
import navItems from "./navItems";
import RenderMenuItems from "./RenderMenuItems";
import HamburgerIcon from "./components/HamburgerIcon";
import HamburgerIconX from "./components/HamburgerIconX";
import ToggleTheme from "../../components/theme/ToggleTheme";
import AccountComponent from "../../components/user/AccountComponent";

const Navbar: React.FC = () => {
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  const isMobile = window.innerWidth <= 480;

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleMenu = (id: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const closeAllMenus = () => {
    setOpenMenus({});
  };

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        closeAllMenus();
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="shadow-md primary w-full z-50 top-0" ref={navRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a className="flex items-center" href="/">
            <AsmLogo className="flex items-center" brandName="ASafariM" />
          </a>

          {/* Search bar before the desktop menu */}
          <div className="hidden lg:flex lg:items-center lg:w-1/3 lg:ml-6">
            <div className="relative w-full">
              <input
                type="text"
                className="block w-full ml-10 pr-3 py-2 border rounded-md leading-5 placeholder-gray-500 focus:outline-none focus:border-indigo-200 sm:text-sm"
                placeholder="Search..."
                style={{ textIndent: "25px" }}
              />
              <div className="absolute inset-y-0 left-10 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5  text-indigo-600 p-1 rounded-md"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                  strokeLinejoin="round"
                  strokeMiterlimit="1.414"
                  aria-hidden="true"
                  role="presentation"
                  focusable="false"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM14 8a6 6 0 11-12 0 6 6 0 0112 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <ul className="absolute left-0 mt-2 w-48 shadow-lg rounded-md py-1 z-20 transition ease-out duration-200 transform opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-95">
              <RenderMenuItems
                closeAllMenus={closeAllMenus}
                item={navItems.dashboardDropDown}
                depth={0}
                openMenus={openMenus}
                toggleMenu={toggleMenu}
              />
            </ul>
          </div>

          {/* Account Component for both mobile and desktop */}
          <AccountComponent isMobile={isMobile} />
          <ToggleTheme className="pr-2" />

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              onClick={handleMobileMenuToggle}
              type="button"
              className="inline-flex items-center justify-center rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!mobileMenuOpen ? <HamburgerIcon /> : <HamburgerIconX />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <RenderMenuItems
              item={navItems.dashboardDropDown}
              depth={0}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              isMobile
              closeAllMenus={closeAllMenus}
            />
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
