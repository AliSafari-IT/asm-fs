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
import { useTheme } from "./hooks/useTheme";
import DelCard from "./components/Containers/Card/DelCard";
import EditCard from "./components/Containers/Card/EditCard";
import AddForm from "./components/crud/AddForm";
import ProjectHome from "./pages/Project/Index";
import PostDetail from "./pages/Post/PostDetail";
import LogoutPage from "./pages/Accountpage/LogoutPage";
import Contact from "./pages/AboutMe/Contact";
import Register from "./pages/Accountpage/Register";
import LoginPage from "./pages/Accountpage/LoginPage";
import UsersList from "./pages/User/UsersList";
import CreateUser from "./pages/User/CreateUser";
import EditUser from "./pages/User/EditUser";
import Footer from "./layout/Footer/Footer";
import AccountSettings from "./pages/Accountpage/AccountSettings";
import UserProfile from "./pages/User/UserProfile";
import useAuth from "./hooks/useAuth"; // Custom hook for user state
import { Suspense, useEffect } from "react";
import Layout from "./layout/Layout";
import RTNav from "./pages/Project/projects/react/tailwind/navbar/RTNav";
import UserAccountSettings from "./pages/User/UserAccountSettings";
import Privacy from "./pages/Privacy/Privacy";

const App = () => {
  const { theme } = useTheme();
  const user = useAuth();

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/privacy-eula" element={<Privacy />} />
      <Route path="/privacy-disclaimer" element={<Privacy />} />
      <Route path="/privacy-cookies" element={<Privacy />} />

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
      <Route path= "/projects/react/tailwind/navbar-with-dynamic-nav-items" element={<RTNav />} />
      <Route path="/[...notfound]" element={<NotFound />} /> 
      <Route path="/about-asafarim" element={<About />} />
      <Route path="/about/akkodis-targeted-resume" element={<AkkodisTargetedResume />} />
      <Route path="/contact-asafarim" element={<Contact />} />
      <Route
        path="/user-account-settings"
        element={
          <PrivateRoute>
            <Layout>
              <UserAccountSettings />
            </Layout>
          </PrivateRoute>
        }
      />
      <Route
        path="/user-profile"
        element={
          <Layout header={""} footer={<Footer />} >
            <PrivateRoute>
              <UserProfile email={user?.email} />
            </PrivateRoute>
          </Layout>
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
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        }
      />
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
  );
};

export default App;
