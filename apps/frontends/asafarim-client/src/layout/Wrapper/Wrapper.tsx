// E:\asm\apps\dashboard-client\src\layout\Wrapper\Wrapper.tsx
import React, { useEffect, useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { IconButton } from '@fluentui/react/lib/Button';
import Footer from '../Footer/Footer';
import DefaultHeader from '../DefaultHeader/DefaultHeader';
import Navbar from '../Navbar/Navbar';
// import { useTheme } from '../../hooks/useTheme'; // Assuming the useTheme hook is in hooks
import './Wrapper.scss';

interface LayoutProps {
  header?: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  sidebar?: React.ReactNode;
  sidebarClassName?: string;
  navbar?: React.ReactNode;
  navbarClassName?: string;
  contentClassName?: string;
  content?: React.ReactNode;
  contentStyle?: React.CSSProperties;
  sidebarStyle?: React.CSSProperties;
  style?: React.CSSProperties;
  pageTitle?: string;
  pageDescription?: string;
  children?: React.ReactNode;
}

// Wrapper component
const Wrapper: React.FC<LayoutProps> = ({
  header,
  footer,
  className = '',
  sidebar,
  sidebarClassName = '',
  navbar,
  navbarClassName = 'z-50',
  content,
  sidebarStyle = {},
  style = {},
  pageTitle,
  children,
  pageDescription = 'ASafariM React .Net Core TypeScript Client',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Get the current theme (light or dark) using the useTheme hook
  // const { theme } = useTheme();

  // Dynamic styles based on theme
  const sidebarStyles = mergeStyles({
    width: 250,
    // backgroundColor: theme === 'dark' ? '#333333' : '#f3f2f1', // Adjust based on theme
    overflowY: 'auto',
  });

  const navbarStyles = mergeStyles({
    navbarClassName,
  });

  // Detect screen size and update isMobile state
  useEffect(() => {
    const handleResize = () => {
      // You can adjust the breakpoint as needed
      setIsMobile(window.innerWidth <= 361);
    };
    handleResize(); // Set the initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  // Default header, footer, and navbar
  const sidebarBlock = sidebar ?? (
    <div className={sidebarStyles} style={sidebarStyle}>
      Sidebar
    </div>
  );
  const headerBlock = header ?? <DefaultHeader />;
  const footerBlock = footer ?? <Footer />;

  // Modify navbar to include a menu button in mobile view
  const navbarBlock = navbar ?? (
    <Navbar className={`${navbarStyles}`}>
      {isMobile && (
        <IconButton
          iconProps={{ iconName: 'GlobalNavButton' }}
          title="Open Menu"
          ariaLabel="Open Menu"
          onClick={() => setIsSidebarOpen(true)}
        />
      )}
    </Navbar>
  );

  // Page title and description
  const title = `${pageTitle ? `${pageTitle} | ` : ''}ASafariM`;
  const description = pageDescription;
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
  }, [title, description]);

  return (
    <div className={`wrapper ${className}`} style={style}>
      {/* Navbar */}
      {navbarBlock}

      {/* Main Content Area */}
      <Stack horizontal={!isMobile} tokens={{ childrenGap: 0 }} style={{ flexGrow: 1 }}> {/* Make content area take all available space */}

        {/* Sidebar */}
        {!isMobile && sidebar && (
          <Stack.Item disableShrink className={sidebarClassName}>
            {sidebarBlock}
          </Stack.Item>
        )}

        {/* Content Area */}
        <Stack.Item grow className={''}>
          {/* Header */}
          {headerBlock}
          {/* Main Content */}
          <main className={`main-content`}>
            {content ?? children}
          </main>
          {/* Footer */}
          {footerBlock}
        </Stack.Item>
      </Stack>

      {/* Sidebar Panel for Mobile View */}
      {isMobile && (
        <Panel
          isLightDismiss
          isOpen={isSidebarOpen}
          onDismiss={() => setIsSidebarOpen(false)}
          closeButtonAriaLabel="Close"
          type={PanelType.smallFixedNear}
          headerText="Menu"
        >
          {sidebarBlock}
        </Panel>
      )}
    </div>
  );
};

export default Wrapper;
