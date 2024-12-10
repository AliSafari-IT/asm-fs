import navItems from "../Navbar/navItems";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarWrapperProps {
    sidebar?: React.ReactNode;
    className?: string;
}

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ sidebar, className = '' }) => {
    if (sidebar) {
        return <>{sidebar}</>;
    }

    return (
        <aside className={`bg-gradient-to-b from-[var(--bg-primary)] to-[var(--bg-secondary)]
            border-r border-gray-700/50
            transition-all duration-300 ease-in-out
            h-[calc(100vh-var(--navbar-height))]
            overflow-y-auto
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