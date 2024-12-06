import React from "react";
import { Link } from "react-router-dom";
import { INavItem } from "../../../interfaces/INavItem";

const MenuItem: React.FC<INavItem> = ({ to, icon, title, onClick, className }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex justify-items-center  size-2xl space-x-2  hover:space-x-4 ${className}`}
    >
      {icon && <span className="mr-1">{icon}</span>}
      <span className="font-semibold align-top">{title}</span>
    </Link>
  );
};

export default MenuItem;
