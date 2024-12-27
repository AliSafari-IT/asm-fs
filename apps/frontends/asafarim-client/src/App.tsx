import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import About from "./pages/AboutMe/About";
import Dashboard from "./pages/Dashboard/DashboardPage";
import SitemapPage from "./pages/Sitemap/SitemapPage";
import NotFound from "./components/NotFound";
import Home from "./pages/Home/HomePage";
import AkkodisTargetedResume from "./pages/AboutMe/TailoredCV/Akkodis";
import DelCard from "./components/Containers/Card/DelCard";
import EditCard from "./components/Containers/Card/EditCard";
import AddForm from "./components/crud/AddForm";
import ProjectHome from "./pages/Project/Index";
import PostDetail from "./pages/Post/PostDetail";
import LogoutPage from "./pages/Accountpage/LogoutPage";
import Register from "./pages/Accountpage/Register";
import LoginPage from "./pages/Accountpage/LoginPage";
import UsersList from "./pages/User/UsersList";
import CreateUser from "./pages/User/CreateUser";
import EditUser from "./pages/User/EditUser";
import Footer from "./layout/Footer/Footer";
import UserProfile from "./pages/User/UserProfile";
import { Suspense, useEffect } from "react";
import Layout from "./layout/Layout";
import RTNav from "./pages/Project/projects/react/tailwind/navbar/RTNav";
//import UserAccountSettings from "./pages/User/UserAccountSettings";
import Contact from "./pages/Contact";
import MarkdownPage from "./components/MarkdownPage/MarkdownPage";
import { ThemeProvider } from './contexts/ThemeContext';
import AccountSettings from "./pages/Accountpage/AccountSettings";
import { getMdFiles } from "./utils/mdFilesUtils";
import useAuth from "./hooks/useAuth";
import React from "react";

function App() {
  const user = useAuth()?.user;
  const mds = getMdFiles();
  let ddPath = '';


  useEffect(() => {
    if (!user) {
      console.log('No user found in localStorage');
    }
  }, [user]);

  const dropdownItems = [
    { name: 'legal-docs', label: 'Legal Docs', data: mds.legalDocs, baseUrl: '/legal-docs', description: 'Legal Documentation' },
    { name: 'changelogs', label: 'Changelogs', data: mds.changelogs, baseUrl: '/changelogs', description: 'Changelogs' },
    { name: 'tech-docs', label: 'Tech Docs', data: mds.techDocs, baseUrl: '/tech-docs', description: 'Technical Documentation' },
    { name: 'essential-insights', label: 'Essential Insights', data: mds.essentialInsights, baseUrl: '/essential-insights', description: 'Essential Insights Documentation' },
    { name: 'projects', label: 'Projects', data: mds.projects, baseUrl: '/projects', description: 'Project Documentation' },
  ];
  // const pathSegments = ['categories', 'topics', 'sections', 'chapters', 'slug'];
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-default text-default">
        <Routes>
          <Route path="/" element={<Home />} />
          {dropdownItems.map((item) => (
            <React.Fragment key={item.name}>
              {/* Route for categories */}
              <Route path={`${item.baseUrl}/:categories`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />

              {/* Route for topics within categories */}
              <Route path={`${item.baseUrl}/:categories/:topics`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />

              {/* Route for sections within topics */}
              <Route path={`${item.baseUrl}/:categories/:topics/:sections`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />

              {/* Route for chapters within sections */}
              <Route path={`${item.baseUrl}/:categories/:topics/:sections/:chapters`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />

              {/* Route for slugs that can be at any level */}
              <Route path={`${item.baseUrl}/:categories/:topics/:sections/:chapters/:slug`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
              <Route path={`${item.baseUrl}/:categories/:topics/:sections/:slug`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
              <Route path={`${item.baseUrl}/:categories/:topics/:slug`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
              <Route path={`${item.baseUrl}/:categories/:slug`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
              <Route path={`${item.baseUrl}/:slug`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
                <Route path={`${item.baseUrl}`} element={
                <Suspense fallback={<div>Loading...</div>}>
                  <MarkdownPage
                    data={item.data}
                    title={item.label}
                    description={item.description}
                  />
                </Suspense>
              } />
            </React.Fragment>
          ))}
          <Route path="/posts/:slug" element={<PostDetail />} />
          <Route path="/:model/add" element={<AddForm />} />
          <Route path="/:model/delete/:id" element={<DelCard />} />
          <Route path="/:model/edit/:id" element={<EditCard />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route path="/projects" element={<ProjectHome key={Math.random()} />} />
          <Route path="/projects/:id" element={<ProjectHome key={Math.random()} />} />
          <Route path="/projects/react/tailwind/navbar-with-dynamic-nav-items" element={<RTNav />} />
          <Route path="/[...notfound]" element={<NotFound />} />
          <Route path="/about-asafarim" element={<About />} />
          <Route path="/logout" element={<LogoutPage />} />
          {user &&
            <>
              <Route path="/about/akkodis-targeted-resume" element={<AkkodisTargetedResume />} />
            </>
          }
          <Route path="/contact-asafarim" element={<Contact />} />
          <Route
            path="/user-account-settings"
            element={
              <PrivateRoute>
                <AccountSettings />
              </PrivateRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <PrivateRoute>
                <Layout header={<></>} footer={<Footer />}>
                  <UserProfile />
                </Layout>
              </PrivateRoute>
            }
          />
          <Route
            path="/manage-sitemap-content"
            element={
              <PrivateRoute>
                <SitemapPage />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />

          <Route path="/users" element={<UsersList />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route
            path="/users/edit/:id"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <EditUser />
              </Suspense>
            }
          />
          <Route path="/health-ui" element={<Navigate to="/health-ui" />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
