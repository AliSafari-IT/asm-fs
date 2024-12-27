import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IMenuItem } from '@/interfaces/IMenuItem';
import Wrapper from '@/layout/Wrapper/Wrapper';
import Header from '@/layout/Header/Header';
import { log } from '@/utils/mdUtils';
import DisplayMd from '../DisplayMd';
import { Breadcrumb, IBreadcrumbItem } from '@fluentui/react/lib/Breadcrumb';

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

  // add page title
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  useEffect(() => {
    let current = data; // Start with the root data
    const pathSegments = [categories, topics, sections, chapters, slug].filter(Boolean);

    // Navigate through the path segments to find the current directory or file
    for (let i = 0; i < pathSegments.length; i++) {
      const segment = pathSegments[i];
      const foundItem = current.subMenu?.find(
        item => item.name.toLowerCase() === segment?.toLowerCase()
      );

      if (!foundItem) {
        // If no found item, set current directory and exit
        setCurrentDirectory(current);
        setCurrentMdFile(undefined);
        break;
      }

      if (foundItem.type === 'file') {
        // If it's a file, set it as current markdown file
        setCurrentMdFile(foundItem);
        setCurrentDirectory(current);
        break;
      } else {
        // If it's a folder, navigate deeper
        current = foundItem;
        if (i === pathSegments.length - 1) {
          setCurrentDirectory(foundItem);
          setCurrentMdFile(undefined);
        }
      }
    }

    // If no path segments, show root directory
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
    if (slug) items.push({ text: slug, key: slug, href: `${baseUrl}/${categories}/${topics}/${sections}/${chapters}/${slug}` });

    return (
      <Breadcrumb
        items={items.map(item => ({
          text: item.text,
          key: item.key,
          onClick: () => navigate( `${item.href}`, { replace: true }), // Use absolute href
        }))}
        maxDisplayedItems={5}
        ariaLabel="Breadcrumb"
        styles={{
          root: { marginBottom: '16px' },
          item: { fontSize: '16px', color: 'blue' },
        }}
      />
    );
  };

  const renderDirectoryContent = () => {
    //if (!currentDirectory?.subMenu) return null;

    const folders = currentDirectory?.subMenu?.filter(item => item.type === 'folder');
    const files = currentDirectory?.subMenu?.filter(item => item.type === 'file');

    return (
      <div className="space-y-8">
        {folders && folders?.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Folders</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {folders.map(folder => (
                <div
                  key={folder.name}
                  className="p-4 border rounded-lg hover:shadow-md cursor-pointer"
                  onClick={() => navigate(folder.to || '#')}
                >
                  <h3 className="text-lg font-medium">{folder.title}</h3>
                  {folder.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{folder.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {files && files.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold mb-4">Files</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {files.map(file => (
                <div
                  key={file.name}
                  className="p-4 border rounded-lg hover:shadow-md cursor-pointer"
                  onClick={() => navigate(file.to || '#')}
                >
                  <h3 className="text-lg font-medium">{file.title}</h3>
                  {file.description && (
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{file.description}</p>
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
    <div className="prose dark:prose-invert max-w-none">
      <DisplayMd id={currentMdFile?.id} markdownContent={currentMdFile?.content || ''} />
    </div>
  );

  return (
    <Wrapper
      header={
        <Header>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <div className="py-6">
                {renderBreadcrumbs()} {/* Render Fluent UI breadcrumbs */}
              </div>
              <button onClick={handleBackToList} className="inline-flex items-center gap-2 text-info-dark hover:text-info transition-colors duration-200">
                <BackIcon />
                <span className="font-medium">Back</span>
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
    </Wrapper>
  );
};

export default MarkdownPage;