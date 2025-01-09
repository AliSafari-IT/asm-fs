import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper/Wrapper';
import DisplayMd from '../../components/MarkdownPage/DisplayMd';
import Button from '../../components/Button/Button';
import eulaMd from './eula.md?raw';
import disclaimerMd from './disclaimer.md?raw';
import cookiesMd from './cookies.md?raw';

const Privacy: React.FC = () => {
  const location = useLocation();
  const [mdFile, setMdFile] = React.useState<string | undefined>();
  useEffect(() => {
    const loadMarkdownContent = async () => {
      try {
        switch (location.pathname) {
          case '/privacy-eula':
            setMdFile(eulaMd);
            break;
          case '/privacy-disclaimer':
            setMdFile(disclaimerMd);
            break;
          case '/privacy-cookies':
            setMdFile(cookiesMd);
            break;
          default:
            setMdFile(eulaMd);
        }
      } catch (error) {
        console.error('Error loading markdown content:', error);
      }
    };

    loadMarkdownContent();
  }, [location.pathname]);

  const getTitle = () => {
    switch (location.pathname) {
      case '/privacy-eula':
        return 'End User License Agreement';
      case '/privacy-disclaimer':
        return 'Privacy Disclaimer';
      case '/privacy-cookies':
        return 'Cookie Policy';
      default:
        return 'Privacy Policy';
    }
  };

  function getFileName(pathname: string): string | undefined {
    if (!pathname) return undefined;
    // Handle both forward and backward slashes
    const normalizedPath = pathname.replace(/\\/g, '/');
    // Get the last part after the final slash
    const parts = normalizedPath.split('/');
    const filename = parts[parts.length - 1];
    console.log(filename);
    return filename || undefined;
  }

  return (
    <Wrapper
      pageTitle={getTitle()}
      pageDescription="ASafariM Privacy and Legal Information"
      header={<h1 className="md-page-title text-3xl font-bold m-4 text-center">{getTitle()}</h1>}
    >
      <div>
        <div className="md-toolbar-buttons flex justify-center mt-8">
          <Button href="/privacy-eula">End User License Agreement</Button>
          <Button href="/privacy-disclaimer" className="ml-2">Privacy Disclaimer</Button>
          <Button href="/privacy-cookies" className="ml-2">Cookie Policy</Button>
        </div>
        <div className="container mx-auto px-4 py-8">
          <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-invert">
            {mdFile && <DisplayMd markdownContent={mdFile} id={getFileName(location.pathname)} />}
          </div>
        </div>
      </div>

    </Wrapper >
  );
};

export default Privacy;
