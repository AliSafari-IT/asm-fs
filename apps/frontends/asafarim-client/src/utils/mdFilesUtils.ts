import { IMenuItem } from '@/interfaces/IMenuItem';
import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';


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

const legalDocsBranchInfo = {
  folderName: 'LegalDocs',
  id: 'legal-docs',
  title: 'Legal Docs',
  label: 'Legal Docs',
  name: 'legal-docs',
  to: '/legal-docs',
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

const changeLogBranchInfo = {
  folderName: 'ChangeLogs',
  id: 'changelogs',
  title: 'Change Logs',
  label: 'Change Logs',
  name: 'changelogs',
  to: '/changelogs',
  icon: ChangeLogSvgIcon,
  subMenu: [],
  content: '',
};

const changeLogs: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/ChangeLogs/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  changeLogBranchInfo
);

const techdocsTree: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/TechDocs/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  techDocsBranchInfo
);

const legalDocs: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/LegalDocs/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  legalDocsBranchInfo
);

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
 * Parses folder to structure categories and files.
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

export const getMdDocByRelPath = (to: string): IMenuItem | undefined => {
  if (!to) return undefined;

  const docs = getMdFiles();
  const allDocs = [
    docs.essentialInsights,
    docs.techDocs,
    docs.changelogs,
    docs.legalDocs,
  ];

  // Iterate over all document trees to find the matching file or category
  for (const docTree of allDocs) {
    const parts = to.split('/');

    if (parts.length === 1) {
      // Check root-level files
      const rootFile = docTree.subMenu?.find(
        (item) => item.type === 'file' && item.to!.endsWith(`/${parts[0]}`)
      );
      if (rootFile) return rootFile;
    } else {
      // Handle nested files in categories
      const [category, ...rest] = parts;
      const fileName = rest.join('/');

      const categoryItem = docTree.subMenu?.find(
        (item) => item.type === 'category' && item.name.toLowerCase() === category.toLowerCase()
      );

      const fileItem = categoryItem?.subMenu?.find(
        (file) => file.type === 'file' && file.to!.endsWith(`/${fileName}`)
      );

      if (fileItem) return fileItem;
    }
  }

  return undefined;
};


export const getMdDocByFilePath = (filePath?: string): IMenuItem | undefined => {
  if (!filePath) return undefined;
  return getMdFiles().techDocs.subMenu?.find((doc) => doc.filepath === filePath);
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
  getMdFiles,
  getChangelogByRelPath,
  getCreationDate,
  getUpdateDate,
  getMdDocByRelPath,
  getMdDocByFilePath,
};
