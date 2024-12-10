import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-gray-400">
            <div className="container mx-auto px-4 py-6">
                <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <div className="flex items-center space-x-4">
                        <Link to="/privacy" className="text-sm hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/terms" className="text-sm hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link to="/contact" className="text-sm hover:text-white transition-colors">
                            Contact
                        </Link>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                        <span className="text-sm">
                            &copy; {new Date().getFullYear()}
                        </span>
                        <Link to="/" className="text-sm font-semibold bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent hover:from-blue-300 hover:to-teal-300 transition-all">
                            ASafariM
                        </Link>
                        <span className="text-sm">
                            All Rights Reserved
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
