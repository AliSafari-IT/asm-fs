import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';
import { INavItem } from '@/interfaces/INavItem';

// Import changelog files using Vite's glob import syntax and return them as an object
const changelogFiles = {
  ...import.meta.glob('@mdfiles/ChangeLogs/*.md', {
    as: 'raw',
    eager: true,
  }),
};

// import technical documentations using Vite's glob import syntax and return them as an object
const techDocs = {
  ...import.meta.glob('@mdfiles/TechDocs/**/*.md', {
    as: 'raw',
    eager: true,
  }),
};

const legalDocsFiles = {
  ...import.meta.glob('@mdfiles/LegalDocs/**/*.md', {
    as: 'raw',
    eager: true,
  }),
};


const changeLogs: INavItem = getTreeViewObject(changelogFiles, 'changelogs', 'Change Logs', ChangeLogSvgIcon, '/changelogs');
const techdocsTree: INavItem = getTreeViewObject(techDocs, 'tech-docs', 'Tech Docs', ChangeLogSvgIcon, '/tech-docs');
const legalDocs: INavItem = getTreeViewObject(legalDocsFiles, 'legal-docs', 'Legal Docs', ChangeLogSvgIcon, '/legal-docs');


export const getMdFiles = (): {
  legalDocs: INavItem; changelogs: INavItem; techDocs: INavItem 
} => {
  return {
    legalDocs: legalDocs,
    changelogs: changeLogs,
    techDocs: techdocsTree,
  };
};

export const getChangelogByRelPath = (to?: string): INavItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getMdFiles().changelogs.subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByRelPath = (to?: string): INavItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/tech-docs/${to}`;
  return getMdFiles().techDocs.subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByFilePath = (filePath?: string): INavItem | undefined => {
  if (!filePath) return undefined;
  return getMdFiles().techDocs.subMenu?.find(doc => doc.filepath === filePath);
};

function getTreeViewObject(mdFiles: Record<string, string>, name?: string, label?: string, icon?: JSX.Element, docurl?: string): INavItem {
  // remove trailing slash
  const baseurl = docurl?.replace(/\/$/, '');
  return {
    id: `asm-mds-${name}`,
    title: label || 'Tree View Title',
    label: label || 'Tree View Label',
    name: name,
    to: '#',
    icon,
    content: '',
    subMenu: Object.entries(mdFiles).map(([path, content]) => {
      const parts = path.split('/');
      const slug = parts.pop()?.replace('.md', '') || '';
      const isDirectory = parts.length > 0 && !slug;
      const type = slug.split('_')[0];
      const title = slug.split('_').slice(1).join('-');
      const to = `${baseurl}/${slug}`;
      const filepath = path;
      const createdAt = getCreationDate(content) || new Date(Date.now());
      const updatedAt = getUpdateDate(content) || createdAt;
      const id = `${name}-${slug}`;
      const label = slug;
      const nameValue = `${name}-${slug}`;

      if (isDirectory) {
        const subMdFiles = Object.fromEntries(
          Object.entries(mdFiles).filter(([subPath]) => subPath.startsWith(path))
        );
        return getTreeViewObject(subMdFiles, name, label, icon, docurl);
      }

      return {
        id,
        slug,
        type,
        title: `${type.toUpperCase()}: ${title}`,
        label,
        name: nameValue,
        to,
        filepath,
        icon,
        content,
        createdAt,
        updatedAt,
        subMenu: []
      };
    }) as unknown as INavItem[],
  };
}

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
  getMdFiles,
  getChangelogByRelPath,
  getCreationDate,
  getUpdateDate,
  getMdDocByRelPath,
  getMdDocByFilePath,
};