# Update: MarkdownPage Functionality Enhancements

**Date:** December 23, 2024  
**Commit:** 8459e5c46f500c6dbb394f6ffac1f5f637e2b29f

## Changes Made

### Added
- Functionality to extract and display the updated time from markdown content.
- Improved sorting logic for date columns to use content-based dates.

### Code Snippets

#### Updated `getUpdatedTimeFromContent` Function
```tsx
const getUpdatedTimeFromContent = (content: string) => {
    const lines = content.split('\n');
    const updateLine = lines.find(line => line.toLowerCase().startsWith('updated:'));
    if (updateLine) {
        const dateMatch = updateLine.match(/updated:\s*(.+)/i);
        if (dateMatch) {
            return new Date(dateMatch[1]);
        }
    }
    return null;
};
```

#### Updated `sortData` Function
```tsx
const sortData = (data: IMenuItem[]) => {
    return data.sort((a, b) => {
        let aValue = a[sortKey];
        let bValue = b[sortKey];

        // Special handling for updated time from content
        if (sortKey === 'updatedAt' && a.content && b.content) {
            const aDate = getUpdatedTimeFromContent(a.content);
            const bDate = getUpdatedTimeFromContent(b.content);
            if (aDate && bDate) {
                aValue = aDate.getTime();
                bValue = bDate.getTime();
            }
        }
        // Special handling for 'name' column to sort by title
        else if (sortKey === 'name') {
            aValue = a.content ? getFirstHeading(a.content) : a.title || '';
            bValue = b.content ? getFirstHeading(b.content) : b.title || '';
        }

        if (!aValue) return 1;
        if (!bValue) return -1;

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });
};
```

### Impact
These changes enhance the user experience by ensuring that the updated time is accurately displayed and sorted, providing better context for the data presented in the MarkdownPage component.
