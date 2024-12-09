import navItems from "../Navbar/navItems";
import SidebarNavItem from "./SidebarNavItem";

interface SidebarWrapperProps {
    sidebar?: React.ReactNode;
}

export const SidebarWrapper: React.FC<SidebarWrapperProps> = ({ sidebar }) => {
    if (sidebar) {
        return <>{sidebar}</>;
    }

    return (
        <div className="flex flex-col h-full">
            {navItems.map((item, index) => (
                <SidebarNavItem 
                    key={index} 
                    sidebarNavData={item} 
                    className="sidebar-tree-container" 
                />
            ))}
        </div>
    );
};