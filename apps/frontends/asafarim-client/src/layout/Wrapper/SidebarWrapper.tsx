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
        <aside className={`fixed left-0 top-[var(--navbar-height)] h-[calc(100vh-var(--navbar-height))] w-[var(--sidebar-width)]
            bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
            transition-all duration-300 ease-in-out
            shadow-lg dark:shadow-gray-900/30
            ${className}`}
        >
            <div className="flex flex-col h-full overflow-y-auto">
                <nav className="flex-1 px-2 py-4 space-y-1">
                    {navItems.map((item, index) => (
                        <SidebarNavItem 
                            key={index} 
                            sidebarNavData={item} 
                            className="sidebar-tree-container" 
                        />
                    ))}
                </nav>
            </div>
        </aside>
    );
};