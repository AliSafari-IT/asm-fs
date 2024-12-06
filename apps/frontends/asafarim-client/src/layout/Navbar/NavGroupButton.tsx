import React, { useState } from "react";
import { IChapter } from "../../interfaces/IChapter";
import MenuItem from "./components/MenuItem";

interface RenderNavItemsProps {
  navData: IChapter;
}

const NavGroupButton: React.FC<RenderNavItemsProps> = ({ navData }) => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (id: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };
  const hasChildren = navData && navData.docs && navData.docs.length > 0;


  return (
    <div
      key={navData.id}
      className="relative group dropdown-menu"
      >
      {/* Parent Button */}
      <button
       onClick={() => navData.url? window.open(navData.url, "_blank"): toggleDropdown(navData.id)} 
        className="flex items-center gap-2 px-4 py-2 "
      >
        {navData.icon && <span>{navData.icon}</span>}
        {<span className="align-top">{navData.title}</span>}
        {hasChildren && <span className="ml-2">▼</span>}
      </button>

      {/* Dropdown Menu */}
      {navData.docs && dropdownOpen[navData.id] && (
        <div className="absolute left-0 mt-2 w-48 border-[var(--color-primary)] rounded-md shadow-lg info">
          {navData.docs.map((item) => (
            <MenuItem key={item.id} {...item} className="dropdown-item" />
          ))}
        </div>
      )}
    </div>
  );
};

export default NavGroupButton;
