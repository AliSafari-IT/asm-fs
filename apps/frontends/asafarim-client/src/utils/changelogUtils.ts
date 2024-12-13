import { ChangeLogSvgIcon } from '../assets/SvgIcons/ChangeLogSvgIcon';
import { INavItem } from '@/interfaces/INavItem';

export interface ChangelogItem {
  slug: string;
  title: string;
  filepath: string;
}

// Import changelog files using Vite's glob import
const changelogFiles = import.meta.glob('@/pages/Changelog/changelogMds/*.md', {
  as: 'raw',
  eager: true,
});

const changeLogs: INavItem = {
  id: 'changelog-docs',
  title: 'Changelogs',
  label: 'Changelogs',
  name: 'asafarim-changelogs',
  to: '#',
  icon: ChangeLogSvgIcon,
  subMenu: Object.entries(changelogFiles).map(([path, content]) => {
    const slug = path.split('/').pop()?.replace('.md', '') || '';
    const type = slug.split('_')[0];
    const title = slug.split('_').slice(1).join('-');
    return {
      id: `changelog-${slug}`,
      title: `${type.toUpperCase()}: ${title}`,
      label: slug,
      name: `changelog-${slug}`,
      to: `${slug}`,
      filepath: path,
      icon: ChangeLogSvgIcon,
      content
    };
  }),
  content: ''
};

export const getChangelogFiles = (): INavItem => {
  return changeLogs;
};

export const getChangelogByRelPath = (to?: string): INavItem | undefined => {
  return getChangelogFiles().subMenu?.find(doc => doc.to === to);
};
