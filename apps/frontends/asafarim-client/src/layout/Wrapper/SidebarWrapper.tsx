import navItems from "../Navbar/navItems";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarWrapperProps {
    sidebar?: React.ReactNode;
    className?: string;
}

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ sidebar, className = '' }) => {
    return sidebar ? (
        <aside className={`bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)]
            border-r border-gray-200/20 dark:border-gray-700/50
            transition-all duration-300 ease-in-out
            h-[calc(100vh-var(--navbar-height)-var(--footer-height))]
            overflow-y-auto
            hidden md:block
            ${className}`}
        >
            {sidebar}
        </aside>
    ) : (
        <aside className={`bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)]
            border-r border-gray-200/20 dark:border-gray-700/50
            transition-all duration-300 ease-in-out
            h-[calc(100vh-var(--navbar-height)-var(--footer-height))]
            overflow-y-auto
            hidden md:block
            ${className}`}
        >
            <div className="flex flex-col h-full">
                <div className="flex-1">
                    {navItems.map((item, index) => (
                        <SidebarNavItem
                            key={index}
                            sidebarNavData={item}
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
        </aside>
    );
};