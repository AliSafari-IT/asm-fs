import { IMenuItem } from '@/interfaces/IMenuItem';
import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';
import { getCreationDate, getUpdateDate } from './mdUtils';


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

const projectsBranchInfo = {
  folderName: 'Projects',
  id: 'projects',
  title: 'Projects',
  label: 'Projects',
  name: 'projects',
  to: '/projects',
  icon: ChangeLogSvgIcon,
  subMenu: [],
  content: '',
};

const projectsTree: IMenuItem = getTree(
  {
    ...import.meta.glob('@mdfiles/Projects/**/*.md', {
      as: 'raw',
      eager: true,
    }),
  },
  projectsBranchInfo
)

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
  branchInfo: IMenuItem
): IMenuItem {
  const tree: IMenuItem = {
    ...branchInfo,
    subMenu: [],
    content: '',
  };

  const idPrefix = `${branchInfo.id}-`;
  const to = `${branchInfo.to}`;
  const folders: Record<string, IMenuItem> = {};

  for (const [filePath, content] of Object.entries(mdFiles)) {
    // Extract relative path from filePath
    const relativePath = filePath
      .replace(new RegExp(`^.*?${branchInfo.folderName}/`), '') // Match folder name dynamically
      .replace(/\.md$/, ''); // Remove .md extension

    const parts = relativePath.split('/');
    const createdAt = getCreationDate(content) || new Date(0); // Fallback to Unix epoch
    const updatedAt = getUpdateDate(content) || createdAt;

    let current = tree;

    if (parts.length === 1) {
      // Root-level file
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
        createdAt,
        updatedAt,
      });
    } else {
      // Nested file or folder

      for (let i = 0; i < parts.length; i++) {
        const part = parts[i];

        if (i === parts.length - 1) {
          // Add file
          current.subMenu!.push({
            id: `${idPrefix}${part}`,
            title: part.replace(/-/g, ' '),
            label: part,
            name: part,
            to: `${current.to}/${part}`,
            content,
            type: 'file',
            filepath: filePath,
            createdAt,
            updatedAt,
          });
        } else {
          // Add folder if it doesn't exist
          if (!folders[part]) {
            const folderTo = `${current.to}/${part}`;
            const folder: IMenuItem = {
              id: `${idPrefix}${part}`,
              title: part.replace(/-/g, ' '),
              label: part,
              name: part,
              to: folderTo,
              icon: ChangeLogSvgIcon,
              subMenu: [],
              content: '',
              type: 'folder',
            };
            folders[part] = folder;
            current.subMenu!.push(folder);
          }
          current = folders[part];
        }
      }
    }
  }

  // Ensure all folders are included, even if empty
  for (const folderName in folders) {
    if (!folders[folderName].subMenu) {
      folders[folderName].subMenu = [];
    }
  }
  // Sort folders and files
  tree.subMenu = tree.subMenu!.sort((a, b) => {
    if (a.type === 'folder' && b.type !== 'folder') return -1;
    if (a.type !== 'folder' && b.type === 'folder') return 1;
    const dateA = a.updatedAt?.getTime() || 0;
    const dateB = b.updatedAt?.getTime() || 0;
    return dateB - dateA; // Sort descending by updatedAt
  });

  // console.log('Generated Tree:', JSON.stringify(tree, null, 2));
  return tree;
}

export const getMdFiles = (): {
  essentialInsights: IMenuItem;
  legalDocs: IMenuItem;
  changelogs: IMenuItem;
  techDocs: IMenuItem;
  projects: IMenuItem;
} => {
  return {
    legalDocs: legalDocs,
    changelogs: changeLogs,
    techDocs: techdocsTree,
    essentialInsights: essentialInsightsTree,
    projects: projectsTree
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
    docs.projects
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
        (item) => item.type === 'folder' && item.name.toLowerCase() === category.toLowerCase()
      );

      const fileItem = categoryItem?.subMenu?.find(
        (file) => file.type === 'file' && file.to!.endsWith(`/${fileName}`)
      );

      if (fileItem) return fileItem;
    }
  }

  return undefined;
};

export default {
  getMdFiles,
  getChangelogByRelPath,
  getCreationDate,
  getUpdateDate,
  getMdDocByRelPath,
};
