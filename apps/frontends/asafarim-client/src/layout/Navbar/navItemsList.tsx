// E:\asm-fs\apps\frontends\asafarim-client\src\layout\Navbar\navItemsList.tsx
import {
  Teaching24Regular as IconTeaching,
  ProjectionScreenText24Regular as IconProject,
  Bluetooth28Regular as IconBlog,
  LearningApp24Regular as IconLearning
} from '@fluentui/react-icons';
import { IChapter } from '../../interfaces/IChapter';
import { IMenuItem } from '../../interfaces/IMenuItem';
import { INavItem } from '../../interfaces/INavItem';
import { getMdFiles } from '@/utils/mdFilesUtils';

const mdChapters: INavItem[] = [
  {
    id: 'tailwind-intro',
    title: 'Introduction to Tailwind CSS',
    to: '#',
    description: 'Learn the basics of Tailwind CSS and how it simplifies styling.',
    icon: <IconTeaching />,
    label: 'Introduction to Tailwind CSS',
    name: 'tailwind-intro',
    style: {},
    className: 'tailwind-intro',
    subMenu: [
      {
        id: 'what-is-tailwind', title: 'What is Tailwind CSS?',
        className: 'what-is-tailwind',
        label: 'What is Tailwind CSS?',
        name: 'what-is-tailwind',
        onClick: () => { },
        style: {},
        description: undefined,
        to: '/md/learning/tailwind/intro', icon: <IconTeaching />
      },
      {
        id: 'install-tailwind', title: 'Installing Tailwind in React',
        to: '/md/learning/tailwind/install',
        icon: <IconTeaching />,
        label: 'Installing Tailwind in React',
        name: 'install-tailwind',
        style: {},
        className: 'install-tailwind',
        description: undefined
      },
      {
        id: 'tailwind-utility', title: 'Understanding Utility Classes',
        to: '/md/learning/tailwind/utility',
        icon: <IconTeaching />,
        label: 'Understanding Utility Classes',
        name: 'tailwind-utility',
        style: {},
        className: 'tailwind-utility',
        description: undefined
      },
    ],
  },
  {
    id: 'react-integration',
    title: 'Integrating Tailwind with React',
    to: '#',
    description: 'Learn how to set up Tailwind CSS with React and make the most of its features.',
    icon: <IconTeaching />,
    label: 'Integrating Tailwind with React',
    name: 'react-integration',
    style: {},
    className: 'react-integration',
    subMenu: [
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
    label: 'Building Responsive Layouts',
    name: 'responsive-design',
    style: {},
    className: 'responsive-design',
    subMenu: [
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
    label: 'Reusable Tailwind Components',
    name: 'tailwind-components',
    style: {},
    className: 'tailwind-components',
    subMenu: [
      { id: 'navbar', title: 'Responsive Navbar', to: '/md/components/navbar', icon: <IconProject /> },
      { id: 'buttons', title: 'Custom Button Styles', to: '/md/components/buttons', icon: <IconProject /> },
      { id: 'cards', title: 'Card Layouts', to: '/md/components/cards', icon: <IconProject /> },
      { id: 'dropdowns', title: 'Dynamic Dropdowns', to: '/md/components/dropdowns', icon: <IconProject /> },
    ],
  }
];

const mdSections: INavItem[] = [
  {
    id: 'setup-and-intro',
    title: 'Setup and Basics',
    description: 'Learn the basics of Tailwind CSS and its setup',
    label: 'Setup and Basics',
    name: 'setup-and-intro',
    className: '',
    style: {},
    icon: <IconTeaching />,
    subMenu: [mdChapters[0], mdChapters[1]],
    to: '#',
  },
  {
    id: 'responsive-design',
    title: 'Responsive Design Techniques',
    description: 'Learn how to create responsive layouts with Tailwind CSS',
    label: 'Responsive Design',
    name: 'responsive-design',
    className: '',
    style: {},
    icon: <IconTeaching />,
    subMenu: [mdChapters[2]],
    to: '#',
  },
  {
    id: 'components',
    title: 'Component Design with Tailwind',
    description: 'Mastering reusable components in React with Tailwind CSS',
    label: 'Components',
    name: 'components',
    className: '',
    style: {},
    icon: <IconTeaching />,
    subMenu: [mdChapters[3]],
    to: '#',
  },
];

const mdBooks: INavItem[] = [
  {
    id: 'react-tailwind-guide',
    title: 'Building Responsive Apps with React and Tailwind',
    icon: <IconTeaching />,
    subMenu: mdSections,
    topics: [
      { id: 'tailwind-vs-css', title: 'Tailwind vs Traditional CSS', to: '/md/learning/tailwind-vs-css', icon: <IconTeaching />, description: undefined, name: 'tailwind-vs-css' },
      { id: 'best-practices', title: 'Best Practices in Tailwind', to: '/md/learning/tailwind-best-practices', icon: <IconTeaching />, description: undefined, name: 'best-practices' },
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

const techdocs: IMenuItem = {
  id: 'techdocs',
  title: 'Tech Docs',
  className: '',
  description: '',
  label: 'Tech Docs',
  style: {},
  name: 'asafarim-techdocs',
  to: '//techdocs.asafarim.com',
  icon: <IconTeaching />,
  isForNavbar: true,

  subMenu: [],
};

const books: IMenuItem = {
  id: 'books',
  title: 'Books',
  className: '',
  description: '',
  label: 'Books',
  style: {},
  isForNavbar: true,

  name: 'asafarim-books',
  to: '//books.asafarim.com',
  icon: <IconTeaching />,
  subMenu: [],
};

const learn: IMenuItem = {
  id: 'learning',
  isForNavbar: false,
  title: 'Learning Projects',
  className: '',
  description: '',
  label: 'Learn',
  style: {},
  name: 'asafarim-learning-projects',
  to: '#',
  icon: <IconLearning />,
  subMenu: mdBooks,
};

const mdFiles = getMdFiles();

const navItems: IMenuItem[] = [
  blog,
  techdocs,
  books,
  learn,
  mdFiles.legalDocs,
  mdFiles.changelogs,
  mdFiles.techDocs,
];

export default navItems;
