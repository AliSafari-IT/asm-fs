import React from "react";
import { Link } from "react-router-dom";
import { FaCompass, FaHome } from "react-icons/fa";
import Layout from "../layout/Layout";
import ToggleThemeDesktop from "../layout/Theme/ToggleThemeDesktop";

const NotFound: React.FC = () => {
  return (
    <Layout header={<></>}>
      <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Theme Toggle */}
        <div className="absolute top-4 right-4">
          <ToggleThemeDesktop className="scale-75" />
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[20%] left-[15%] w-64 h-64 bg-blue-400/20 dark:bg-blue-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-[10%] right-[20%] w-72 h-72 bg-purple-400/20 dark:bg-purple-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-[20%] left-[30%] w-72 h-72 bg-indigo-400/20 dark:bg-indigo-500/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <div className="mb-8">
            <FaCompass className="mx-auto text-6xl text-blue-600 dark:text-blue-400 animate-spin-slow" />
          </div>
          
          <h1 className="text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-300">
            Page Not Found
          </h2>
          
          <p className="text-lg mb-8 max-w-md mx-auto text-gray-600 dark:text-gray-400">
            Oops! It seems you've ventured into uncharted territory. The page you're looking for doesn't exist.
          </p>

          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 dark:from-blue-500 dark:to-indigo-500 dark:hover:from-blue-600 dark:hover:to-indigo-600 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            <FaHome className="mr-2 group-hover:animate-bounce" />
            Return Home
          </Link>
        </div>

        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5 dark:opacity-[0.02]"></div>
      </div>
    </Layout>
  );
};

export default NotFound;
