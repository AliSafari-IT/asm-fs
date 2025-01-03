import { IStackGroup, IStackItem } from "../../../interfaces/IStack";

export const stackData: IStackGroup = {
  // Backend Technologies
  backend: [
    {
      slug: 'csharp-aspnet-core',
      name: 'CSharp ASP.Net Core',
      description: 'Harness the power of C# and .NET Core to architect scalable backend solutions.',
      color: '#7B61FF', textColor: '#FFFFFF'
    },
    {
      slug: 'restful-api',
      name: 'Restful API',
      description: 'Craft seamless API experiences with ASP.NET Core and SignalR for real-time magic.',
      color: '#512BD4', textColor: '#FFFFFF'
    },
    {
      slug: 'clean-architecture',
      name: 'Clean Architecture',
      description: 'Engineer maintainable systems with Clean Architecture principles at the core.',
      color: '#FF5733', textColor: '#FFFFFF'
    },
    {
      slug: 'sql-mysql-and-nosql-mongodb',
      name: 'SQL (MySQL) and NoSQL (MongoDB)', description: 'Master data manipulation with SQL and NoSQL for robust data strategies.', color: '#4CAF50', textColor: '#FFFFFF'
    },
    {
      slug: 'end-to-end-testing',
      name: 'End-to-End Testing', description: 'Elevate software quality with comprehensive end-to-end testing frameworks.', color: '#FFC107', textColor: '#000000'
    },
  ] as unknown as IStackItem[],
  // Frontend Frameworks and Libraries
  frontend: [
    {
      slug: 'react-typescript',
      name: 'React TypeScript',
      description: 'Build dynamic interfaces with React and TypeScript for type-safe development.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'html-css',
      name: 'HTML/CSS',
      description: 'Design stunning web pages with the foundational duo of HTML and CSS.',
      color: '#FF9800', textColor: '#000000'
    },
    {
      slug: 'git',
      name: 'Git',
      description: 'Collaborate effortlessly with Git, the cornerstone of version control.',
      color: '#FF5722', textColor: '#FFFFFF'
    },
  ] as IStackItem[],
  // UI Frameworks
  uiFrameworks: [
    {
      slug: 'tailwind-css',
      name: 'Tailwind CSS',
      description: 'Transform your UI with Tailwind CSS, crafting responsive designs effortlessly.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'php-laravel',
      name: 'PHP and Laravel',
      description: 'Develop dynamic applications with PHP and Laravel, the robust backend duo.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'nodejs',
      name: 'Node.js',
      description: 'Create efficient server-side solutions with Node.js, leveraging non-blocking I/O.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'angular',
      name: 'Angular',
      description: 'Deliver powerful SPAs with Angular, a framework for dynamic web applications.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'fluent-ui',
      name: 'Fluent UI',
      description: 'Craft modern interfaces with Fluent UI, embracing Microsoft’s design language.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'bootstrap',
      name: 'Bootstrap',
      description: 'Rapidly prototype responsive sites with Bootstrap’s extensive toolkit.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'material-ui',
      name: 'Material UI',
      description: 'Implement sleek designs with Material UI, inspired by Google’s design philosophy.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'syncfusion',
      name: 'Syncfusion',
      description: 'Enhance applications with Syncfusion’s comprehensive UI component suite.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
  ] as IStackItem[],
  // Data Analysis
  dataAnalysis: [
    {
      slug: 'python',
      name: 'Python',
      description: 'Unlock the power of Python for data analysis and automation.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'r-r-studio',
      name: 'R & R studio',
      description: 'Dive into data analysis and visualization with the power of R and R Studio.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'react-d3',
      name: 'React D3',
      description: 'Create interactive and dynamic data visualizations with D3.js and React.',
      color: '#2196F3', textColor: '#FFFFFF'
    },
    {
      slug: 'data-driven-ui',
      name: 'Data-Driven UI',
      description: 'Craft user interfaces that respond to data changes with ease.',
      topics: [
        {
          name: `Data Visualization`,
          link: 'https://github.com/hal9ai/awesome-dataviz?tab=readme-ov-file',
        }, {
          name: 'D3.js',
          link: 'https://d3js.org/',
        }],
      color: '#2196F3', textColor: '#FFFFFF'
    },

  ] as IStackItem[],
};
