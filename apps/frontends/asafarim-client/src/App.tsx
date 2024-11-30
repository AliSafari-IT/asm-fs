// src/App.tsx
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
import { useEffect, useState } from "react";
import { useTheme } from "./hooks/useTheme";
import DelCard from "./components/Containers/Card/DelCard";
import EditCard from "./components/Containers/Card/EditCard";
import AddForm from "./components/crud/AddForm";
import ProjectHome from "./pages/Project/Index";
import PostDetail from "./pages/Post/PostDetail";
// import LoginPage from "./pages/Userpage/LoginPage";
import LogoutPage from "./pages/Accountpage/LogoutPage";
import Contact from "./pages/AboutMe/Contact";
import Register from "./pages/Accountpage/Register";
import LoginPage from "./pages/Accountpage/LoginPage";
import UsersList from "./pages/User/UsersList";
import CreateUser from "./pages/User/CreateUser";
import EditUser from "./pages/User/EditUser";
import Wrapper from "./layout/Wrapper/Wrapper";
import Footer from "./layout/Footer/Footer";
import AccountSettings from "./pages/Accountpage/AccountSettings";
import UserProfile from "./pages/User/UserProfile";


function App() {
  const [theme] = useState(useTheme().theme);
  const userData = localStorage.getItem('user');
      const user =  userData && JSON.parse(userData).user;

      useEffect(() => {
    document.body.setAttribute('data-theme', theme); // Apply the theme
    localStorage.setItem('theme', theme);
  }, [theme]);

  // const { theme } = useTheme();
  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <Routes >
      <Route path="/" element={<Home />} />
      <Route path="/posts/:slug" element={<PostDetail />} />

      <Route path="/:model/add" element={<AddForm />} />
      <Route path={"/:model/delete/:id"} element={<DelCard />} />
      <Route path="/:model/edit/:id" element={<EditCard />} />

      <Route path="/dashboard" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
      <Route path="/projects" element={<ProjectHome key={Math.random()} />} />
      {/* Add routes for CRUD operations about projects here */}
      <Route path="/projects/:id" element={<ProjectHome key={Math.random()} />} />

      <Route path="/about" element={<About />} />
      <Route path="/about/akkodis-targeted-resume" element={<AkkodisTargetedResume />} />
      <Route path="/contact" element={<Contact />} />

      <Route path="/user-account-settings" element={<Wrapper
        header={''}
        footer={<Footer />}
      >
        <AccountSettings /> {/* User List page content */}
      </Wrapper>} />
      <Route path="/user-profile" element={<Wrapper
        header={''}
        footer={<Footer />}
      >
         <PrivateRoute>{<UserProfile email={user.email}  />}</PrivateRoute>
      </Wrapper>} />

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

      <Route
        path="/users"
        element={
          <Wrapper
            header={''}
            footer={<Footer />}
          >
            <UsersList /> {/* User List page content */}
          </Wrapper>
        }
      />
      <Route path="/users/create" element={
        <Wrapper
          header={''}
          footer={<Footer />}
        >
          <CreateUser /> {/* Create User page content */}
        </Wrapper>
      } />
      <Route path="/users/edit/:id" element={
        <Wrapper
          header={''}
          footer={<Footer />}
        >
          <EditUser /> {/* Edit User page content */}
        </Wrapper>
      } />

      <Route
        path="/health-ui"
        element={<Navigate to="/health-ui" />}
      />
      {/* Catch-all route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
