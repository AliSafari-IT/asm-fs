# Improve Markdown Page File/Folder View to Table Layout

Date: 02-01-2025
Git Hash: 274c7a44
Type: Feature

## Summary

This update enhances the file and folder view within the `MarkdownPage` component by transitioning from a grid-based layout to a table-based layout. The new structure improves readability, interactivity, and accessibility.

---

## Changes

### 1. Updated `renderDirectoryContent`
Enhanced the method to render folders and files in a table format:
```tsx
const renderDirectoryContent = () => {
  const folders = currentDirectory?.subMenu?.filter(item => item.type === 'folder');
  const files = currentDirectory?.subMenu?.filter(item => item.type === 'file');

  return (
    <div>
      {(folders || files) && (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-secondary text-primary">
              <th className="p-4">Type</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {folders?.map(folder => (
              <tr key={folder.id} className="hover:bg-primary transition">
                <td className="p-4 text-info">📂</td>
                <td className="p-4">
                  <a
                    href={folder.to || '#'}
                    className="hover:underline text-teams-purple"
                    onClick={e => { e.preventDefault(); navigate(folder.to || '#'); }}
                  >
                    {folder.title}
                  </a>
                </td>
                <td className="p-4">{folder.description || 'No description available'}</td>
                <td className="p-4">
                  <button className="btn-secondary"
                  onClick={e => { e.preventDefault(); navigate(folder.to || '#'); }}>Details</button>
                </td>
              </tr>
            ))}
            {files?.map(file => (
              <tr key={file.id} className="hover:bg-primary transition">
                <td className="p-4 text-info">📄</td>
                <td className="p-4">
                  <a
                    href={file.to || '#'}
                    className="hover:underline text-teams-blue"
                    onClick={e => { e.preventDefault(); navigate(file.to || '#'); }}
                  >
                    {getFirstHeading(file.content || '') || file.title}
                  </a>
                </td>
                <td className="p-4">{file.description || 'No description available'}</td>
                <td className="p-4">
                  <button className="btn-secondary"
                  onClick={e => { e.preventDefault(); navigate(file.to || '#'); }}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};
```

### 2. Styling Updates
Added new TailwindCSS styles to support table layout:
```css
table th {
  @apply p-4 bg-secondary text-primary;
}
table td {
  @apply p-4;
}
table tr:hover {
  @apply bg-primary;
}
```

### 3. Improved Navigation and Interactivity
- Included clickable links for folder and file names.
- Added hover effects and button actions to enhance user experience.

---

## Benefits

- **Improved Usability**: The table layout provides better visual organization.
- **Accessibility**: Simplified navigation with clear, clickable elements.
- **Enhanced Design**: Integrated with existing TailwindCSS theme variables.

---

## Testing

1. Verify the table layout on different screen sizes.
2. Test folder and file navigation using the links.
3. Confirm hover effects and button interactions.

---