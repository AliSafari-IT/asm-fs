import React, { useState, useEffect } from 'react';
import SidebarNavItem from '@/layout/Navbar/SidebarNavItem';
import SortArray, { SortOrder } from '@/components/SortArray';
import { getFirstHeading } from '@/utils/mdUtils';
import { Link, useParams } from 'react-router-dom';
import DisplayMd from '@/components/DisplayMd';
import Wrapper from '@/layout/Wrapper/Wrapper';
import { getMdDocByRelPath } from '@/utils/mdFilesUtils';
import { RecentChangesSvg, RecentChangesSvgIcon } from '@/assets/SvgIcons/RecentChangesSvg';
import Header from '@/layout/Header/Header';
import { INavItem } from '@/interfaces/INavItem';

const MarkdownPage: React.FC<{ data: INavItem, title?: string, description?: string }> = ({ data, title = '', description = '' }) => {
  const { slug } = useParams<{ slug: string }>();
  const [currentDoc, setCurrentDoc] = useState(getMdDocByRelPath(slug, data.name as 'tech-docs' | 'legal-docs' | 'changelogs'));
  const [pageTitle, setPageTitle] = useState('');
  const mdFiles = data;

  useEffect(() => {
    setPageTitle(title);
  }, [title]);
  
  useEffect(() => {
    setCurrentDoc(getMdDocByRelPath(slug, data.name as 'tech-docs' | 'legal-docs' | 'changelogs'));
    // update page title
    document.title = `${title} | Asafarim`;
  }, [slug, data.name]);

  
  // Extract git hash from the file path
  const getGitHash = (path: string): string => {
    const match = path?.match(/_([a-f0-9]+)$/);
    return match ? match[1] : '-';
  };

  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSortChange = (newOrder: SortOrder) => {
    setSortOrder(newOrder);
  };

  const treeviewItems = (mdFiles.subMenu ?? []).map(log => ({
    ...log,
    title: pageTitle,
    icon: <RecentChangesSvg />,
    className: slug === log.to ? 'emphasized' : '',
    hash: getGitHash(log.to || '-')
  }));
  const asideBlock = (
    <div className="text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-info-dark flex items-center gap-2">
        <RecentChangesSvgIcon />
        {title}
      </h2>
      <SidebarNavItem
        sidebarNavData={(mdFiles.subMenu ?? [])
          .map(item => {
            const mostRecentDate = item.updatedAt ?? item.createdAt;
            return {
              ...item,
              mostRecentDate
            };
          })
          .sort((a, b) => {
            const dateA = a.mostRecentDate?.getTime() || 0;
            const dateB = b.mostRecentDate?.getTime() || 0;
            return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
          })
          .map(log => ({
            ...log,
            title: log.content ? getFirstHeading(log.content) : 'No title',
            icon: <RecentChangesSvg />,
            className: slug === log.to ? 'emphasized' : '',
            hash: getGitHash(log.to || '-')
          }))}
        className="space-y-1"
      />
    </div>
  );

  function getLastChangedAt(createdAt: Date | undefined, updatedAt: Date | undefined): React.ReactNode {
    if (createdAt && updatedAt && createdAt.getTime() === updatedAt.getTime()) {
      return createdAt.toLocaleString();
    }
    return (
      <>
        <span className="font-semibold">Created:</span>{' '}
        <span>{createdAt?.toLocaleString()}</span>
        <br />
        <span className="font-semibold">Last Changed:</span>{' '}
        <span>{updatedAt?.toLocaleString()}</span>
      </>
    );
  }

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
              {currentDoc && (
                <Link
                  to={`/${data.name}`}
                  className="inline-flex items-center gap-2 text-info-dark hover:text-info transition-colors duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Back to List</span>
                </Link>
              )}
            </div>
          </div>
        </Header>
      }
      sidebar={asideBlock}
    >
      {currentDoc ? (
        <div className="prose dark:prose-invert max-w-none">
          <DisplayMd id={currentDoc.id} markdownContent={`${currentDoc?.content}`} />
        </div>
      ) : (
        <div className="text-center py-8 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {description}
            </p>
            <div className="mt-8">
              <div className="flex justify-end mb-4">
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="text-center px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">#</th>
                      <th scope="col" className="text-center px-6 py-3  text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Title</th>
                      <th scope="col" className="text-center px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider align-middle">
                        Created/Changed At <SortArray sortOrder={sortOrder} onSortChange={handleSortChange} className="scale-x-150 ml-0 border-0 bg-transparent info " label="" />
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Git Hash</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                    {treeviewItems?.length > 0
                      && treeviewItems
                        .map(log => {
                          // Get the most recent date (either updated or created)
                          const mostRecentDate = log.updatedAt ?? log.createdAt;
                          return {
                            ...log,
                            title: log.content ? getFirstHeading(log.content) : 'No title',
                            hash: getGitHash(log.to || ''),
                            mostRecentDate
                          };
                        })
                        .sort((a, b) => {
                          const dateA = a.mostRecentDate?.getTime() || 0;
                          const dateB = b.mostRecentDate?.getTime() || 0;
                          return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
                        })
                        .map((log, index) => (
                          <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{index + 1}</td>
                            <td className="px-6 py-4">
                              <Link
                                to={log.to || ''}
                                className="text-info hover:text-info transition-colors duration-200"
                              >
                                {log.title}
                              </Link>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-primary">{getLastChangedAt(log.createdAt, log.updatedAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-500 dark:text-secondary">{log.hash}</td>
                          </tr>
                        ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default MarkdownPage;
