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
const techDocsBranchInfo = {
  folderName: 'TechDocs',
  id: 'tech-docs',
  title: 'Tech Docs',
  label: 'Tech Docs',
  name: 'tech-docs',
  to: '/tech-docs',
  icon: ChangeLogSvgIcon,
  subMenu: [],
  content: '',
};

const essentialInsightsBranchInfo = {
  folderName: 'EssentialInsights',
  id: 'essential-insights',
  title: 'Essential Insights',
  label: 'Essential Insights',
  name: 'essential-insights',
  to: '/essential-insights',
  icon: ChangeLogSvgIcon,
  subMenu: [],
  content: '',
};

const legalDocsFiles = {
  ...import.meta.glob('@mdfiles/LegalDocs/**/*.md', {
    as: 'raw',
    eager: true,
  }),
};

const changeLogs: IMenuItem = {
  ...getTreeViewObject(changelogFiles, 'changelogs', 'Change Logs', ChangeLogSvgIcon, '/changelogs'),
  isForNavbar: false,
};

const techdocsTree: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/TechDocs/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  techDocsBranchInfo
);

const legalDocs: IMenuItem = {
  ...getTreeViewObject(legalDocsFiles, 'legal-docs', 'Legal Docs', ChangeLogSvgIcon, '/legal-docs'),
  isForNavbar: false,
};

const essentialInsightsTree: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/EssentialInsights/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  essentialInsightsBranchInfo
);

/**
 * Parses the EssentialInsights folder to structure categories and files.
 */
