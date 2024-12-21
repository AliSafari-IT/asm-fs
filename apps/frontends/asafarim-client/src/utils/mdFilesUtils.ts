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
const essentialInsightsTree: IMenuItem = getEssentialInsightsTree({
  ...import.meta.glob('@mdfiles/EssentialInsights/**/*.md', {
    as: 'raw',
    eager: true,
  }),
})
/**
 * Parses the EssentialInsights folder to structure categories and files.
 */
function getEssentialInsightsTree(mdFiles: Record<string, string>): IMenuItem {
  const tree: IMenuItem = {
    id: 'essential-insights',
    title: 'Essential Insights',
    label: 'Essential Insights',
    name: 'essential-insights',
    to: '/essential-insights',
    icon: ChangeLogSvgIcon,
    subMenu: [],
    content: '',
  };

  const categories: Record<string, IMenuItem> = {};

  for (const [filePath, content] of Object.entries(mdFiles)) {
    // Extract relative path from the full path
    // Remove the Vite alias path and convert to relative path
    const relativePath = filePath
      .replace(/^.*?EssentialInsights\//, '')  // Remove everything up to EssentialInsights/
      .replace(/\.md$/, '');  // Remove .md extension
    const parts = relativePath.split('/');
    
    // Handle both category files and root files
    if (parts.length === 1) {
      // Root level file
      const fileName = parts[0];
      const fileItem: IMenuItem = {
        id: `essential-insights-${fileName}`,
        title: fileName.replace(/-/g, ' '),
        label: fileName,
        name: fileName,
        to: `/essential-insights/${fileName}`,
        content,
      };
      tree.subMenu!.push(fileItem);
    } else {
      // Category file
      const category = parts[0];
      const fileName = parts[1];

      if (!categories[category]) {
        categories[category] = {
          id: `essential-insights-${category}`,
          title: category.replace(/-/g, ' '),
          label: category,
          name: category,
          to: `/essential-insights/${category}`,
          icon: ChangeLogSvgIcon,
          subMenu: [],
          content: '',
        };
        tree.subMenu!.push(categories[category]);
      }

      const fileItem: IMenuItem = {
        id: `essential-insights-${category}-${fileName}`,
        title: fileName.replace(/-/g, ' '),
        label: fileName,
        name: fileName,
        to: `/essential-insights/${category}/${fileName}`,
        content,
      };

      categories[category].subMenu!.push(fileItem);
    }
  }

  return tree;
}


export const getMdFiles = (): {
  essentialInsights: IMenuItem;
  legalDocs: IMenuItem; changelogs: IMenuItem; techDocs: IMenuItem 
} => {
  return {
    legalDocs: legalDocs,
    changelogs: changeLogs,
    techDocs: techdocsTree,
    essentialInsights: essentialInsightsTree
  };
};

export const getChangelogByRelPath = (to?: string): IMenuItem | undefined => {
  if (!to) return undefined;
  const fullPath = `/changelogs/${to}`;
  return getMdFiles().changelogs.subMenu?.find(doc => doc.to === fullPath);
};

export const getMdDocByRelPath = (to?: string, type: 'tech-docs' | 'legal-docs' | 'changelogs' | 'essential-insights' = 'tech-docs'): IMenuItem | undefined => {
  if (!to) return undefined;
  
  const docs = getMdFiles();
  const eIDocMap = {
    'essential-insights': docs.essentialInsights
  };

  // For tech docs, legal docs, and changelogs
  const docMap = {
    'tech-docs': docs.techDocs,
    'changelogs': docs.changelogs,
    'legal-docs': docs.legalDocs
  };

  if (type === 'essential-insights') {
    const parts = to.split('/');
    
    if (parts.length === 1) {
      // Root level file
      return eIDocMap[type].subMenu?.find(item => !item.subMenu && item.to === `/essential-insights/${parts[0]}`);
    } else {
      // Category file
      const [category, ...rest] = parts;
      const fileName = rest.join('/');
      
      // Find the category
      const categoryItem = eIDocMap[type].subMenu?.find(cat => 
        cat.title?.toLowerCase().replace(/ /g, '-') === category.toLowerCase()
      );
      
      if (!categoryItem?.subMenu) return undefined;

      // Find the file within the category
      return categoryItem.subMenu.find(doc => 
        doc.to === `/essential-insights/${category}/${fileName}`
      );
    }
  }
 // For tech docs, legal docs, and changelogs
 const items = docMap[type].subMenu ?? [];
 console.log(`Looking for ${type} document with slug:`, to);
 
 // Try to match by URL-friendly slug
 const result = items.find(doc => {
   // Convert the target slug to match our URL-friendly format
   const targetSlug = to.replace(/-/g, '_').replace('.md', '');
   const docOriginalName = doc.filepath?.replace('.md', '') || '';
   console.log('Comparing:', { targetSlug, docOriginalName, docSlug: doc.slug, docTo: doc.to });
   const docSlug = doc.slug?.replace('.md', '') || '';
   console.log('Comparing:', { targetSlug, docOriginalName, docSlug, docTo: doc.to });
   
   // Match by either the URL-friendly slug or the original filename
   return docSlug === to || docOriginalName === targetSlug;
 });

 console.log('Found document:', result);
 return result;
}


export const getMdDocByFilePath = (filePath?: string): IMenuItem | undefined => {
  if (!filePath) return undefined;
  return getMdFiles().techDocs.subMenu?.find(doc => doc.filepath === filePath);
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