import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Wrapper from '../../layout/Wrapper/Wrapper';
import DisplayMd from '../../components/DisplayMd';
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

  return (
    <Wrapper
      pageTitle={getTitle()}
      pageDescription="ASafariM Privacy and Legal Information"
      header={<h1 className="text-3xl font-bold m-4 text-center">{getTitle()}</h1>}
    >
      <div>
        <div className="flex justify-center mt-8">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <a href="/privacy-eula">End User License Agreement</a>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          <a href="/privacy-disclaimer">Privacy Disclaimer</a>
        </button>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
          <a href="/privacy-cookies">Cookie Policy</a>
        </button>
      </div>
      <div className="container mx-auto px-4 py-8">
        <div className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto dark:prose-invert">
          {mdFile && <DisplayMd markdownContent={mdFile} id="about-me-markdown" />}
        </div>
      </div>
    </div>

    </Wrapper >
  );
};

export default Privacy;
