// src/pages/Dashboard.tsx
import Wrapper from "../../layout/Wrapper/Wrapper";
import { DashboardHeaderBlock } from "./DashboardHeaderBlock";
import { FluentProvider, Link, webDarkTheme, webLightTheme } from "@fluentui/react-components";
import { useTheme } from "../../hooks/useTheme";
import CardContainer from "../../components/Containers/Card/CardContainer";

const Dashboard = () => {
  // get current theme
  const theme = useTheme().theme == 'dark' ? webDarkTheme : webLightTheme;
  return (
    <Wrapper header={<DashboardHeaderBlock />}>
      <FluentProvider theme={theme}>
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
