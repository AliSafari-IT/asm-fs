// src/components/Header.tsx
import React from "react";

interface HeaderProps {
  header?: React.ReactNode;
}

export function Header({ header}: HeaderProps) {

    return (
    <header className="shadow-md">
      <div className="w-full">
          {header}
        </div>
    </header>
  );
}

export default Header;
