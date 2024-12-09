import React from "react";
import { Link } from "react-router-dom";
import { INavItem } from "../../../interfaces/INavItem";

const MenuItem: React.FC<INavItem> = ({ to, icon, title, onClick, className }) => {
  return (
    <Link
      to={`${to}`}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 ${className}`}
    >
      {icon && <span>{icon}</span>}
      <span>{title}</span>
    </Link>
  );
};

export default MenuItem;
