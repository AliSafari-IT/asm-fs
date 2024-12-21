import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { INavItem } from '../../interfaces/INavItem';

// Create a custom event for dropdown state management
const DROPDOWN_TOGGLE_EVENT = 'navbar-dropdown-toggle';

const TreeViewItem: React.FC<{ 
    item: INavItem, 
    level?: number,
    parentId?: string 
}> = ({ 
    item, 
    level = 0,
    parentId 
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubMenu = item.subMenu && item.subMenu.length > 0;
    const isEmphasized = item.className?.includes('emphasized');
    const navigate = useNavigate();
    const itemId = parentId ? `${parentId}-${item.title}` : item.title;

    // Handle closing dropdown when another one is opened
    useEffect(() => {
        const handleDropdownToggle = (e: CustomEvent) => {
            const toggledId = e.detail.itemId;
            const toggledParentId = e.detail.parentId;
            
            // Only close if:
            // 1. This item is not the toggled item
            // 2. This item is not a parent of the toggled item
            // 3. This item is not a child of the toggled item
            if (toggledId !== itemId && 
                !toggledId.startsWith(itemId) && 
                (!toggledParentId || !itemId?.startsWith(toggledParentId))) {
                setIsOpen(false);
            }
        };

        window.addEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        return () => {
            window.removeEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        };
    }, [itemId]);

    const handleClick = useCallback((e: React.MouseEvent) => {
        if (hasSubMenu) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
            // Dispatch custom event when dropdown is toggled
            const event = new CustomEvent(DROPDOWN_TOGGLE_EVENT, {
                detail: { 
                    itemId,
                    parentId
                }
            });
            window.dispatchEvent(event);
        } else {
            if (item.to && !item.to.startsWith('#')) {
                e.preventDefault();
                navigate(item.to);
            }
        }
        if (item.onClick) {
            item.onClick();
        }
    }, [hasSubMenu, isOpen, itemId, parentId, item, navigate]);

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
                    className={`flex-auto text-sm font-medium flex-wrap
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
                        <TreeViewItem 
                            key={index} 
                            item={subItem} 
                            level={level + 1} 
                            parentId={itemId}
                        />
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
