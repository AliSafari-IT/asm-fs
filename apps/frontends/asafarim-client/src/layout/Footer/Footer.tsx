import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
    return (
        <footer className="w-full flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 mx-auto px-4 py-6 bg-[var(--bg-secondary)] text-[var(--text-secondary)]">
            <div className="flex items-center space-x-2 sx:space-x-4 md:space-x-6 lg:space-x-8 xl:space-x-10 2xl:space-x-12 pl-[1%] mx-auto">
                <Link to="/privacy-policy" className="text-sm hover:text-[var(--text-warning)] transition-colors">
                    Privacy Policy
                </Link>
                <span className="text-[var(--text-info)] font-bold font-landing">|</span>
                <Link to="/terms-of-service" className="text-sm hover:text-[var(--text-warning)] transition-colors">
                    Terms of Service
                </Link>
                <span className="text-[var(--text-info)] font-bold font-landing">|</span>
                <Link to="/contact-asafarim" className="text-sm hover:text-[var(--text-warning)] transition-colors">
                    Contact
                </Link>
            </div>

            <div className="text-sm text-center md:text-right pr-[1%]">
                &copy; {new Date().getFullYear()} ASafariM. All rights reserved.
            </div>
        </footer>
    );
};

export default React.memo(Footer);
