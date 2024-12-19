import { IMenuItem } from '@/interfaces/IMenuItem';
import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';
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


const changeLogs: IMenuItem = {...getTreeViewObject(changelogFiles, 'changelogs', 'Change Logs', ChangeLogSvgIcon, '/changelogs'), isForNavbar: false};
const techdocsTree: IMenuItem = {...getTreeViewObject(techDocs, 'tech-docs', 'Tech Docs', ChangeLogSvgIcon, '/tech-docs'), isForNavbar: true};
const legalDocs: IMenuItem = {...getTreeViewObject(legalDocsFiles, 'legal-docs', 'Legal Docs', ChangeLogSvgIcon, '/legal-docs'), isForNavbar: false};


export const getMdFiles = (): {
  legalDocs: IMenuItem; changelogs: IMenuItem; techDocs: IMenuItem 
} => {
  return {
    legalDocs: legalDocs,
    changelogs: changeLogs,
    techDocs: techdocsTree,
  };
};

export const getChangelogByRelPath = (to?: string): IMenuItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getMdFiles().changelogs.subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByRelPath = (to?: string, type: 'tech-docs' | 'legal-docs' | 'changelogs' = 'tech-docs'): IMenuItem | undefined => {
  if (!to) return undefined;
  
  const docs = getMdFiles();
  const docMap = {
    'tech-docs': docs.techDocs,
    'legal-docs': docs.legalDocs,
    'changelogs': docs.changelogs
  };

  return docMap[type].subMenu?.find(doc => doc.to === `/${type}/${to}`);
};

export const getMdDocByFilePath = (filePath?: string): IMenuItem | undefined => {
  if (!filePath) return undefined;
  return getMdFiles().techDocs.subMenu?.find(doc => doc.filepath === filePath);
};

function getTreeViewObject(mdFiles: Record<string, string>, name?: string, label?: string, icon?: JSX.Element, docurl?: string): IMenuItem {
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
    }) as unknown as IMenuItem[],
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