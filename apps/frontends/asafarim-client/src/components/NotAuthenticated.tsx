import { Link } from "@fluentui/react";
import { useLocation } from "react-router-dom";
import AlertContainer from "./AlertContainer";

const NotAuthenticated: React.FC = () => {
    const location = useLocation();

    // Helper function to check if the current path is the root ("/")
    const isActive = (path: string) => {
        return location.pathname === path;
    };

    return (
        <div>
            <div className="text-2xl font-bold mb-4"> Home </div>
            <AlertContainer theme="danger">
                <h2 className="text-lg font-semibold mb-2">Authentication Required</h2>
                <div className="mb-4">
                    <p className="mb-4">No authentication token found. Please log in to continue.</p>
                    <div className="flex justify-center">
                        <Link
                            href="/login"
                            className="bg-red-600 hover:bg-red-700 text-[var(--text-primary)] font-bold px-6 py-2 mx-4 rounded-lg shadow-md transition-colors duration-300 ease-in-out"
                        >
                            Login
                        </Link>
                        {/* Only show the "Go back home" button if not on the home page */}
                        <Link
                            href="/"
                            className={`px-6 py-2 text-lg text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition duration-300 ${isActive("/") ? "hidden" : ""}`}
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </AlertContainer>
        </div>
    );
};

export default NotAuthenticated;
