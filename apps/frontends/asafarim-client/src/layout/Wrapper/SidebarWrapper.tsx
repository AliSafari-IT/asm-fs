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
            bg-gradient-to-b from-gray-900 to-gray-800
            border-r border-gray-700/50
            transition-all duration-300 ease-in-out
            overflow-y-auto
            ${className}`}
        >
            <div className="flex flex-col h-full py-4 overflow-y-auto">
                <nav className="flex-1 space-y-1 px-3">
                    {navItems.map((item, index) => (
                        <SidebarNavItem 
                            key={index} 
                            sidebarNavData={item}
                        />
                    ))}
                </nav>
                
                {/* Bottom section with subtle separator */}
                <div className="mt-auto pt-4 border-t border-gray-700/30">
                    <div className="px-3 pb-4">
                        <div className="text-xs text-gray-400 px-4">
                            ASafariM &copy; 2024
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};