import React from 'react';
import MenuItem from './MenuItem';
import { SubMenuProps } from '../../../../interfaces/dropdown-types';

const SubMenu: React.FC<SubMenuProps> = ({ items, parentId, onMenuClick, onClose }) => {
  return (
    <div
      className="lg:absolute lg:left-full lg:top-0 w-full lg:w-48 bg-[var(--bg-primary)] shadow-lg rounded-md"
      id={parentId}
    >
      {items?.map((item) => (
        <MenuItem
          key={item.id}
          item={item}
          isActive={false}
          onMenuClick={onMenuClick}
          onClose={onClose}
        />
      ))}
    </div>
  );
};

export default SubMenu;