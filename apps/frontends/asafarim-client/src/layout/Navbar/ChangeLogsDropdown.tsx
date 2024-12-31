import React, { useEffect, useRef, useState } from "react";
import { getMdFiles } from "@/utils/mdFilesUtils";
import { getFirstHeading } from "@/utils/mdUtils";

const ChangeLogsDropdown: React.FC = () => {
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
    <div className="relative inline-block text-left" ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        aria-expanded={isOpen}
        aria-controls="changelog-menu"
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 transition-all duration-200"
      >
        Change Logs
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <ul
          id="changelog-menu"
          className="absolute left-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg shadow-lg overflow-y-auto max-h-64 z-10"
        >
          {changelogs.map((file) => (
            <li
              key={file.id}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
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
