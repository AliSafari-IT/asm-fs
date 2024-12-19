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
            const isToggling = e.detail.isToggling;
            
            if (toggledId !== itemId && 
                !toggledId.startsWith(itemId) && 
                (!toggledParentId || !itemId?.startsWith(toggledParentId)) && 
                !isToggling) {
                setIsOpen(false);
            }
        };

        window.addEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        return () => {
            window.removeEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        };
    }, [itemId]);

    const handleClick = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation(); // Stop bubbling
            if (hasSubMenu) {
                e.preventDefault();
                setIsOpen((prev) => !prev);
                
                // Dispatch event with both itemId and parentId
                const event = new CustomEvent(DROPDOWN_TOGGLE_EVENT, {
                    detail: { 
                        itemId,
                        parentId,
                        isToggling: true 
                    },
                });
                window.dispatchEvent(event);
            } else if (item.to && !item.to.startsWith('#')) {
                navigate(item.to);
            }
            item.onClick?.();
        },
        [hasSubMenu, item.to, itemId, parentId, navigate, item]
    );
    
    useEffect(() => {
        const handleDropdownToggle = (e: CustomEvent) => {
            const toggledId = e.detail.itemId;
    
            // Keep the current dropdown open if it's the parent or a descendant
            if (toggledId === itemId || toggledId.startsWith(itemId)) {
                return;
            }
            setIsOpen(false); // Close only unrelated dropdowns
        };
    
        window.addEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        return () => {
            window.removeEventListener(DROPDOWN_TOGGLE_EVENT, handleDropdownToggle as EventListener);
        };
    }, [itemId]);
    

    return (
        <div className="relative">
            <div
                className={`group flex items-center px-3 py-2 cursor-pointer 
                    text-[var(--text-secondary)] hover:text-[var(--text-primary)]
                    hover:bg-[var(--bg-tertiary)] active:bg-[var(--bg-secondary)]
                    rounded-lg transition-all duration-200 
                    ${level > 0 ? 'pl-4 w-full' : ''}
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
                <span
                    className={`flex-auto whitespace-nowrap text-sm font-medium
                        group-hover:text-[var(--text-primary)]
                        ${isEmphasized ? 'text-[var(--text-emphasized)]' : ''}`}
                    title={item.title}
                >
                    {item.title}
                </span>
            </div>
            {hasSubMenu && isOpen && (
                <div 
                    className={`${level === 0 ? 'navbar-dropdown min-w-[200px]' : 'navbar-submenu'}`}
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

const NavItemComponent: React.FC<{
    children?: React.ReactNode;
    topbarNavData?: INavItem[];
    className?: string;
}> = ({ children, topbarNavData, className = '' }) => {
    // Reset TreeViewItem state when topbarNavData changes
    const [key, setKey] = useState(0);

    useEffect(() => {
        setKey(prev => prev + 1);
    }, [topbarNavData]);

    return (
        <div className={className}>
            {topbarNavData?.map((item, index) => (
                <TreeViewItem 
                    key={`${key}-${index}-${item.id}`} 
                    item={item} 
                />
            ))}
            {children}
        </div>
    );
};

export default NavItemComponent;
