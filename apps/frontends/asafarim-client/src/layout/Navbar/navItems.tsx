import {
  Teaching24Regular as IconTeaching,
  ProjectionScreenText24Regular as IconProject,
  PhoneVibrate24Regular as IconContact,
  Board24Regular as IconDashboard,
  Settings24Regular as IconSettings,
  Home24Regular as IconHome,
  Person24Regular as IconProfile,
  Accessibility24Regular as IconAccount,
  Bluetooth28Regular as IconBlog,
  SignOut24Regular as IconLogout

} from '@fluentui/react-icons';
import { IChapter } from '../../interfaces/IChapter';
import { ISection } from '../../interfaces/ISection';
import { IBook } from '../../interfaces/IBook';
import { IMenuItem } from '../../interfaces/IMenuItem';


// Home Dropdown
const homeDD: IMenuItem = {
  id: 'home',
  title: 'Home',
  to: '#',
  icon: <IconHome />,
  label: 'Home',
  subMenu: [
    {
      id: 'brand-asafarim',
      title: 'ASafariM',
      to: '/',
      className: 'asafarim-brand',
      description: 'ASafariM is a free and open source project for learning web development.',
      icon: <IconTeaching />,
      label: 'ASafariM'
    },
    {
      id: 'about',
      title: 'About',
      to: '/about-asafarim',
      icon: <IconProject />,
      label: 'About',
      subMenu: [],
      description: 'ASafariM is a free and open source project for learning web development.',
      name: 'About',
      className: ''
    },
    {
      id: 'contact',
      title: 'Contact',
      to: '/contact-asafarim',
      icon: <IconContact />,
      label: 'Contact',
      description: 'Contact ASafariM for any questions or feedback.',
      name: 'Contact',
      className: '',
      subMenu: [
        {
          id: 'email',
          title: 'Email',
          to: 'mailto:YtK5H@example.com',
          icon: <IconContact />,
          label: 'Email',
          subMenu: [],
          description: 'Email ASafariM for any questions or feedback.',
          name: 'Email',
          className: ''
        },
        {
          id: 'phone',
          title: 'Phone',
          to: 'tel:123-456-7890',
          icon: <IconContact />,
          label: 'Phone',
          subMenu: [],
          description: 'Call ASafariM for any questions or feedback.',
          name: 'Phone',
          className: ''
        },
      ]
    },
  ]
};

// Dashboard Dropdown
const dashboardDD: IMenuItem = {
  id: 'dashboard',
  title: 'Dashboard',
  label: 'Dashboard',
  to: '#',
  icon: <IconDashboard />,
  className: '',
  style: {},
  subMenu: [
    {
      id: 'user-dashboard',
      title: 'Dashboard',
      label: 'Dashboard',
      to: '/dashboard',
      icon: <IconDashboard />,
      className: '',
      style: {},
      subMenu: []
    },
    {
      id: 'auth',
      title: 'Account',
      label: 'Account',
      to: '#',
      icon: <IconAccount />,
      className: '',
      style: {},
      subMenu: [
        {
          id: 'logout',
          title: 'Logout',
          label: 'Logout',
          to: '/logout',
          icon: <IconLogout />,
          className: '',
          style: {},
          subMenu: []
        },
        {
          id: 'login',
          title: 'Login',
          label: 'Login',
          to: '/login',
          icon: <IconProfile />,
          className: '',
          style: {},
          subMenu: []
        },
        {
          id: 'register',
          title: 'Register',
          label: 'Register',
          to: '/register',
          icon: <IconProfile />,
          className: '',
          style: {},
          subMenu: []
        },
      ]
    },
    {
      id: 'settings',
      title: 'Settings',
      label: 'Settings',
      to: '#',
      icon: <IconSettings />,
      className: '',
      style: {},
      subMenu: [
        {
          id: 'account-settings',
          title: 'Account Settings',
          label: 'Account Settings',
          to: '/user-account-settings',
          icon: <IconSettings />,
          className: '',
          style: {},
          subMenu: []
        },
        {
          id: 'user-profile',
          title: 'User Profile',
          label: 'User Profile',
          to: '/user-profile',
          icon: <IconProfile />,
          className: '',
          style: {},
          subMenu: [
            {
              id: 'profile-security',
              title: 'Security Settings',
              label: 'Security Settings',
              to: '/user-profile/security',
              icon: <IconSettings />,
              className: '',
              style: {},
              subMenu: []
            },
            {
              id: 'profile-privacy',
              title: 'Privacy Settings',
              label: 'Privacy Settings',
              to: '/user-profile/privacy',
              icon: <IconSettings />,
              className: '',
              style: {},
              subMenu: []
            },
            {
              id: 'profile-notifications',
              title: 'Notification Settings',
              label: 'Notification Settings',
              to: '/user-profile/notifications',
              icon: <IconSettings />,
              className: '',
              style: {},
              subMenu: []
            },
          ]
        },
        {
          id: 'advanced-settings',
          title: 'Advanced Settings',
          label: 'Advanced Settings',
          to: '/advanced-settings',
          icon: <IconSettings />,
          className: '',
          style: {},
          subMenu: [
            {
              id: 'system-settings',
              title: 'System Settings',
              label: 'System Settings',
              to: '/system-settings',
              icon: <IconSettings />,
              className: '',
              style: {},
              subMenu: [
                {
                  id: 'backup-settings',
                  title: 'Backup Settings',
                  label: 'Backup Settings',
                  to: '/backup-settings',
                  icon: <IconSettings />,
                  className: '',
                  style: {},
                  subMenu: []
                },
              ]
            },
          ]
        },
      ]
    },
  ]
}
;

