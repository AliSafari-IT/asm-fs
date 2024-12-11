import React, { forwardRef } from "react";
import { INavItem } from "../../interfaces/INavItem";
import SidebarNavItem from "../Navbar/SidebarNavItem";
import navItemsList from "../Navbar/navItemsList";

interface SidebarWrapperProps {
    sidebar?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

const mapNavItemToINavItem = (item: any): INavItem => {
    // implement the mapping logic here
    // for demonstration purposes, a simple mapping is shown
    return {
        ...item,
        // add any necessary transformations here
    };
};

export const SidebarWrapper = forwardRef<HTMLDivElement, SidebarWrapperProps>(
  ({ sidebar, children, className = '' }, ref) => {
    return sidebar ? (
        <aside ref={ref} className={`bg-[var(--bg-secondary)]
            border-r border-[var(--border-secondary)]
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            w-64
            ${className}`}
        >
            {sidebar}
        </aside>
    ) : (
        <aside ref={ref} className={`bg-[var(--bg-secondary)]
            border-r border-[var(--border-secondary)]
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            w-64
            ${className}`}
        >
            <div className="flex flex-col h-full">
                <div className="flex-1">
                    {navItemsList.map((item, index) => (
                        <SidebarNavItem
                            key={index}
                            sidebarNavData={item.subMenu?.map(mapNavItemToINavItem)}
                            className="sidebar-tree-container"
                        />
                    ))}
                </div>

                {/* Bottom section with subtle separator */}
                <div className="border-t border-[var(--border-secondary)]">
                    <div className="px-3 py-4">
                        <div className="text-xs text-[var(--text-secondary)]">
                            ASafariM &copy; 2024
                        </div>
                    </div>
                </div>
            </div>
            {children && <div>{children}</div>} 
        </aside>
    );
});