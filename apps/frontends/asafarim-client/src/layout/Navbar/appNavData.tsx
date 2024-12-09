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
  SignOut24Regular as IconLogout,
  LearningApp24Regular as IconLearning

} from '@fluentui/react-icons';
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
};

// React Tailwind Dropdown
const reactTailwind: IMenuItem =
{
  id: 'react-tailwind-guide',
  title: 'Building Responsive Apps with React and Tailwind',
  icon: <IconTeaching />,
  to: '#',
  depth: 0,
  description: 'A comprehensive guide to building responsive apps with React and Tailwind CSS.',
  label: 'Building Responsive Apps with React and Tailwind',
  style: {},
  name: 'react-tailwind-guide',
  onClick: () => { },
  subMenu: [
    {
      id: "setup-and-intro",
      title: "Setup and Basics",
      label: "Setup and Basics",
      to: "#",
      icon: <IconTeaching />,
      description: "Explore Setup and Basics",
      subMenu: [
        {
          id: "tailwind-intro",
          title: "Introduction to Tailwind CSS",
          label: "Introduction to Tailwind CSS",
          to: "#",
          icon: <IconTeaching />,
          description: "Learn the basics of Tailwind CSS and how it simplifies styling.",
          subMenu: [
            { id: "what-is-tailwind", title: "What is Tailwind CSS?", label: "What is Tailwind CSS?", to: "/md/learning/tailwind/intro", icon: <IconTeaching />, description: undefined },
            { id: "install-tailwind", title: "Installing Tailwind in React", label: "Installing Tailwind in React", to: "/md/learning/tailwind/install", icon: <IconTeaching />, description: undefined },
            { id: "tailwind-utility", title: "Understanding Utility Classes", label: "Understanding Utility Classes", to: "/md/learning/tailwind/utility", icon: <IconTeaching />, description: undefined },
          ],
        },
        {
          id: "react-integration",
          title: "Integrating Tailwind with React",
          label: "Integrating Tailwind with React",
          to: "#",
          icon: <IconTeaching />,
          description: "Learn how to set up Tailwind CSS with React and make the most of its features.",
          subMenu: [
            { id: "create-react-app", title: "Using Tailwind with Create React App", label: "Using Tailwind with Create React App", to: "/md/learning/react/create-react-app", icon: <IconTeaching />, description: undefined },
            { id: "vite-react", title: "Using Tailwind with Vite", label: "Using Tailwind with Vite", to: "/md/learning/react/vite", icon: <IconTeaching />, description: undefined },
            { id: "postcss-setup", title: "Configuring PostCSS for Tailwind", label: "Configuring PostCSS for Tailwind", to: "/md/learning/react/postcss", icon: <IconTeaching />, description: undefined },
          ],
        },
      ],
    },
    {
      id: "responsive-design",
      title: "Responsive Design Techniques",
      label: "Responsive Design Techniques",
      to: "#",
      icon: <IconTeaching />,
      description: "Explore Responsive Design Techniques",
      subMenu: [
        {
          id: "responsive-design",
          title: "Building Responsive Layouts",
          label: "Building Responsive Layouts",
          to: "#",
          icon: <IconTeaching />,
          description: "Learn how to use Tailwind CSS to create responsive layouts.",
          subMenu: [
            { id: "responsive-grid", title: "Responsive Grid System", label: "Responsive Grid System", to: "/md/learning/tailwind/grid", icon: <IconTeaching />, description: undefined },
            { id: "breakpoints", title: "Using Tailwind Breakpoints", label: "Using Tailwind Breakpoints", to: "/md/learning/tailwind/breakpoints", icon: <IconTeaching />, description: undefined },
            { id: "flexbox-layout", title: "Building with,Flexbox", label: "Building with Flexbox", to: "/md/learning/tailwind/flexbox", icon: <IconTeaching />, description: undefined },
          ],
        },
      ],
    },
    {
      id: "components",
      title: "Component Design with Tailwind",
      label: "Component Design with Tailwind",
      to: "#",
      icon: <IconTeaching />,
      description: "Explore Component Design with Tailwind",
      subMenu: [
        {
          id: "tailwind-components",
          title: "Reusable Tailwind Components",
          label: "Reusable Tailwind Components",
          to: "#",
          icon: <IconTeaching />,
          description: "How to create reusable components in React with Tailwind CSS.",
          subMenu: [
            { id: "navbar", title: "Responsive Navbar", label: "Responsive Navbar", to: "/md/components/navbar", icon: <IconProject />, description: undefined },
            { id: "buttons", title: "Custom Button Styles", label: "Custom Button Styles", to: "/md/components/buttons", icon: <IconProject />, description: undefined },
            { id: "cards", title: "Card Layouts", label: "Card Layouts", to: "/md/components/cards", icon: <IconProject />, description: undefined },
            { id: "dropdowns", title: "Dynamic Dropdowns", label: "Dynamic Dropdowns", to: "/md/components/dropdowns", icon: <IconProject />, description: undefined },
          ],
        },
      ],
    },
  ]
};

