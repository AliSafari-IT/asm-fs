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

// import mdDocs from src\assets\mdDocs

const mdDocs = {
  ...import.meta.glob('@/assets/mdDocs/**/*.md', {
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
      createdAt: getCreationDate(content) || new Date(Date.now()),
      updatedAt: getUpdateDate(content) || getCreationDate(content) || new Date(Date.now()),
      subMenu: []
    };
  }),
  content: ''
};

const mdFileTree: INavItem = {
  id: 'tech-docs',
  title: 'Tech Docs',
  label: 'Tech Docs',
  name: 'asafarim-tech-docs',
  to: '#',
  icon: ChangeLogSvgIcon,
  createdAt: new Date(),
  updatedAt: new Date(),
  subMenu: Object.entries(mdDocs).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const type = slug.split('_')[0];
    const title = slug.split('_').slice(1).join('-');
    const to = `/tech-docs/${slug}`;
    return {
      id: `tech-docs-${slug}`,
      title: `${type.toUpperCase()}: ${title}`,
      label: slug,
      name: `tech-docs-${slug}`,
      to,
      filepath: path,
      icon: ChangeLogSvgIcon,
      content,
      createdAt: getCreationDate(content) || new Date(Date.now()),
      updatedAt: getUpdateDate(content) || getCreationDate(content) || new Date(Date.now()),
      subMenu: []
    };
  }),
  content: ''
};

export const getChangelogFiles = (): INavItem => {
  return changeLogs;
};

export const getMdFileTree = (): INavItem => {
  return mdFileTree;
};

export const getChangelogByRelPath = (to?: string): INavItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getChangelogFiles().subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByRelPath = (to?: string): INavItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/tech-docs/${to}`;
  return getMdFileTree().subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByFilePath = (filePath?: string): INavItem | undefined => {
  if (!filePath) return undefined;
  return getMdFileTree().subMenu?.find(doc => doc.filepath === filePath);
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


export default {
  getChangelogFiles,
  getChangelogByRelPath,
  getCreationDate,
  getUpdateDate,
  getMdDocByRelPath,
  getMdDocByFilePath,
  getMdFileTree,
};