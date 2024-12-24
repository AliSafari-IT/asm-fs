import { IStackGroup, IStackItem } from "../../../interfaces/IStack";

export const stackData: IStackGroup = {
  // Backend Technologies
  backend: [
    { name: 'CSharp ASP.Net Core', description: 'Harness the power of C# and .NET Core to architect scalable backend solutions.', color: '#7B61FF', textColor: '#FFFFFF' },
    { name: 'Restful API', description: 'Craft seamless API experiences with ASP.NET Core and SignalR for real-time magic.', color: '#512BD4', textColor: '#FFFFFF' },
    { name: 'Clean Architecture', description: 'Engineer maintainable systems with Clean Architecture principles at the core.', color: '#FF5733', textColor: '#FFFFFF' },
    { name: 'SQL (MySQL) and NoSQL (MongoDB)', description: 'Master data manipulation with SQL and NoSQL for robust data strategies.', color: '#4CAF50', textColor: '#FFFFFF' },
    { name: 'End-to-End Testing', description: 'Elevate software quality with comprehensive end-to-end testing frameworks.', color: '#FFC107', textColor: '#000000' },
  ] as IStackItem[],
  // Frontend Frameworks and Libraries
  frontend: [
    { name: 'React TypeScript', description: 'Build dynamic interfaces with React and TypeScript for type-safe development.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'HTML/CSS', description: 'Design stunning web pages with the foundational duo of HTML and CSS.', color: '#FF9800', textColor: '#000000' },
    { name: 'Git', description: 'Collaborate effortlessly with Git, the cornerstone of version control.', color: '#FF5722', textColor: '#FFFFFF' },
  ] as IStackItem[],
  // UI Frameworks
  uiFrameworks: [
    { name: 'Tailwind CSS', description: 'Transform your UI with Tailwind CSS, crafting responsive designs effortlessly.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'PHP and Laravel', description: 'Develop dynamic applications with PHP and Laravel, the robust backend duo.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Node.js', description: 'Create efficient server-side solutions with Node.js, leveraging non-blocking I/O.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Angular', description: 'Deliver powerful SPAs with Angular, a framework for dynamic web applications.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Fluent UI', description: 'Craft modern interfaces with Fluent UI, embracing Microsoft’s design language.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Bootstrap', description: 'Rapidly prototype responsive sites with Bootstrap’s extensive toolkit.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Material UI', description: 'Implement sleek designs with Material UI, inspired by Google’s design philosophy.', color: '#2196F3', textColor: '#FFFFFF' },
    { name: 'Syncfusion', description: 'Enhance applications with Syncfusion’s comprehensive UI component suite.', color: '#2196F3', textColor: '#FFFFFF' },
  ] as IStackItem[],
  // Data Analysis
  dataAnalysis: [
    { name: 'R & R studio', description: 'Dive into data analysis and visualization with the power of R and R Studio.', color: '#2196F3', textColor: '#FFFFFF' },
  ] as IStackItem[],
};
