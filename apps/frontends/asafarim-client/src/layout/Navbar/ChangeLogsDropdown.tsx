import React, { useEffect, useRef, useState } from "react";
import { getMdFiles } from "@/utils/mdFilesUtils";
import { getFirstHeading } from "@/utils/mdUtils";
import { FaRegFileAlt } from 'react-icons/fa';

const ChangeLogsDropdown: React.FC<{ mobileView: boolean }> = ({ mobileView }) => {
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown visibility
  const mdFiles = getMdFiles(); // Get Markdown files
  const changelogs = mdFiles?.changelogs?.subMenu || []; // Ensure safe access to changelog items
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef} >
      {/* Dropdown Button with no title but an icon*/}
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="changelog-menu"
        className="text-[var(--text-primary)] transition-all duration-200"
      >
        <FaRegFileAlt className="inline-block m-2" />
        {`${changelogs.length} logs `}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          id="changelog-menu"
          className={`${mobileView ? "absolute left-0" : "absolute right-0"} mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-800 overflow-y-auto max-h-64 z-10`}
        >
          {changelogs.map((file) => (
            <li
              key={file.id}
              className="p-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <a
                href={file.to}
                title={getFirstHeading(file.content || "") || "Untitled"}
                className="block text-gray-800 dark:text-gray-200 truncate max-w-[250px]"
              >
                {getFirstHeading(file.content || "") || "Untitled"}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ChangeLogsDropdown;
