import React from 'react';
import { makeStyles } from '@fluentui/react-components';
import { IAlign } from '../../interfaces/IAlign';

const useStyles = makeStyles({
  toolbar: {
    display: 'flex',
    gap: '10px',
    padding: '10px 30px 10px 10px',
    borderBottom: '1px solid #ddd',
  },
  alignLeft: {
    justifyContent: 'flex-start',
  },
  alignCenter: {
    justifyContent: 'center',
  },
  alignRight: {
    justifyContent: 'flex-end',
  },
});

interface ToolbarProps {
  children: React.ReactNode;
  className?: string;
  'aria-label': string;
  align?: IAlign;
}

const Toolbar: React.FC<ToolbarProps> = ({ children, className, align = IAlign.center, ...props }) => {
  const classes = useStyles();

  // Determine alignment class
  const alignmentClass =
    align === IAlign.left
      ? classes.alignLeft
      : align === IAlign.right
      ? classes.alignRight
      : classes.alignCenter;

  return (
    <div
      className={`${classes.toolbar} ${alignmentClass} ${className ?? ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Toolbar;
