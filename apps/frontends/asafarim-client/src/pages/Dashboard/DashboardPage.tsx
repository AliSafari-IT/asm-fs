// src/pages/Dashboard.tsx
import React from "react";
import Wrapper from "../../layout/Wrapper/Wrapper";
import { DashboardHeaderBlock } from "./DashboardHeaderBlock";
import { FluentProvider, Link, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import CardContainer from "../../components/Containers/Card/CardContainer";
import { useTheme } from "@/contexts/ThemeContext";

const Dashboard: React.FC = () => {
  const { theme } = useTheme();
  const currentTheme = theme === 'dark' ? webDarkTheme : webLightTheme;
  
  return (
    <Wrapper header={<DashboardHeaderBlock />}>
      <FluentProvider theme={currentTheme}>
        <CardContainer />
      </FluentProvider>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Sitemap</h1>
        <ul>
          <li className="text-lg"><a
            href="/"
            target="_self"
            rel="noopener noreferrer"
          >
            Home
          </a></li>
          <li className="text-lg">
            <Link href="/about-asafarim">About</Link>
          </li>
          <li className="text-lg">
            <Link href="/manage-sitemap-content" target="_self">Sitemap Page</Link>
          </li>
        </ul>
      </div>

    </Wrapper>
  );
};

export default Dashboard;
