import React from 'react';
import { useParams, Link } from 'react-router-dom';
import DisplayMd from '../../components/DisplayMd';
import Wrapper from '../../layout/Wrapper/Wrapper';
import { getChangelogFiles, getChangelogByRelPath } from '../../utils/changelogUtils';
import Header from '@/layout/Header/Header';
import { RecentChangesSvg, RecentChangesSvgIcon } from '@/assets/SvgIcons/RecentChangesSvg';

const ChangelogPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const currentChangelog = getChangelogByRelPath(slug);

  // Extract the first H1 heading from markdown content
  const getFirstHeading = (content: string): string => {
    const match = content?.match(/^#\s+(.+)$/m);
    return match ? match[1] : '';
  };

  const pageTitle = currentChangelog?.content ? getFirstHeading(currentChangelog.content) : '';

  const asideBlock = (
    <div className="text-left p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-info-dark flex items-center gap-2">
        <RecentChangesSvgIcon />
        Recent Changes
      </h2>
      <ul className="space-y-3">
        {getChangelogFiles().subMenu?.map((log) => (
          <li key={log.id} className="flex items-center">
            <RecentChangesSvg />
            <Link
              to={`/changelogs/${log.to}`}
              className={`block p-3 rounded-md transition-colors duration-200 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                slug === log.to ? 'bg-info-light text-info-dark font-semibold' : 'text-gray-600 dark:text-gray-300'
              }`}
            >
              {log.title}: {
                log.content ? (
                  <span className="font-semibold">{getFirstHeading(log.content)}</span>
                ) : (
                  <span className="italic">No title</span>
                )
              }
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <Wrapper
      header={
        <Header>
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-6  flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl changelog-title max-w-[70%] break-words">
                <span className="gradient-text py-6 block">
                  {pageTitle || 'Changelogs'}
                </span>
              </h1>
              {currentChangelog && (
                <Link 
                  to="/changelogs" 
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
      {currentChangelog ? (
        <div className="prose dark:prose-invert max-w-none">
          <DisplayMd id={currentChangelog.id} markdownContent={`${currentChangelog?.content}`} />
        </div>
      ) : (
        <div className="text-center py-12 px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Select a Changelog</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Choose a changelog from the list to view detailed information about updates and changes.
            </p>
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              {asideBlock}
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ChangelogPage;
