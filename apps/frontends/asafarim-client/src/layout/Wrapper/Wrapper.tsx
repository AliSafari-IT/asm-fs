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
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      {header}
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex gap-4">
            <aside className="w-64 flex-shrink-0">
              <SidebarWrapper sidebar={sidebar} />
            </aside>
            <div className="flex-grow">
              {children}
            </div>
          </div>
        </div>
      </main>
      {footer}
    </div>
  );
};

export default Wrapper;
