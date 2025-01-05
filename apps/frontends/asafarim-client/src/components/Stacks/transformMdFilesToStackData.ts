import { IMenuItem } from '@/interfaces/IMenuItem';
import { IStackGroup } from '@/interfaces/IStack';
import { getAllMdFiles } from '@/utils/mdFilesUtils';
import { getFirstHeading } from '@/utils/mdUtils';

function processNestedSubMenu(subMenu: IMenuItem[]): IMenuItem[] {
    return subMenu.flatMap((item) => {
        if (item.type === 'folder') {
            return item.subMenu ? processNestedSubMenu(item.subMenu) : [];
        } 

        const filepath = `${item.filepath}`;
        const fileContent = `${item.content}`;
        // Extract the file name (without extension) from the filepath
        const fileNameMatch = filepath.match(/([^\\/]+)(?=\.\w+$)/);
        const fileName = fileNameMatch ? fileNameMatch[0] : 'Not-Found';
        // Extract parent folder
        const folderParts = filepath.split('/');
        // Extract parent folder as the last part
        const parentFolder = folderParts.length > 1 ? folderParts[folderParts.length - 2] : '';
        const stackItem: IMenuItem = {
            name: item.name ?? item.title ?? fileName,
            title: item.title || fileName,
            slug: fileName, // Use file name as slug
            folderName: item.folderName || '',
            filepath: filepath,
            parentFolder: parentFolder,
            content: fileContent,
            description: getFirstHeading(fileContent.slice(0, 150)) || 'No description available.',
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
    const stackData: IStackGroup = {};

    console.log(docsBranch, docsBranchFiles);
    for (const [category, items] of Object.entries(docsBranchFiles)) {
        if (category === 'subMenu' && Array.isArray(items)) {
            console.log("transformMdFilesToStackData category: " + category, items);
            // Process the subMenu items
            items.map((item) => {
                // Recursively process nested subMenu items
                if (item.subMenu && Array.isArray(item.subMenu)) {
                    stackData[item.id] = processNestedSubMenu(item.subMenu);
                } 

                if(!item.subMenu) {
                    stackData[item.id] = [item];
                }
            });
        }
    }
    console.log("transformMdFilesToStackData stackData: " , stackData);
    return stackData;
}
export default transformMdFilesToStackData;
