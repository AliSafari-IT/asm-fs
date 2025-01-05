import { IMenuItem } from '@/interfaces/IMenuItem';
import { IStackGroup } from '@/interfaces/IStack';
import { getAllMdFiles } from '@/utils/mdFilesUtils';
import { getFirstHeading } from '@/utils/mdUtils';

function processNestedSubMenu(subMenu: IMenuItem[]): IMenuItem[] {
    return subMenu.flatMap((item) => {
        if (item.type === 'folder') {
            return item.subMenu ? processNestedSubMenu(item.subMenu) : [];
        } else if (item.content === '' || item.content === undefined || !item.filepath) {
            return [];
        }

        // Extract the file name (without extension) from the filepath
        const fileNameMatch = item.filepath.match(/([^\\/]+)(?=\.\w+$)/);
        const fileName = fileNameMatch ? fileNameMatch[0] : 'Not-Found';
        // Extract parent folder
        const folderParts = item.filepath.split('/');
        // Extract parent folder as the last part
        const parentFolder = folderParts.length > 1 ? folderParts[folderParts.length - 2] : '';
        const stackItem: IMenuItem = {
            name: item.name ?? item.title ?? fileName,
            title: item.title || fileName,
            slug: fileName, // Use file name as slug
            folderName: item.folderName || '',
            filepath: item.filepath || '',
            parentFolder: parentFolder,
            content: item.content,
            description: getFirstHeading(item.content.slice(0, 150)) || 'No description available.',
            color: item.color || 'var(--bg-info)',
            textColor: item.textColor || 'var(--text-secondary)',
            id: item.id || fileName,
            subMenu: item.subMenu ? processNestedSubMenu(item.subMenu) : undefined,
            isExpandedByDefault: item.isExpandedByDefault || false,
            isExpanded: item.isExpanded || false,
        };

        // Recursively process nested subMenu items
        if (item.subMenu && Array.isArray(item.subMenu)) {
            return [stackItem, ...processNestedSubMenu(item.subMenu)];
        }

        return stackItem;
    });
}


function transformMdFilesToStackData(docsBranch: string): IStackGroup {
    const mdFiles = getAllMdFiles();
    const docsBranchKey: keyof typeof mdFiles = docsBranch as keyof typeof mdFiles;
    const docsBranchFiles = mdFiles[docsBranchKey];

    if (!docsBranchFiles || typeof docsBranchFiles !== 'object') {
        console.error('Docs branch files are missing or not an object:', docsBranchFiles);
        return {};
    }

    const stackData: IStackGroup = {};

    for (const [category, items] of Object.entries(docsBranchFiles)) {
        if (category === 'subMenu' && Array.isArray(items)) {
            // Process the subMenu items
            items.map((item) => {
                // Recursively process nested subMenu items
                if (item.subMenu && Array.isArray(item.subMenu)) {
                    stackData[item.id] = processNestedSubMenu(item.subMenu);
                }
            });
        }
    }

    return stackData;
}
export default transformMdFilesToStackData;