const learningResources: IMenuItem = {
  id: 'learning-resources',
  title: 'Learning Resources',
  to: '#',
  icon: <IconLearning />,
  label: 'Learning Resources',
  subMenu: [
    {
      id: 'interactive-tutorials',
      title: 'Interactive Tutorials',
      to: '#',
      icon: <IconTeaching />,
      label: 'Interactive Tutorials',
      subMenu: [
        {
          id: 'beginner-path',
          title: 'Beginner Path',
          to: '/tutorials/beginner',
          icon: <IconProject />,
          label: 'Beginner Path',
          subMenu: [
            {
              id: 'html-basics',
              title: 'HTML Fundamentals',
              to: '/tutorials/beginner/html',
              icon: <IconTeaching />,
              label: 'HTML Fundamentals'
            },
            {
              id: 'css-basics',
              title: 'CSS Styling',
              to: '/tutorials/beginner/css',
              icon: <IconTeaching />,
              label: 'CSS Styling'
            }
          ]
        },
        {
          id: 'advanced-path',
          title: 'Advanced Path',
          to: '/tutorials/advanced',
          icon: <IconProject />,
          label: 'Advanced Path',
          subMenu: [
            {
              id: 'react-patterns',
              title: 'React Design Patterns',
              to: '/tutorials/advanced/react-patterns',
              icon: <IconTeaching />,
              label: 'React Design Patterns'
            },
            {
              id: 'state-management',
              title: 'State Management',
              to: '/tutorials/advanced/state',
              icon: <IconTeaching />,
              label: 'State Management'
            }
          ]
        }
      ]
    },
    {
      id: 'practice-projects',
      title: 'Practice Projects',
      to: '#',
      icon: <IconProject />,
      label: 'Practice Projects',
      subMenu: [
        {
          id: 'frontend-projects',
          title: 'Frontend Projects',
          to: '/projects/frontend',
          icon: <IconProject />,
          label: 'Frontend Projects',
          subMenu: [
            {
              id: 'responsive-portfolio',
              title: 'Responsive Portfolio',
              to: '/projects/frontend/portfolio',
              icon: <IconProject />,
              label: 'Responsive Portfolio'
            },
            {
              id: 'dashboard-app',
              title: 'Dashboard App',
              to: '/projects/frontend/dashboard',
              icon: <IconDashboard />,
              label: 'Dashboard App'
            }
          ]
        },
        {
          id: 'fullstack-projects',
          title: 'Full Stack Projects',
          to: '/projects/fullstack',
          icon: <IconProject />,
          label: 'Full Stack Projects',
          subMenu: [
            {
              id: 'blog-platform',
              title: 'Blog Platform',
              to: '/projects/fullstack/blog',
              icon: <IconBlog />,
              label: 'Blog Platform'
            },
            {
              id: 'auth-system',
              title: 'Authentication System',
              to: '/projects/fullstack/auth',
              icon: <IconAccount />,
              label: 'Authentication System'
            }
          ]
        }
      ]
    },
    {
      id: 'community',
      title: 'Community',
      to: '#',
      icon: <IconContact />,
      label: 'Community',
      subMenu: [
        {
          id: 'discussion-forums',
          title: 'Discussion Forums',
          to: '/community/forums',
          icon: <IconContact />,
          label: 'Discussion Forums'
        },
        {
          id: 'code-reviews',
          title: 'Code Reviews',
          to: '/community/code-reviews',
          icon: <IconProject />,
          label: 'Code Reviews'
        }
      ]
    }
  ]
};

const learningProjects: IMenuItem = {
  id: 'learning',
  title: 'Learning Projects',
  className: '',
  description: '',
  label: 'Learn',
  style: {},
  name: 'asafarim-learning-projects',
  to: '#',
  icon: <IconLearning />,
  subMenu: [
    reactTailwind,
    learningResources
  ],
};

const blog: IMenuItem = {
  id: 'blog',
  title: 'Blog',
  className: '',
  description: '',
  label: 'Blog',
  style: {},
  name: 'asafarim-blog',
  to: 'https://techdocs.asafarim.com/blog/',
  icon: <IconBlog />,
  subMenu: [],
};

const techDocs: IMenuItem = {
  id: 'techdocs',
  title: 'Tech Docs',
  to: 'techdocs.asafarim.com',
  className: '',
  style: {},
  name: 'asafarim-tech-docs',
  description: '',
  icon: <IconTeaching />,
  label: 'Tech Docs',
  subMenu: []
};

const navItems = [
  homeDD,
  blog,
  techDocs,
  learningProjects,
  dashboardDD,
];

const appNavData = {
  navbar: [homeDD, blog, dashboardDD],
  sidebar: [techDocs, learningProjects],
  navItems
}; 

export default appNavData;
