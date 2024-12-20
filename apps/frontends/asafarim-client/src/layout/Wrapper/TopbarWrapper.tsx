// E:\asm-fs\apps\frontends\asafarim-client\src\layout\Wrapper\TopbarWrapper.tsx
import React, { forwardRef } from "react";
import { ResponsiveDropdownMenu } from "../Navbar/components/nested-components";
import useNavItems from "@/hooks/useNavItems";

interface TopbarWrapperProps {
    topbar?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
}

export const TopbarWrapper = forwardRef<HTMLDivElement, TopbarWrapperProps>(
    ({ topbar, children, className = '' }, ref) => {
        const navItems = useNavItems();

        return topbar ? (
            <header 
                ref={ref} 
                className={`bg-[var(--bg-secondary)]
                    border-b border-[var(--border-secondary)]
                    transition-all duration-300 ease-in-out
                    w-full
                    h-16
                    ${className}`}
            >
                {topbar}
            </header>
        ) : (
            <header 
                ref={ref} 
                className={`bg-[var(--bg-secondary)]
                    border-b border-[var(--border-secondary)]
                    transition-all duration-300 ease-in-out
                    w-full
                    h-16
                    ${className}`}
            >
                <div className="flex items-center justify-between h-full px-4">
                    <div className="flex items-center space-x-4">
                        {navItems
                            .filter(item => item?.isForNavbar)
                            .map((item, index) => (
                                <ResponsiveDropdownMenu
                                    key={index}
                                    topbarNavData={[item]}
                                    className="block lg:inline-block"
                                />
                        ))}
                    </div>

                    {/* Right section for additional controls */}
                    <div className="flex items-center space-x-4">
                        {children}
                    </div>
                </div>
            </header>
        );
    }
);

TopbarWrapper.displayName = 'TopbarWrapper';

export default TopbarWrapper;