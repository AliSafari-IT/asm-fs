import React from 'react';
import { Link } from 'react-router-dom';
import { getAllMdFiles } from '@/utils/mdFilesUtils';

const Footer: React.FC = () => {
    const { legalDocs } = getAllMdFiles();
    return (
        <footer className="w-full bg-[var(--bg-secondary)] text-[var(--text-secondary)] py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <nav className="w-full md:w-auto">
                        <ul className="flex flex-wrap justify-center md:justify-start items-center gap-4">
                            {legalDocs.subMenu?.map((doc, index) => (
                                <React.Fragment key={doc.id}>
                                    <li>
                                        <a
                                            href={doc.to}
                                            className="text-sm hover:text-[var(--text-warning)] hover:underline transition-colors"
                                        >
                                            {doc.title}
                                        </a>
                                    </li>
                                    {index < (legalDocs.subMenu?.length || 0) - 1 && (
                                        <li className="text-[var(--text-info)] font-bold font-landing">
                                            |
                                        </li>
                                    )}
                                </React.Fragment>
                            ))}
                            <li className="text-[var(--text-info)] font-bold font-landing">|</li>
                            <li>
                                <Link 
                                    to="/contact-asafarim" 
                                    className="text-sm hover:text-[var(--text-warning)] hover:underline transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="text-sm text-center md:text-right whitespace-nowrap">
                        &copy; {new Date().getFullYear()} ASafariM. All rights reserved.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default React.memo(Footer);
