import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { MenuItemProps } from '../../../../interfaces/dropdown-types';
import SubMenu from './SubMenu';

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive, onMenuClick, onClose }) => {
  const hasChildren = item.subMenu && item.subMenu.length > 0;

  return (
    <div key={item.id} className="relative">
      {item.to ? (
        <Link
          to={item.to}
          className="block px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]"
          onClick={onClose}
        >
          {item.title}
        </Link>
      ) : (
        <button
          className="w-full text-left px-4 py-2 text-sm hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] flex items-center justify-between"
          onClick={() => onMenuClick(item.id)}
        >
          {item.title}
          {hasChildren && (
            <FontAwesomeIcon
              icon={isActive ? faChevronDown : faChevronRight}
              className="ml-2"
            />
          )}
        </button>
      )}

      {hasChildren && isActive && (
        <SubMenu
          items={item.subMenu || []}
          parentId={item.id}
          onMenuClick={onMenuClick}
          onClose={onClose}
        />
      )}
    </div>
  );
};

export default MenuItem;