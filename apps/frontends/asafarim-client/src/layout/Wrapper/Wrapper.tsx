import React, { useEffect } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { SidebarWrapper } from './SidebarWrapper';
import { useTheme } from '../../hooks/useTheme';

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
  const { theme } = useTheme();
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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)] text-gray-100">
      <Navbar />
      <div className="flex flex-1">
        <SidebarWrapper sidebar={sidebar} className="z-10 left-0 max-w-[var(--sidebar-width)]" />
        <div className="flex-1 min-h-[calc(100vh-var(--navbar-height))]">
          <div className="flex flex-col w-full">
            {header}
            <main className="flex-1 w-full">
              <div className="w-full max-w-screen-xl mx-auto px-4">
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
      <div className="w-full">
        {footer}
      </div>
    </div>
  );
};

export default Wrapper;
