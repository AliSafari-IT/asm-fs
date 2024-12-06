// src/layout/Navbar/RenderMenuItems.tsx

import React, { useState, useRef, useEffect } from "react";
import { IMenuItem } from "../../interfaces/IMenuItem";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";

interface RenderMenuItemsProps {
  item: IMenuItem;
  depth: number;
  openMenus: Record<string, boolean>;
  toggleMenu: (id: string) => void;
  isMobile?: boolean;
  closeAllMenus?: () => void;
}

const RenderMenuItems: React.FC<RenderMenuItemsProps> = ({
  item,
  depth,
  openMenus,
  toggleMenu,
  isMobile = false,
  closeAllMenus,
}) => {
  const hasSubMenu = item.subMenu && item.subMenu.length > 0;
  const isOpen = openMenus[item.id];
  const liRef = useRef<HTMLLIElement>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  // Inside the component
  const location = useLocation();
  const isActive = location.pathname === item.to;

  // Handle click outside for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    if (!isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      if (!isMobile) {
        document.removeEventListener("mousedown", handleClickOutside);
      }
    };
  }, [isMobile]);

  const handleMouseEnter = () => {
    if (!isMobile && hasSubMenu) {
      setIsDropdownOpen(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isMobile && hasSubMenu) {
      setIsDropdownOpen(false);
    }
  };

  const handleClick = () => {
    if (hasSubMenu) {
      if (isMobile) {
        toggleMenu(item.id);
      }
    } else {
      if (isMobile && closeAllMenus) {
        closeAllMenus();
      }
    }
  };

  return (
    <li
      className={`relative ${isMobile ? "" : "group"}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      ref={!isMobile && hasSubMenu ? liRef : null}

    >
      {hasSubMenu ? (
        <div className="flex items-center">
          <button
            onClick={handleClick}
            className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-100 focus:outline-none transition-colors duration-200`}
            aria-haspopup="true"
            aria-expanded={isMobile ? isOpen : isDropdownOpen}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
            {/* Chevron Icon */}
            <FaChevronDown
              className={`ml-1 h-4 w-4 transition-transform duration-200 ${(isMobile ? isOpen : isDropdownOpen) ? "transform rotate-180" : ""
                }`}
            />
          </button>
        </div>
      ) : (
        <Link
          to={item.to || "#"}
          className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200 ${isActive ? "active font-semibold " : "text-gray-700"
            }`}
          onClick={() => {
            if (isMobile && closeAllMenus) {
              closeAllMenus();
            }
          }}
        >
          {item.icon && <span className="mr-2">{item.icon}</span>}
          <span>{item.label}</span>
        </Link>
      )}

      {/* SubMenu for Desktop */}
      {hasSubMenu && !isMobile && isDropdownOpen && (
        <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-1 z-20">
          {item.subMenu!.map((subItem) => (
            <RenderMenuItems
              key={subItem.id}
              item={subItem}
              depth={depth + 1}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
            />
          ))}
        </ul>
      )}

      {/* SubMenu for Mobile */}
      {hasSubMenu && isMobile && isOpen && (
        <ul className="pl-4 border-l border-gray-300">
          {item.subMenu!.map((subItem) => (
            <RenderMenuItems
              key={subItem.id}
              item={subItem}
              depth={depth + 1}
              openMenus={openMenus}
              toggleMenu={toggleMenu}
              isMobile
              closeAllMenus={closeAllMenus}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default RenderMenuItems;