// Utility function to get tree structure for Markdown files
function getTree(
  mdFiles: Record<string, string>,
  branchInfo: any
): IMenuItem {
  const tree: IMenuItem = {
    ...branchInfo,
    subMenu: [],
    content: '',
  };

  const idPrefix = `${branchInfo.id}-`;
  const to = `${branchInfo.to}`;
  const categories: Record<string, IMenuItem> = {};

  for (const [filePath, content] of Object.entries(mdFiles)) {
    // Extract relative path from filePath
    const relativePath = filePath
      .replace(new RegExp(`^.*?${branchInfo.folderName}/`), '') // Match folder name dynamically
      .replace(/\.md$/, ''); // Remove .md extension

    const parts = relativePath.split('/');

    if (parts.length === 1) {
      // Root level file
      const fileName = parts[0];
      tree.subMenu!.push({
        id: `${idPrefix}${fileName}`,
        title: fileName.replace(/-/g, ' ').replace(/^.*\//, ''),
        label: fileName,
        name: fileName,
        to: `${to}/${fileName}`,
        content,
        type: 'file',
        filepath: filePath,
      });
    } else {
      // Nested category or file
      const category = parts[0];
      const fileName = parts.slice(1).join('/'); // Handle deeper paths

      if (!categories[category]) {
        categories[category] = {
          id: `${idPrefix}${category}`,
          title: category.replace(/-/g, ' '),
          label: category,
          name: category,
          to: `${to}/${category}`,
          icon: ChangeLogSvgIcon,
          subMenu: [],
          content: '',
          type: 'category',
        };
        tree.subMenu!.push(categories[category]);
      }

      categories[category].subMenu!.push({
        id: `${idPrefix}${category}-${fileName}`,
        title: fileName.replace(/-/g, ' ').replace(/^.*\//, ''),
        label: fileName,
        name: fileName,
        to: `${to}/${category}/${fileName}`,
        content,
        type: 'file',
        filepath: filePath,
      });
    }
  }

  return tree;
}

export const getMdFiles = (): {
  essentialInsights: IMenuItem;
  legalDocs: IMenuItem;
  changelogs: IMenuItem;
  techDocs: IMenuItem;
} => {
  return {
    legalDocs: legalDocs,
    changelogs: changeLogs,
    techDocs: techdocsTree,
    essentialInsights: essentialInsightsTree,
  };
};

export const getChangelogByRelPath = (to?: string): IMenuItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getMdFiles().changelogs.subMenu?.find((doc) => doc.to === fullPath);
};

export const getMdDocByRelPath = (
  to: string,
  type: 'tech-docs' | 'legal-docs' | 'changelogs' | 'essential-insights' = 'tech-docs'
): IMenuItem | undefined => {
  if (!to) return undefined;

  const docs = getMdFiles();
  const eIDocMap = {
    'essential-insights': docs.essentialInsights,
    'tech-docs': docs.techDocs,
  };

  // For tech docs, legal docs, and changelogs
  const docMap = {
    'tech-docs': docs.techDocs,
    'changelogs': docs.changelogs,
    'legal-docs': docs.legalDocs,
  };

  if (type === 'essential-insights' || type === 'tech-docs') {
    const parts = to.split('/');

    if (parts.length === 1) {
      // Root level file
      return eIDocMap[type].subMenu?.find(
        (item) => !item.subMenu && (item.to === `/essential-insights/${parts[0]}` || item.to === `/tech-docs/${parts[0]}`)
      );
    } else {
      // Category file
      const [category, ...rest] = parts;
      const fileName = rest.join('/');

      // Find the category
      const categoryItem = eIDocMap[type].subMenu?.find(
        (cat) => cat.title?.toLowerCase().replace(/ /g, '-') === category.toLowerCase()
      );

      if (!categoryItem?.subMenu) return undefined;

      // Find the file within the category
      return categoryItem.subMenu.find(
        (doc) => doc.to === (`/essential-insights/${category}/${fileName}` || `/tech-docs/${category}/${fileName}`)
      );
    }
  }
  // For tech docs, legal docs, and changelogs
  const items = docMap[type].subMenu ?? [];
  console.log(`Looking for ${type} document with slug:`, to);

  // Try to match by URL-friendly slug
  const result = items.find((doc) => {
    // Convert the target slug to match our URL-friendly format
    const targetSlug = to.replace(/-/g, '_').replace('.md', '');
    const docOriginalName = doc.filepath?.replace('.md', '') || '';
    const docSlug = doc.slug?.replace('.md', '') || '';

    // Match by either the URL-friendly slug or the original filename
    return docSlug === to || docOriginalName === targetSlug;
  });

  return result;
};

export const getMdDocByFilePath = (filePath?: string): IMenuItem | undefined => {
  if (!filePath) return undefined;
  return getMdFiles().techDocs.subMenu?.find((doc) => doc.filepath === filePath);
};

function getTreeViewObject(
  mdFiles: Record<string, string>,
  name?: string,
  label?: string,
  icon?: JSX.Element,
  docurl?: string
): IMenuItem {
  const baseurl = docurl?.replace(/\/$/, '') || '';
  const tree: IMenuItem = {
    id: name || '',
    title: label || '',
    label: label || '',
    name: name || '',
    to: baseurl,
    icon,
    content: '',
    subMenu: [],
  };

  const categories: Record<string, IMenuItem> = {};

  Object.entries(mdFiles).forEach(([path, content]) => {
    const relativePath = path.split('/TechDocs/').pop() || path;
    const parts = relativePath.split('/');

    if (parts.length === 1) {
      // Root-level file
      const fileName = parts[0].replace('.md', '');
      const fileItem: IMenuItem = {
        id: `${name}-${fileName}`,
        title: fileName.replace(/-/g, ' '),
        label: fileName,
        name: fileName,
        to: `${baseurl}/${fileName}`,
        filepath: path,
        content,
      };
      tree.subMenu!.push(fileItem);
    } else {
      // Nested file
      const category = parts[0];
      const fileName = parts[parts.length - 1].replace('.md', '');

      if (!categories[category]) {
        categories[category] = {
          id: `${name}-${category}`,
          title: category.replace(/-/g, ' '),
          label: category,
          name: category,
          to: `${baseurl}/${category}`,
          subMenu: [],
        };
        tree.subMenu!.push(categories[category]);
      }

      const fileItem: IMenuItem = {
        id: `${name}-${category}-${fileName}`,
        title: fileName.replace(/-/g, ' '),
        label: fileName,
        name: fileName,
        to: `${baseurl}/${category}/${fileName}`,
        filepath: path,
        content,
      };
      categories[category].subMenu!.push(fileItem);
    }
  });

  return tree;
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
