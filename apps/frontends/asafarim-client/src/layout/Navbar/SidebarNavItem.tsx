import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INavItem } from '../../interfaces/INavItem';

const TreeViewItem: React.FC<{ item: INavItem, level?: number }> = ({ item, level = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const isEmphasized = item.className?.includes('emphasized');
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent) => {
        if (hasSubMenu) {
            e.preventDefault();
            setIsOpen(!isOpen);
        } else {
            // For non-submenu items, navigate and close all menus
            if (item.to && !item.to.startsWith('#')) {
                e.preventDefault();
                navigate(item.to);
                // Find and close the mobile menu by clicking outside
                const event = new MouseEvent('mousedown', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                document.dispatchEvent(event);
            }
        }
        if (item.onClick) {
            item.onClick();
        }
    };

    if (!item) {
        return null;
    }

    return (
        <div className="py-0.5">
            <div
                className={`group flex items-center px-3 py-2 cursor-pointer 
                    text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                    hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-secondary)]
                    rounded-lg transition-all duration-200 
                    ${level > 0 ? 'ml-6' : ''}
                    ${isEmphasized ? 'bg-[var(--bg-emphasized)] font-semibold' : ''}`}
                onClick={handleClick}
            >
                <div className="flex items-center min-w-[24px]">
                    {hasSubMenu ? (
                        <span className={`transform transition-transform duration-200 text-[10px] 
                            text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]
                            ${isOpen ? 'rotate-90' : ''}`}
                        >
                            ▶
                        </span>
                    ) : <span className="w-[10px]" />}
                </div>
                {item.icon && (
                    <span className={`flex items-center justify-center w-5 h-5 mr-3
                        text-[var(--text-secondary)] group-hover:text-[var(--accent-primary)]`}
                    >
                        {item.icon}
                    </span>
                )}
                <Link
                    to={item.to || '#'}
                    onClick={handleClick}
                    className={`flex-auto  text-sm font-medium flex-wrap
                        group-hover:text-[var(--text-primary)]
                        ${isEmphasized ? 'text-[var(--text-emphasized)]' : ''}`}
                        title={item.title}
                >
                    {item.title}
                </Link>
            </div>
            {hasSubMenu && isOpen && (
                <div className={`mt-1 border-l border-[var(--border-primary)]
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

const SidebarNavItem: React.FC<{
    children?: React.ReactNode;
    sidebarNavData?: INavItem[];
    className?: string;
}> = ({ children, sidebarNavData, className = '' }) => {
    return (
        <div className={`py-2 overflow-y-auto ${className}`}>
            {sidebarNavData?.map((item, index) => (
                <TreeViewItem key={index} item={item} />
            ))}
            {children}
        </div>
    );
};

export default React.memo(SidebarNavItem);
