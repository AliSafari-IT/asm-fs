import { IMenuItem } from "@/interfaces/IMenuItem";
import navItems from "@/layout/Navbar/navItemsList";
import { getMdFiles } from "@/utils/mdFilesUtils";
import {
  Teaching24Regular as IconTeaching,
  ProjectionScreenText24Regular as IconProject,
  PhoneVibrate24Regular as IconContact,
  Board24Regular as IconDashboard,
  Home24Regular as IconHome,
  Person24Regular as IconProfile,
  Accessibility24Regular as IconAccount,
  SignOut24Regular as IconLogout
} from '@fluentui/react-icons';
import { useEffect, useState } from "react";

const useAuthStatus = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const userData = localStorage.getItem('user');
    return !!userData;  // Use !! to ensure boolean
  });

  useEffect(() => {
    // Initial check
    const userData = localStorage.getItem('user');
    setIsAuthenticated(!!userData);

    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      setIsAuthenticated(!!userData);
    };

    // Listen for both storage and custom auth events
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('authStateChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authStateChange', handleStorageChange);
    };
  }, []); // Empty dependency array as we want this to run only once

  // Force check current auth status on every render
  const currentUserData = localStorage.getItem('user');
  if (!!currentUserData !== isAuthenticated) {
    setIsAuthenticated(!!currentUserData);
  }

  return isAuthenticated;
};

const logreg: IMenuItem[] = [
  {
    id: 'login',
    title: 'Login',
    label: 'Login',
    to: '/login',
    icon: <IconProfile />,
  },
  {
    id: 'register',
    title: 'Register',
    label: 'Register',
    to: '/register',
    icon: <IconProfile />,
  },
];

// Home Dropdown
const homeDD: IMenuItem = {
  id: 'home',
  title: 'Home',
  to: '#',
  icon: <IconHome />,
  label: 'Home',
  isForNavbar: true,
  subMenu: [
    {
      id: 'brand-asafarim',
      title: 'ASafariM',
      to: '/',
      className: 'asafarim-brand',
      description: 'ASafariM is a free and open source project for learning web development.',
      icon: <IconTeaching />,
      label: 'ASafariM',
    },
    {
      id: 'about',
      title: 'About',
      to: '/about-asafarim',
      icon: <IconProject />,
      label: 'About',
      description: 'ASafariM is a free and open source project for learning web development.',
      className: '',
    },
    {
      id: 'contact',
      title: 'Contact',
      icon: <IconContact />,
      label: 'Contact',
      description: 'Contact ASafariM for any questions or feedback.',
      subMenu: [
        {
          id: 'contact-us',
          title: 'Contact Us',
          to: '/contact-asafarim',
          icon: <IconContact />,
          label: 'Contact Us',
          description: 'Contact ASafariM for any questions or feedback.',
        },
        {
          id: 'email',
          title: 'Email',
          to: 'mailto:YtK5H@example.com',
          icon: <IconContact />,
          label: 'Email',
        },
        {
          id: 'phone',
          title: 'Phone',
          to: 'tel:123-456-7890',
          icon: <IconContact />,
          label: 'Phone',
        },
      ],
    },
  ],
};

// Dashboard Dropdown
const dashboardDD: IMenuItem = {
  id: 'dashboard',
  title: 'Dashboard',
  label: 'Dashboard',
  isForNavbar: true,
  to: '#',
  icon: <IconDashboard />,
  subMenu: [
    {
      id: 'user-dashboard',
      title: 'Dashboard',
      label: 'Dashboard',
      to: '/dashboard',
      icon: <IconDashboard />,
    },
    {
      id: 'users',
      title: 'Users',
      label: 'Users',
      to: '/users',
      icon: <IconProfile />,
    },
  ],
};

const useNavItems = () => {
  const mdFiles = getMdFiles();
  const isAuthenticated = useAuthStatus();

  useEffect(() => {
    console.log('useNavItems(): isAuthenticated:', isAuthenticated);
  }, [isAuthenticated]);

  // User Account Dropdown - only this needs to change based on auth state
  const userAccountDD: IMenuItem = {
    id: 'user-account',
    isForNavbar: true,
    title: 'Account',
    to: '#',
    icon: <IconAccount />,
    label: 'Account',
    subMenu: isAuthenticated
      ? [
        {
          id: 'logout',
          title: 'Logout',
          label: 'Logout',
          to: '/logout',
          icon: <IconLogout />,
        }
      ]
      : [...logreg]
  };

  // Directly return the computed nav items
  return [
    ...navItems,
    homeDD,
    dashboardDD,
    userAccountDD,
    mdFiles.legalDocs,
    mdFiles.changelogs,
    mdFiles.techDocs,
  ];
};

export default useNavItems;