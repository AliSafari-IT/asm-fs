import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';
import { INavItem } from '@/interfaces/INavItem';

export interface ChangelogItem {
  slug: string;
  title: string;
  filepath: string;
}

// Import changelog files using Vite's glob import
const changelogFiles = {
  ...import.meta.glob('@/pages/Changelog/changelogMds/*.md', {
    as: 'raw',
    eager: true,
  }),
  ...import.meta.glob('/docs/ChangeLogs/*.md', {
    as: 'raw',
    eager: true,
  }),
};

const changeLogs: INavItem = {
  id: 'changelog-docs',
  title: 'Recent Changes',
  label: 'Recent Changes',
  name: 'asafarim-changelogs',
  to: '#',
  icon: ChangeLogSvgIcon,
  createdAt: new Date(),
  updatedAt: new Date(),
  subMenu: Object.entries(changelogFiles).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const type = slug.split('_')[0];
    const title = slug.split('_').slice(1).join('-');
    const to = `/changelogs/${slug}`;
    return {
      id: `changelog-${slug}`,
      title: `${type.toUpperCase()}: ${title}`,
      label: slug,
      name: `changelog-${slug}`,
      to: `${to}`,
      filepath: path,
      icon: ChangeLogSvgIcon,
      content,
      createdAt: getCreationDate(content) || new Date('2024-09-07T17:18:11+01:00'),
      updatedAt: getUpdateDate(content) || getCreationDate(content) || new Date('2024-09-07T17:18:11+01:00'),
      subMenu: []
    };
  }),
  content: ''
};

export const getChangelogFiles = (): INavItem => {
  return changeLogs;
};

export const getChangelogByRelPath = (to?: string): INavItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getChangelogFiles().subMenu?.find(doc => doc.to === fullPath);
};

function getCreationDate(content: string): Date | undefined {
  const match = content?.match(/(?:\*\*Date:?\*\*|Date:) (.+?)(?:\n|$)/m);
  if (!match) return undefined;
  const dateStr = match[1].trim();
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}

function getUpdateDate(content: string): Date | undefined {
  const match = content?.match(/(?:\*\*(?:Updated|Modified|Changed|Last Changed):?\*\*|(?:Updated|Modified|Changed|Last Changed):) (.+?)(?:\n|$)/m);
  if (!match) return undefined;
  const dateStr = match[1].trim();
  // Try parsing both formats: "December 07, 2024" and "10/10/2024, 1:00:00 AM"
  const parsedDate = new Date(dateStr);
  return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
}
