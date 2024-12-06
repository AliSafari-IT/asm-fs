// src/components/RenderMenuItems.tsx
import React from "react";
import { IMenuItem } from "../../interfaces/IMenuItem";

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

  // Indentation for mobile
  const paddingLeft = isMobile ? `${depth * 16}px` : "0";

  const handleClick = () => {
    if (hasSubMenu) {
      toggleMenu(item.id);
    } else {
      if (isMobile && closeAllMenus) {
        closeAllMenus();
      }
    }
  };

  return (
    <li className="relative group">
      <div className="flex items-center justify-between">
        {/* Link or Button */}
        {hasSubMenu ? (
          <button
            onClick={handleClick}
            className={`flex items-center w-full text-left px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none`}
            style={{ paddingLeft }}
            aria-haspopup="true"
            aria-expanded={isOpen}
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
            {/* Chevron Icon */}
            <svg
              className="ml-auto h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              )}
            </svg>
          </button>
        ) : (
          <a
            href={item.to}
            className={`flex items-center px-3 py-2 rounded-md hover:bg-gray-700 focus:outline-none`}
            style={{ paddingLeft }}
            onClick={() => {
              if (isMobile && closeAllMenus) closeAllMenus();
            }}
            aria-current="page"
          >
            {item.icon && <span className="mr-2">{item.icon}</span>}
            <span>{item.label}</span>
          </a>
        )}
      </div>

      {/* SubMenu */}
      {hasSubMenu && (
        <>
          {/* Desktop SubMenu */}
          {!isMobile && (
            <ul className={`absolute left-0 mt-2 w-48 bg-white text-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-10`}>
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

          {/* Mobile SubMenu */}
          {isMobile && isOpen && (
            <ul className="pl-4 border-l border-gray-700">
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
        </>
      )}
    </li>
  );
};

export default RenderMenuItems;
