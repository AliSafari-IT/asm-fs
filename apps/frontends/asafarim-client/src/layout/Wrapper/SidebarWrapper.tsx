import { INavItem } from "../../interfaces/INavItem";
import navItems from "../Navbar/navItems";
import SidebarNavItem from "../Navbar/SidebarNavItem";

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

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ sidebar, children, className = '' }) => {
    return sidebar ? (
        <aside className={`bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)]
            border-r border-gray-200/20 dark:border-gray-700/50
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            w-64
            ${className}`}
        >
            {sidebar}
        </aside>
    ) : (
        <aside className={`bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)]
            border-r border-gray-200/20 dark:border-gray-700/50
            transition-all duration-300 ease-in-out
            h-full
            overflow-y-auto
            w-64
            ${className}`}
        >
            <div className="flex flex-col h-full">
                <div className="flex-1">
                    {navItems.map((item, index) => (
                        <SidebarNavItem
                            key={index}
                            sidebarNavData={mapNavItemToINavItem(item)}
                            className="sidebar-tree-container"
                        />
                    ))}
                </div>

                {/* Bottom section with subtle separator */}
                <div className="border-t border-gray-700/30">
                    <div className="px-3 py-4">
                        <div className="text-xs text-gray-400">
                            ASafariM &copy; 2024
                        </div>
                    </div>
                </div>
            </div>
            {children && <div>{children}</div>} 
        </aside>
    );
};