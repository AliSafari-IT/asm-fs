import {
  Teaching24Regular as IconTeaching,
  ProjectionScreenText24Regular as IconProject,
  PersonCircle24Regular as IconAbout,
  PhoneVibrate24Regular as IconContact,
  Board24Regular as IconDashboard,
  Settings24Regular as IconSettings,
  Info28Regular as IconInfo,
  Home24Regular as IconHome,
  Person24Regular as IconProfile,
} from '@fluentui/react-icons';
import { INavItem } from '../../interfaces/INavItel';

export const navItems: INavItem[] = [
  { id: 'home', title: 'Home', to: '/', aligned: 'left', icon: <IconHome /> },
  { id: 'projects', title: 'Projects', to: '/projects', aligned: 'left', icon: <IconProject /> },
  { id: 'about', title: '', to: '#', aligned: 'left', icon: <IconInfo /> },
  { id: 'about-asafarim', title: 'About', parentId: 'about', to: '/about', aligned: 'left', icon: <IconAbout /> },
  { id: 'contact', title: 'Contact', parentId: 'about', to: '/contact', aligned: 'right', icon: <IconContact /> },
  { id: 'dashboard', title: 'Dashboard', to: '#', aligned: 'right', icon: <IconDashboard /> },
  { id: 'settings', title: 'Settings', parentId: 'dashboard', aligned: 'inherited', icon: <IconSettings /> },
  { id: 'profile', title: 'Profile', parentId: 'dashboard', aligned: 'inherited', icon: <IconProfile /> },
  { id: 'techdocs', title: 'Tech Docs', to: '//techdocs.asafarim.com', aligned: 'left', icon: <IconTeaching /> },
  { id: 'login', title: 'Login', to: '/login', aligned: 'right', icon: <IconProfile /> },
  { id: 'register', title: 'Register', to: '/register', aligned: 'right', icon: <IconProfile /> },
  { id: 'logout', title: 'Logout', to: '/logout', aligned: 'right', icon: <IconProfile /> },
  { id: 'profile', title: 'Profile', to: '/profile', aligned: 'right', icon: <IconProfile /> },
  { id: 'settings', title: 'Settings', to: '/settings', aligned: 'right', icon: <IconSettings /> },
];
