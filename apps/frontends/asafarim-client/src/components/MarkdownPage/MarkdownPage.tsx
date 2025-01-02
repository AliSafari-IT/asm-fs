import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMenuItem } from '@/interfaces/IMenuItem';
import Wrapper from '@/layout/Wrapper/Wrapper';
import Header from '@/layout/Header/Header';
import DisplayMd from '../DisplayMd';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';
import { FaFileAlt, FaFolderOpen } from "react-icons/fa";
import ScrollingButtons from '../ScrollingButtons';
import { getFirstHeading } from '@/utils/mdUtils';

const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
    <path fill="currentColor" d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path>
  </svg>
);



const MarkdownPage: React.FC<{ data: IMenuItem, title?: string, description?: string, baseUrl?: string }> = ({ data, title, description, baseUrl }) => {
  const { categories, topics, sections, chapters, slug } = useParams<{
    categories?: string;
    topics?: string;
    sections?: string;
    chapters?: string;
    slug?: string;
  }>();
  const navigate = useNavigate();
  const [currentDirectory, setCurrentDirectory] = useState<IMenuItem | undefined>();
  const [currentMdFile, setCurrentMdFile] = useState<IMenuItem | undefined>();
  const [pageTitle, setPageTitle] = useState(title || '');
  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  // get current viewport height
  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // get height of markdown-container element
  const markdownContainerHeight = document.getElementById('markdown-container')?.clientHeight || 0;

  // add page title
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    let current = data; // Start with the root directory
    const pathSegments = [categories, topics, sections, chapters, slug].filter(Boolean);

    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const foundItem = current.subMenu?.find(
        item => item.name.toLowerCase() === segment?.toLowerCase()
      );

      if (!foundItem) {
        setCurrentDirectory(current); // Set to current level if nothing is found
        setCurrentMdFile(undefined);
        return;
      }

      if (foundItem.type === 'file') {
        setCurrentMdFile(foundItem); // Set current Markdown file
        setCurrentDirectory(undefined);
        return;
      }

      // If it's a folder, dive deeper
      current = foundItem;
      setCurrentDirectory(current);
      setCurrentMdFile(undefined);
    }

    // If no path segments, show the root directory
    if (pathSegments.length === 0) {
      setCurrentDirectory(data);
      setCurrentMdFile(undefined);
    }
  }, [data, categories, topics, sections, chapters, slug]);


  useEffect(() => {
    if (currentMdFile) {
      setPageTitle(currentMdFile.title || '');
    } else if (currentDirectory) {
      setPageTitle(currentDirectory.title || '');
    }
  }, [currentDirectory, currentMdFile]);

  const handleBackToList = () => {
    const pathParts = window.location.pathname.split('/').filter(Boolean);
    if (pathParts.length > 1) {
      pathParts.pop();
      navigate('/' + pathParts.join('/'));
    } else {
      navigate('/');
    }
  };

  
  const renderBreadcrumbs = () => {
    const items: IBreadcrumbItem[] = [];

    if (categories) items.push({ text: categories, key: categories, href: `${baseUrl}/${categories}` });
    if (topics) items.push({ text: topics, key: topics, href: `${baseUrl}/${categories}/${topics}` });
    if (sections) items.push({ text: sections, key: sections, href: `${baseUrl}/${categories}/${topics}/${sections}` });
    if (chapters) items.push({ text: chapters, key: chapters, href: `${baseUrl}/${categories}/${topics}/${sections}/${chapters}` });

    return (
      <Breadcrumb
        items={items}
        maxDisplayedItems={5}
        ariaLabel="Breadcrumb"
        styles={{
          root: { marginBottom: '16px' },
        }}
      />
    );
  };

  const renderDirectoryContent = () => {
    const folders = currentDirectory?.subMenu?.filter(item => item.type === 'folder');
    const files = currentDirectory?.subMenu?.filter(item => item.type === 'file');

    return (
      <div className="space-y-8">
        {folders && folders.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map(folder => (
                <div
                  key={folder.name}
                  className="folder-button"
                  onClick={() => navigate(folder.to || '#')}
                >
                  <FaFolderOpen className="folder-icon" />
                  <h3 className="text-lg text-info font-medium">{folder.title}</h3>
                  {folder.description && (
                    <p className="mt-2">{folder.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {files && files.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map(file => (
                <div
                  key={file.name}
                  className="file-button"
                  onClick={() => navigate(file.to || '#')}
                >
                  <FaFileAlt className="file-icon" />
                  <h3 className="text-lg font-medium file-name">{getFirstHeading(file.content+'') || file.title}</h3>
                  {file.description && (
                    <p className=" mt-2">{file.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMarkdownContent = () => (
    <div className="prose dark:prose-invert max-w-none" id="markdown-container">
      <DisplayMd id={currentMdFile?.id} markdownContent={currentMdFile?.content || ''} key={`${description}_`} />
    </div>
  );

  return (
    <Wrapper
      header={
        <Header >
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <div className="py-6">
                {renderBreadcrumbs()} {/* Render Fluent UI breadcrumbs */}
              </div>
              <button onClick={handleBackToList} className="inline-flex items-center gap-2 text-info-dark hover:text-info transition-colors duration-200">
                <BackIcon />
                <span className="font-medium">{(!categories && !slug) ? " 🏠 " : "Back to List"}</span>
              </button>
            </div>
          </div>
        </Header>
      }
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="py-6">
          {currentMdFile ? renderMarkdownContent() : renderDirectoryContent()}
        </div>
      </div>
      {/* Show ScrollingButtons when on the markdown page and the content height is greater than the viewport height */}
      {currentMdFile && markdownContainerHeight > viewportHeight && (
        <div className="fixed bottom-4 right-4 z-50">
          <ScrollingButtons />
        </div>
      )}
    </Wrapper>
  );
};

export default MarkdownPage;