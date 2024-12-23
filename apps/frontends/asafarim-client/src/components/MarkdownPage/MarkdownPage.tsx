import React, { useState, useEffect } from 'react';
import SidebarNavItem from '@/layout/Navbar/SidebarNavItem';
import SortArray, { SortOrder } from '@/components/SortArray';
import { getFirstHeading } from '@/utils/mdUtils';
import { useParams, useNavigate } from 'react-router-dom';
import DisplayMd from '@/components/DisplayMd';
import Wrapper from '@/layout/Wrapper/Wrapper';
import { RecentChangesSvg, RecentChangesSvgIcon } from '@/assets/SvgIcons/RecentChangesSvg';
import Header from '@/layout/Header/Header';
import { IMenuItem } from '@/interfaces/IMenuItem';
import { Link } from '@fluentui/react/lib/Link';

const MarkdownPage: React.FC<{ data: IMenuItem, title?: string, description?: string }> = ({ data, title = '', description = '' }) => {
  const { category, slug } = useParams<{ category: string; slug?: string }>();
  const navigate = useNavigate();
  const [currentCategory, setCurrentCategory] = useState<IMenuItem | undefined>();
  const [currentDoc, setCurrentDoc] = useState<IMenuItem | undefined>();
  const [pageTitle, setPageTitle] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    console.log('Current Data:', data);
    console.log('Current SubMenu:', data.subMenu);
  }, [data]);

  useEffect(() => {
    if (currentCategory) {
      console.log('Current Category:', currentCategory);
      setPageTitle(`${currentCategory.title}`);
    } else if (currentDoc) {
      console.log('Current Doc:', currentDoc);
      setPageTitle(`${currentDoc.title}`);
    }
  }, [currentCategory, currentDoc]);

  useEffect(() => {
    if(pageTitle){
      document.title = 'ASafariM | ' + pageTitle;
    }
  }, [pageTitle]);

  useEffect(() => {
    if (!category && !slug) {
      setCurrentCategory(undefined);
      setCurrentDoc(undefined);
    } else if (slug && !category) {
      const rootFile = data.subMenu?.find(
        (item) => item.type === 'file' && item.name.toLowerCase() === slug.toLowerCase()
      );
      if (rootFile) {
        setCurrentDoc(rootFile);
        setCurrentCategory(undefined);
      }
    } else if (category) {
      const foundCategory = data.subMenu?.find(
        (item) => item.type === 'category' && item.name.toLowerCase() === category.toLowerCase()
      );

      if (foundCategory) {
        setCurrentCategory(foundCategory);
        if (slug) {
          const foundDoc = foundCategory.subMenu?.find(
            (doc) => doc.type === 'file' && doc.name.toLowerCase() === slug.toLowerCase()
          );
          setCurrentDoc(foundDoc);
        } else {
          setCurrentDoc(undefined);
        }
      } else {
        const rootFile = data.subMenu?.find(
          (item) => item.type === 'file' && item.name.toLowerCase() === category.toLowerCase()
        );
        if (rootFile) {
          setCurrentDoc(rootFile);
          setCurrentCategory(undefined);
        } else {
          setCurrentCategory(undefined);
          setCurrentDoc(undefined);
        }
      }
    }
  }, [category, slug, data]);

  useEffect(() => {
    if (currentDoc) {
      setPageTitle(currentDoc.title || '');
    } else if (currentCategory) {
      setPageTitle(currentCategory.title || '');
    } else {
      setPageTitle(title || '');
    }
  }, [currentDoc, currentCategory, title]);

  const getGitHash = (path: string): string => {
    const match = path?.match(/_([a-f0-9]+)$/);
    return match ? match[1] : '-';
  };

  const handleSortChange = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
  };

  const handleBackToList = () => {
    if (category && !slug) {
      navigate(`/${data.name}`);
    } else if (category && slug) {
      navigate(`/${data.name}/${category}`);
    } else {
      navigate(`/${data.name}`);
    }
  };

  const renderTable = (items: IMenuItem[], columns: { key: keyof IMenuItem; label: string }[]) => (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800 shadow rounded-lg">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {col.label}
                {col.key === 'title' && (
                  <SortArray
                    sortOrder={sortOrder}
                    onSortChange={handleSortChange}
                    className="ml-2 inline-block"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {items.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap"
                >
                  {col.key === 'title' ? (
                    <Link
                      href={item.to || '#'}
                      className="text-info hover:underline"
                    >
                      {String(item[col.key])}
                    </Link>
                  ) : col.key === 'createdAt' || col.key === 'updatedAt' ? (
                    item[col.key] instanceof Date
                      ? (item[col.key] as Date).toLocaleString()
                      : '-'
                  ) : (
                    String(item[col.key] || '-')
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCategoryList = () => (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
      {renderTable(data.subMenu?.filter(item => item.type === 'category') || [], [
        { key: 'title', label: 'Category' },
        { key: 'name', label: 'Title' },
        { key: 'createdAt', label: 'Date' },
        { key: 'updatedAt', label: 'Updated' },
        { key: 'description', label: 'Description' },
      ])}
      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-8">Files</h3>
      {renderTable(data.subMenu?.filter(item => item.type === 'file') || [], [
        { key: 'title', label: 'File' },
        { key: 'name', label: 'Title' },
        { key: 'createdAt', label: 'Date' },
        { key: 'updatedAt', label: 'Updated' },
        { key: 'description', label: 'Description' },
      ])}
    </div>
  );

  const renderDocumentContent = () => (
    <div className="prose dark:prose-invert max-w-none">
      <DisplayMd id={currentDoc!.id} markdownContent={currentDoc!.content || ''} />
    </div>
  );

  const renderCategoryDocuments = () => (
    <div className="py-8 px-4">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{currentCategory?.title}</h2>
      {renderTable(currentCategory?.subMenu || [], [
        { key: 'title', label: 'Document' },
        { key: 'createdAt', label: 'Date' },
        { key: 'updatedAt', label: 'Updated' },
        { key: 'description', label: 'Description' },
      ])}
    </div>
  );

  const asideBlock = (
    <div className="text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-info-dark flex items-center gap-2">
        <RecentChangesSvgIcon />
        {title}
      </h2>
      <SidebarNavItem
        sidebarNavData={(data.subMenu ?? [])
          .map(item => {
            const mostRecentDate = item.updatedAt ?? item.createdAt;
            return {
              ...item,
              mostRecentDate,
              title: item.content ? getFirstHeading(item.content) : item.title || 'No title',
              icon: <RecentChangesSvg />, 
              className: item.name === category ? 'emphasized' : '',
              hash: getGitHash(item.to || '-')
            };
          })
          .sort((a, b) => {
            const dateA = a.mostRecentDate?.getTime() || 0;
            const dateB = b.mostRecentDate?.getTime() || 0;
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
          })}
        className="space-y-1"
      />
    </div>
  );

  return (
    <Wrapper
      header={
        <Header>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6 flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl tech-docs-title max-w-[70%] break-words">
                <span className="gradient-text py-6 block">
                  {pageTitle}
                </span>
              </h1>
              <button
                onClick={handleBackToList}
                className="inline-flex items-center gap-2 text-info-dark hover:text-info transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">Back to List</span>
              </button>
            </div>
          </div>
        </Header>
      }
      sidebar={asideBlock}
    >
      {currentDoc
        ? renderDocumentContent()
        : currentCategory
          ? renderCategoryDocuments()
          : renderCategoryList()
      }
    </Wrapper>
  );
};

export default MarkdownPage;
