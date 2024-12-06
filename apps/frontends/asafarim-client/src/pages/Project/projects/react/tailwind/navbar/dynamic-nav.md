**Add recursive dropdown functionality to navigation**

- Introduced `RenderNavItems` component for dynamically rendering nested dropdown menus.
- Implemented parent-child hierarchy handling using `parentId`.
- Integrated responsive design with Tailwind CSS and `Disclosure` for mobile and desktop layouts.
- Enhanced user experience with hover effects and dynamic dropdown toggling.
## Key Features:
1. **Recursive Rendering:**
   - `RenderNavItems` handles parent-child relationships dynamically using `parentId`.

2. **Dropdown State:**
   - Dropdown states are managed locally in `RenderNavItems` using `useState`.

3. **Reusability:**
   - `RenderNavItems` can be used independently for different navigation structures.

4. **Responsive Design:**
   - Navbar integrates seamlessly with `Disclosure` for mobile and desktop views.


### Refactored `RenderNavItems` Component

```tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { INavItem } from "../../interfaces/INavItel";

interface RenderNavItemsProps {
  items: INavItem[];
  parentId?: string | null;
}

const RenderNavItems: React.FC<RenderNavItemsProps> = ({ items, parentId = null }) => {
  const [dropdownOpen, setDropdownOpen] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (id: string) => {
    setDropdownOpen((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const filteredItems = items.filter((item) => item.parentId === parentId);

  return (
    <>
      {filteredItems.map((item) => {
        const childItems = items.filter((child) => child.parentId === item.id);
        const hasChildren = childItems.length > 0;

        return (
          <div key={item.id} className="relative group">
            {/* Parent Link */}
            <div className="flex items-center">
              {item.to ? (
                <Link
                  to={item.to}
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
                  onClick={item.onClick}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.title}
                  {hasChildren && (
                    <button
                      type="button"
                      className="ml-2"
                      onClick={() => toggleDropdown(item.id)}
                    >
                      ▼
                    </button>
                  )}
                </Link>
              ) : (
                <button
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 rounded-md"
                  onClick={() => toggleDropdown(item.id)}
                >
                  {item.icon && <span>{item.icon}</span>}
                  {item.title}
                  {hasChildren && <span className="ml-2">▼</span>}
                </button>
              )}
            </div>

            {/* Dropdown Menu for Children */}
            {hasChildren && dropdownOpen[item.id] && (
              <div className="dropdown-menu ml-4 mt-2 space-y-1">
                <RenderNavItems items={items} parentId={item.id} />
              </div>
            )}
          </div>
        );
      })}
    </>
  );
};

export default RenderNavItems;
```

### Usage in Your Navbar

Here’s how you can integrate `RenderNavItems` into your `Navbar` component:

```tsx
import React from "react";
import { navItems } from "./navItems";
import RenderNavItems from "./RenderNavItems";
import logo from "./logoT.svg";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";

const Navbar: React.FC = () => {
  return (
    <Disclosure as="nav" className="bg-blue-600 text-white">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center">
                <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />
                <span className="font-bold text-xl">ASafariM</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex space-x-4">
                <RenderNavItems items={navItems} />
              </div>

              {/* Mobile Menu Button */}
              <div className="-mr-2 flex md:hidden">
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-gray-700">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <RenderNavItems items={navItems} />
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
```

