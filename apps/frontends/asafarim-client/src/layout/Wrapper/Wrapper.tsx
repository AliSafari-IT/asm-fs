import React, { useEffect, useState } from 'react';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import Footer from '../Footer/Footer';
import DefaultHeader from '../DefaultHeader/DefaultHeader';
import Navbar from '../Navbar/Navbar';

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

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ')
// }


const Wrapper: React.FC<LayoutProps> = ({
  header,
  sidebar,
  content,
  pageTitle,
  children,
  pageDescription = 'ASafariM React .Net Core TypeScript Client',
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 760);
    handleResize(); // Set the initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} | ASafariM` : 'ASafariM';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', pageDescription);
  }, [pageTitle, pageDescription]);

  const mainContentStyles = mergeStyles({
    flexGrow: 1,
    padding: '1rem',
  });

  return (
    <>
      <div className="min-h-full">
        <Navbar />
      </div>
      <div >
        {!isMobile && sidebar && (
          <div >{sidebar ?? 'Sidebar'}</div>
        )}
        <div className={mainContentStyles}>
          {header ?? <DefaultHeader />}
          <main>{content ?? children}</main>
        </div>
      </div>
      <Footer />
      {isMobile && sidebar && (
        <Panel
          isLightDismiss
          isOpen={isSidebarOpen}
          onDismiss={() => setIsSidebarOpen(false)}
          closeButtonAriaLabel="Close"
          type={PanelType.smallFixedNear}
          headerText="Menu"
        >
          {sidebar}
        </Panel>
      )}
    </>
  );
};

export default Wrapper;
