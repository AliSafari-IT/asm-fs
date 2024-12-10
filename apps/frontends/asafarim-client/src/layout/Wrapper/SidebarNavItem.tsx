import React, { useState } from 'react';
import { INavItem } from '../../interfaces/INavItem';

const TreeViewItem: React.FC<{ item: INavItem, level?: number }> = ({ item, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;

    return (
        <div className="py-0.5">
            <div
                className={`group flex items-center px-3 py-2 cursor-pointer 
                    text-gray-700 dark:text-gray-300 
                    hover:bg-gray-100 dark:hover:bg-gray-700/50 
                    rounded-lg transition-all duration-200 
                    ${level > 0 ? 'ml-6' : ''}`}
                onClick={() => hasSubMenu && setIsOpen(!isOpen)}
            >
                <div className="flex items-center min-w-[24px]">
                    {hasSubMenu ? (
                        <span className={`transform transition-transform duration-200 text-[10px] 
                            text-gray-400 dark:text-gray-500 
                            group-hover:text-gray-600 dark:group-hover:text-gray-400
                            ${isOpen ? 'rotate-90' : ''}`}
                        >
                            ▶
                        </span>
                    ) : <span className="w-[10px]" />}
                </div>
                {item.icon && (
                    <span className="flex items-center justify-center w-5 h-5 mr-2.5 
                        text-gray-500 dark:text-gray-400 
                        group-hover:text-gray-700 dark:group-hover:text-gray-300"
                    >
                        {item.icon}
                    </span>
                )}
                <a
                    href={item.to}
                    onClick={(e) => hasSubMenu && e.preventDefault()}
                    className="flex-1 truncate text-sm font-medium
                        hover:text-gray-900 dark:hover:text-white"
                >
                    {item.title}
                </a>
            </div>
            {hasSubMenu && isOpen && (
                <div className={`border-l border-gray-200 dark:border-gray-600/50 
                    ${level > 0 ? 'ml-6' : ''}`}
                >
                    {item.subMenu?.map((subItem, index) => (
                        <TreeViewItem key={index} item={subItem} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const SidebarNavItem: React.FC<{ children?: React.ReactNode, sidebarNavData?: INavItem, className?: string }> = ({ children, sidebarNavData, className }) => {
    if (!children) {
        return (
            <div className={`${className} h-full bg-white dark:bg-gray-800 py-4 overflow-y-auto`}>
                {sidebarNavData?.title && (
                    <div className="text-gray-900 dark:text-white text-sm font-medium mb-4 px-4">
                        {sidebarNavData.title}
                    </div>
                )}
                {sidebarNavData && <TreeViewItem item={sidebarNavData} />}
            </div>
        );
    }
    return <>{children}</>;
};

export default SidebarNavItem;
