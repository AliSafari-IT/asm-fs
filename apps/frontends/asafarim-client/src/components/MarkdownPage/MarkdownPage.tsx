import React, { useEffect } from 'react';
import Wrapper from '../../layout/Wrapper/Wrapper';
import DisplayMd from '../DisplayMd';
import Button from '../Button/Button';
import { legalDocs } from '../../layout/Navbar/navItemsList';

// Import all markdown files
import privacyPolicyMd from '@/pages/Privacy/privacy-policy.md?raw';
import termsOfServiceMd from '@/pages/Privacy/terms-of-service.md?raw';
import disclaimerMd from '@/pages/Privacy/legal-disclaimer.md?raw';
import cookiePolicyMd from '@/pages/Privacy/cookie-policy.md?raw';


interface MarkdownPageProps {
  filepath: string;
  title?: string;
}

const MarkdownPage: React.FC<MarkdownPageProps> = ({ filepath, title }) => {
  console.log("Received filepath:", filepath);

  const getMarkdownContent = (filepath: string): string => {
    // Create a mapping of filepaths to markdown content
    const markdownFiles: Record<string, string> = {
      '/src/pages/Privacy/privacy-policy.md': privacyPolicyMd,
      '/src/pages/Privacy/terms-of-service.md': termsOfServiceMd,
      '/src/pages/Privacy/legal-disclaimer.md': disclaimerMd,
      '/src/pages/Privacy/cookie-policy.md': cookiePolicyMd
    };

    const content = markdownFiles[filepath];
    if (!content) {
      console.error('Markdown file not found:', filepath);
      return 'Document not found';
    }
    return content;
  };

  const [mdFile, setMdFile] = React.useState<string>('');

  useEffect(() => {
    if (filepath) {
      const content = getMarkdownContent(filepath);
      setMdFile(content);
    }
  }, [filepath]);

  const sidebarContent = (
    <div className="sidebartext-left m-4 p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">
        Legal Documents 📄
      </h2>
      <ul className="list-none flex flex-col space-y-2">
        {legalDocs.subMenu?.map((doc) => (
          <li key={doc.id}>
            <a
              href={doc.to}
              className="hover:text-[var(--text-warning)] hover:underline"
            >
              {doc.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );

  function getFileName(pathname: string): string | undefined {
    if (!pathname) return undefined;
    // Handle both forward and backward slashes
    const normalizedPath = pathname.replace(/\\/g, '/');
    // Get the last part after the final slash
    const parts = normalizedPath.split('/');
    const filename = parts[parts.length - 1];
    console.log("filename in getFileName is:", filename);
    return filename || undefined;
  }

  return (
    <Wrapper
      pageTitle={title}
      pageDescription="ASafariM Privacy and Legal Information"
      header={<h1 className="md-page-title text-3xl font-bold m-4 text-center">{title}</h1>}
      sidebar={sidebarContent}
    >
      <div>
        <div className="md-toolbar-buttons flex justify-center mt-8">
          {legalDocs.subMenu?.map((doc) => (
            <Button key={doc.id} href={doc.to} className="ml-2">{doc.title}</Button>
          ))}
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-invert">
            {mdFile && <DisplayMd markdownContent={mdFile} id={getFileName(window.location.pathname)} />}
          </div>
        </div>
      </div>

    </Wrapper >
  );
};

export default MarkdownPage;
