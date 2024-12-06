import React, { useEffect, useState } from 'react';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  pageTitle?: string;
  pageDescription?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
}

const Wrapper: React.FC<LayoutProps> = ({
  pageTitle,
  pageDescription,
  header,
  footer,
  sidebar,
  children
}) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pt = pageTitle ? `${pageTitle} | ASafariM` : 'ASafariM';


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 760);
    handleResize(); // Set the initial state
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    document.title = pt;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `${pageDescription}`);
  }, [pageTitle, pageDescription, pt]);

  useEffect(() => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  }, [isMobile]);

  return (
    <div className="min-h-full">

      {/* Navigation Bar */}
      <Navbar />

      {/* Page Header */}
      <div className="w-fullbg-[var(--bg-primary)] shadow">
        {<Header header={header} />}
      </div>

      {/* Page Content */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <main>{children}</main>
      </div>

      {/* Page Footer */}
      <Footer children={footer} />

      {/* Sidebar */}
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
    </div>
  );
};

export default Wrapper;
