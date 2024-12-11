import React, { useEffect, useState, useRef } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import { SidebarWrapper } from './SidebarWrapper';
import { useTheme } from '../../hooks/useTheme';
import MainContent from './MainContent';

interface LayoutProps {
  pageTitle?: string;
  pageDescription?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  sidebar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

const Wrapper: React.FC<LayoutProps> = ({
  pageTitle,
  pageDescription,
  header,
  footer,
  sidebar,
  children,
  className
}) => {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMobileMenuOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <div className={`flex flex-col min-h-screen bg-gradient-to-b from-[var(--bg-start)] to-[var(--bg-end)] text-[var(--text-primary)] ${className}`}>
      <Navbar>
        <button
          ref={buttonRef}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg hover:bg-[var(--hover-bg)] -ml-2"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6 stroke-[var(--text-primary)]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </Navbar>
      <SidebarWrapper 
        ref={sidebarRef}
        sidebar={sidebar} 
        className={`fixed top-[var(--navbar-height)] left-0 w-64 z-50 transition-transform duration-300 ease-in-out bg-[var(--bg-secondary)] border-r border-[var(--border-color)] ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`} 
      />
      <div className="flex flex-1">
        {/* <SidebarWrapper sidebar={sidebar} className="hidden md:block" /> */}
        <MainContent className="flex-1 flex flex-col bg-[var(--bg-primary)]" header={header}>
          {children}
        </MainContent>
      </div>
      {footer}
    </div>
  );
};

export default Wrapper;
