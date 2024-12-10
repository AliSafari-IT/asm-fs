import React, { FC } from 'react';

const MainContent: FC<{ children: React.ReactNode, className?: string, style?: React.CSSProperties, header?: React.ReactNode }> = ({ children, className, header }) => {
    return (
        <div className={`${className} flex flex-col flex-1 overflow-y-auto focus:outline-none`}>
            {header}
            {children}
        </div>
    );
};

export default MainContent;