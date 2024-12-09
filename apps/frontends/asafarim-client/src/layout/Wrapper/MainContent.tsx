import React, { FC } from 'react';

const MainContent: FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
    return (
        <div className={`${className} flex flex-col flex-1 overflow-y-auto focus:outline-none`}>
            {children}
        </div>
    );
};

export default MainContent;