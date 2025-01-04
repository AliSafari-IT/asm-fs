import { IMenuItem } from '@/interfaces/IMenuItem';
import {  IStackGroup } from '@/interfaces/IStack';
import { getFirstHeading } from '@/utils/mdUtils';

function processSubMenu(subMenu: IMenuItem[]): IMenuItem[] {
    return subMenu.flatMap((item) => {
        if (!item.title || !item.filepath || !item.content) {
            console.warn('Invalid subMenu item skipped:', item);
            return []; // Skip invalid items
        }

        // Extract the file name (without extension) from the filepath
        const fileNameMatch = item.filepath.match(/([^\\/]+)(?=\.\w+$)/);
        const fileName = fileNameMatch ? fileNameMatch[0] : 'Not-Found';
        // Extract parent folder
        const folderParts = item.filepath.split('/');
        // Extract parent folder as the last part
        const parentFolder = folderParts.length > 1 ? folderParts[folderParts.length - 2] : '';
        const stackItem: IMenuItem = {
            name: item.title,
            slug: fileName, // Use file name as slug
            folderName: item.folderName || '',
            filepath: item.filepath || '',
            parentFolder: parentFolder,
            content: item.content,
            description: getFirstHeading(item.content.slice(0, 150)) || 'No description available.',
            color: item.color || 'var(--bg-info)',
            textColor: item.textColor || 'var(--text-secondary)',
            id: item.id || fileName,
            subMenu: item.subMenu ? processSubMenu(item.subMenu) : undefined,
            isExpandedByDefault: item.isExpandedByDefault || false,
            isExpanded: item.isExpanded || false,
        };

        // Recursively process nested subMenu items
        if (item.subMenu && Array.isArray(item.subMenu)) {
            return [stackItem, ...processSubMenu(item.subMenu)];
        }

        return stackItem;
    });
}


function transformMdFilesToStackData(mdFiles: IMenuItem): IStackGroup {
    const stackData: IStackGroup = {};
    console.log('transformMdFilesToStackData → mdFiles:', mdFiles);

    for (const [category, items] of Object.entries(mdFiles.subMenu!)) {
        const subMenu = (items as IMenuItem).subMenu || [];
        console.log('transformMdFilesToStackData → subMenu & items:', category, items);
        stackData[category] = processSubMenu(subMenu);
    }
    console.log('transformMdFilesToStackData → stackData:', stackData);

    return stackData;
}

export default transformMdFilesToStackData;
