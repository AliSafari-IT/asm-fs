// E:\asm\apps\dashboard-client\src\components\Toolbar.tsx

import React from 'react';
import { makeStyles } from '@fluentui/react-components';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    gap: '10px',
    paddingRight: '30px',
    borderBottom: '1px solid #ddd', 
  },
});

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className, ...props }) => {
  const classes = useStyles();
  
  return (
    <div className={`${classes.toolbar} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Toolbar;
