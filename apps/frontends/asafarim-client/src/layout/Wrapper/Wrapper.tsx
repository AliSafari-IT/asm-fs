import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { Stack } from '@fluentui/react';
import MainContent from './MainContent';
import { SidebarWrapper } from './SidebarWrapper';

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
  const pt = pageTitle ? `${pageTitle} | ASafariM` : 'ASafariM';
  if (!footer) {
    footer = <Footer />;
  }
  if (!header) {
    header = <Header />;
  }

  useEffect(() => {
    document.title = pt;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', `${pageDescription}`);
  }, [pageTitle, pageDescription, pt]);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 min-w-[320px]">
        <div className="w-[var(--sidebar-width)] bg-gray-800 border-r border-gray-700">
          <SidebarWrapper sidebar={sidebar} />
        </div>
        <div className="flex flex-col flex-1">
          {header}
          <main className="flex-1 bg-gray-900 p-6">
            {children}
          </main>
          {footer}
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
