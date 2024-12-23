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
  const [sortKey, setSortKey] = useState<keyof IMenuItem>('createdAt');

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
    if (pageTitle) {
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
    setPageTitle(currentDoc?.title || currentCategory?.title || title);
  }, [currentDoc, currentCategory, title]);


  const getGitHash = (path: string): string => {
    const match = path?.match(/_([a-f0-9]+)$/);
    return match ? match[1] : '-';
  };

  const getUpdatedTimeFromContent = (content: string) => {
    const lines = content.split('\n');
    const updateLine = lines.find(line => line.toLowerCase().startsWith('updated:'));
    if (updateLine) {
      const dateMatch = updateLine.match(/updated:\s*(.+)/i);
      if (dateMatch) {
        return new Date(dateMatch[1]);
      }
    }
    return null;
  };

  const handleSortChange = (newOrder: SortOrder, key: keyof IMenuItem) => {
    setSortOrder(newOrder);
    setSortKey(key);
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

  const sortData = (data: IMenuItem[]) => {
    return data.sort((a, b) => {
      let aValue = a[sortKey];
      let bValue = b[sortKey];

      // Special handling for updated time from content
      if (sortKey === 'updatedAt' && a.content && b.content) {
        const aDate = getUpdatedTimeFromContent(a.content);
        const bDate = getUpdatedTimeFromContent(b.content);
        if (aDate && bDate) {
          aValue = aDate.getTime();
          bValue = bDate.getTime();
        }
      }
      // Special handling for 'name' column to sort by title
      else if (sortKey === 'name') {
        aValue = a.content ? getFirstHeading(a.content) : a.title || '';
        bValue = b.content ? getFirstHeading(b.content) : b.title || '';
      }

      if (!aValue) return 1;
      if (!bValue) return -1;

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  };

  const renderTable = (items: IMenuItem[], columns: { key: keyof IMenuItem; label: string }[]) => (
    <div className="overflow-x-auto">
      <table className="table-auto w-full divide-y divide-orange-500 dark:divide-green-700 bg-white dark:bg-gray-800 shadow rounded-lg">
        <thead className="hidden md:table-header-group bg-gray-50 dark:bg-gray-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {['name', 'createdAt', 'updatedAt'].includes(col.key) && (
                  <SortArray
                    label={col.label ?? col.key}
                    sortOrder={sortOrder}
                    onSortChange={(newOrder) => handleSortChange(newOrder, col.key)}
                    className="ml-2 inline-block"
                  />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {sortData(items).map((item) => (
            <tr key={item.id} className="md:table-row flex flex-col md:flex-row md:items-center">
              {columns.map((col) => (
                <>
                  <td
                    key={`header-${col.key}`}
                    className="block md:hidden px-4 py-2 text-sm font-bold text-gray-500 dark:text-gray-400"
                  >
                    {['createdAt', 'updatedAt'].includes(col.key) && (
                      <SortArray
                        label={col.label}
                        sortOrder={sortOrder}
                        onSortChange={(newOrder) => handleSortChange(newOrder, col.key)}
                        className="ml-2 inline-block"
                      />
                    )}
                  </td>
                  <td
                    key={String(col.key)}
                    className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200 whitespace-nowrap"
                  >
                    {['title', 'name'].includes(col.key) ? (
                      <Link
                        href={item.to || '#'}
                        className="text-info hover:underline"
                      >
                        {(item.content && col.key === 'name') ? getFirstHeading(item.content || '') : String(item[col.key])}
                      </Link>
                    ) : col.key === 'createdAt' || col.key === 'updatedAt' ? (
                      col.key === 'updatedAt' && item.content ? (
                        (() => {
                          const contentDate = getUpdatedTimeFromContent(item.content);
                          return contentDate ? contentDate.toLocaleString() : '-';
                        })()
                      ) : (
                        item[col.key] instanceof Date
                          ? (item[col.key] as Date).toLocaleString()
                          : '-'
                      )
                    ) : (
                      item.content ? getFirstHeading(item.content || '') : String(item[col.key])
                    )}
                  </td>
                </>
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