const mdChapters: IChapter[] = [
  {
    id: 'tailwind-intro',
    title: 'Introduction to Tailwind CSS',
    to: '#',
    description: 'Learn the basics of Tailwind CSS and how it simplifies styling.',
    icon: <IconTeaching />,
    docs: [
      { id: 'what-is-tailwind', title: 'What is Tailwind CSS?', to: '/md/learning/tailwind/intro', icon: <IconTeaching /> },
      { id: 'install-tailwind', title: 'Installing Tailwind in React', to: '/md/learning/tailwind/install', icon: <IconTeaching /> },
      { id: 'tailwind-utility', title: 'Understanding Utility Classes', to: '/md/learning/tailwind/utility', icon: <IconTeaching /> },
    ],
  },
  {
    id: 'react-integration',
    title: 'Integrating Tailwind with React',
    to: '#',
    description: 'Learn how to set up Tailwind CSS with React and make the most of its features.',
    icon: <IconTeaching />,
    docs: [
      { id: 'create-react-app', title: 'Using Tailwind with Create React App', to: '/md/learning/react/create-react-app', icon: <IconTeaching /> },
      { id: 'vite-react', title: 'Using Tailwind with Vite', to: '/md/learning/react/vite', icon: <IconTeaching /> },
      { id: 'postcss-setup', title: 'Configuring PostCSS for Tailwind', to: '/md/learning/react/postcss', icon: <IconTeaching /> },
    ],
  },
  {
    id: 'responsive-design',
    title: 'Building Responsive Layouts',
    to: '#',
    description: 'Learn how to use Tailwind CSS to create responsive layouts.',
    icon: <IconTeaching />,
    docs: [
      { id: 'responsive-grid', title: 'Responsive Grid System', to: '/md/learning/tailwind/grid', icon: <IconTeaching /> },
      { id: 'breakpoints', title: 'Using Tailwind Breakpoints', to: '/md/learning/tailwind/breakpoints', icon: <IconTeaching /> },
      { id: 'flexbox-layout', title: 'Building with Flexbox', to: '/md/learning/tailwind/flexbox', icon: <IconTeaching /> },
    ],
  },
  {
    id: 'tailwind-components',
    title: 'Reusable Tailwind Components',
    to: '#',
    description: 'How to create reusable components in React with Tailwind CSS.',
    icon: <IconTeaching />,
    docs: [
      { id: 'navbar', title: 'Responsive Navbar', to: '/md/components/navbar', icon: <IconProject /> },
      { id: 'buttons', title: 'Custom Button Styles', to: '/md/components/buttons', icon: <IconProject /> },
      { id: 'cards', title: 'Card Layouts', to: '/md/components/cards', icon: <IconProject /> },
      { id: 'dropdowns', title: 'Dynamic Dropdowns', to: '/md/components/dropdowns', icon: <IconProject /> },
    ],
  },
];

const mdSections: ISection[] = [
  {
    id: 'setup-and-intro',
    title: 'Setup and Basics',
    icon: <IconTeaching />,
    chapters: [mdChapters[0], mdChapters[1]],
    to: '#',
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design Techniques',
    icon: <IconTeaching />,
    chapters: [mdChapters[2]],
    to: '#',
  },
  {
    id: 'components',
    title: 'Component Design with Tailwind',
    icon: <IconTeaching />,
    chapters: [mdChapters[3]],
    to: '#',
  },
];

const mdBooks: IBook[] = [
  {
    id: 'react-tailwind-guide',
    title: 'Building Responsive Apps with React and Tailwind',
    icon: <IconTeaching />,
    sections: mdSections,
    topics: [
      { id: 'tailwind-vs-css', title: 'Tailwind vs Traditional CSS', to: '/md/learning/tailwind-vs-css', icon: <IconTeaching /> },
      { id: 'best-practices', title: 'Best Practices in Tailwind', to: '/md/learning/tailwind-best-practices', icon: <IconTeaching /> },
    ],
  },
];

const blog: IChapter = {
  id: 'blog',
  title: 'Blog',
  className: '',
  description: '',
  label: 'Blog',
  style: {},
  name: 'asafarim-blog',
  to: '//https://techdocs.asafarim.com/blog',
  icon: <IconBlog />,
  docs: [],
};


const navItems = {
  homeDropDown: homeDD,
  blog,
  techdocs: { id: 'techdocs', title: 'Tech Docs', to: '#', url: '//techdocs.asafarim.com', icon: <IconTeaching /> } as IChapter,
  books: { id: 'books', title: 'Books', to: '#', icon: <IconTeaching />, docs: mdBooks } as IChapter,
  dashboardDropDown: dashboardDD,

};

export default navItems;
