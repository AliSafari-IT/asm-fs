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
import './styles/custom.scss';
import { useEffect, useState } from "react";
 import { useTheme } from "./hooks/useTheme";
import DelCard from "./components/Containers/Card/DelCard";
import EditCard from "./components/Containers/Card/EditCard";
import AddForm from "./components/crud/AddForm";
import ProjectHome from "./pages/Project/Index";
import PostDetail from "./pages/Post/PostDetail";
import LoginPage from "./pages/Userpage/LoginPage";
import LogoutPage from "./pages/Userpage/LogoutPage";
import Contact from "./pages/AboutMe/Contact";
function App() {
  const [theme] = useState(useTheme().theme);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme); // Apply the theme
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // const { theme } = useTheme();
  useEffect(() => {
    document.body.setAttribute('data-theme', theme); 
  }, [theme]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:slug" element={<PostDetail />} />

      <Route path="/:model/add" element={<AddForm />} />
      <Route path={"/:model/delete/:id"} element={<DelCard />}/>
      <Route path="/:model/edit/:id" element={<EditCard />} />

      <Route path="/dashboard" element={<PrivateRoute ><Dashboard /></PrivateRoute>} />
      <Route path="/projects" element={<ProjectHome key={Math.random()}/>} />
      {/* Add routes for CRUD operations about projects here */}
      <Route path="/projects/:id" element={<ProjectHome key={Math.random()}/>} />

      <Route path="/about" element={<About />} />
      <Route path="/about/akkodis-targeted-resume" element={<AkkodisTargetedResume />} />
      <Route path="/contact" element={<Contact />} />
      
      <Route
        path="/manage-sitemap-content"
        element={
          <PrivateRoute>
            <SitemapPage />
          </PrivateRoute>
        }
      />

      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <LogoutPage />
          </PrivateRoute>
        }
      />

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
