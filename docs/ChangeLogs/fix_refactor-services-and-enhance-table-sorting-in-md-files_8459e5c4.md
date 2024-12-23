# Refactor: services configuration and navigation logic & Fix: Enhanced Table Sorting in MarkdownPage Component

**Date:** December 23, 2024  
updated: 2024-12-23 17:18:00


Refactor services configuration and navigation logic, enhance changelog sorting

### Added
- Added creation and update date tracking for markdown files.
- Introduced sorting of changelogs by date in the navigation.
- Special handling for 'name' column sorting in the MarkdownPage table
- Support for sorting by first heading from content or title field

### Changed
- Refactored service configuration in `ConfigureServices.cs` for clarity.
- Updated navigation items hook to include sorted changelogs.

### Fixed
- Resolved navigation issues in changelog pages.
- Table sorting logic for the 'name' column now properly sorts based on displayed title
- Improved handling of null/undefined values in sort comparisons

### Code Snippets

#### Updated `sortData` Function
```tsx
const sortData = (data: IMenuItem[]) => {
  return data.sort((a, b) => {
    let aValue = a[sortKey];
    let bValue = b[sortKey];

    // Special handling for 'name' column to sort by title
    if (sortKey === 'name') {
      aValue = a.content ? getFirstHeading(a.content) : a.title || '';
      bValue = b.content ? getFirstHeading(b.content) : b.title || '';
    }

    if (!aValue) return 1;
    if (!bValue) return -1;

    return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
  });
};
```

#### Usage of `handleSortChange`
```tsx
const handleSortChange = (newOrder: SortOrder, key: keyof IMenuItem) => {
  setSortOrder(newOrder);
  setSortKey(key);
};
```

#### Rendering the Sortable Table
```tsx
<th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
  {col.label}
  {['name', 'createdAt', 'updatedAt'].includes(col.key) && (
    <SortArray
      sortOrder={sortOrder}
      onSortChange={(newOrder) => handleSortChange(newOrder, col.key)}
      className="ml-2 inline-block"
    />
  )}
</th>
```

### Technical Details
- Updated `sortData` function in MarkdownPage component to handle special cases
- Added conditional logic to extract proper title values for sorting
- Implemented fallback mechanism for sorting when content or title is missing

## Impact
These changes improve the user experience by ensuring that the table sorting functionality works consistently with the displayed data, particularly for the title column.
