# Refactor StacksPage and related components
Date: 2025-01-04

## Changes Made:
1. **StacksPage.tsx**:
   - Updated state management to use `IMenuItem` instead of `IStackItem` to align with new data structures.
   - Enhanced navigation logic to handle parent folders and improved slug generation.
   - Added detailed logging for better debugging.

2. **transformMdFilesToStackData.ts**:
   - Refactored to process sub-menu items and extract relevant details, including handling of nested sub-menus.
   - Improved handling of invalid items with console warnings.

3. **StacksPage.css**:
   - Adjusted styles for better responsiveness and readability.
   - Changed text alignment and color for category titles.

## Code Snippets:
- **StacksPage.tsx**:
```typescript
const [selectedStack, setSelectedStack] = useState<IMenuItem | null>(null);
```
- **transformMdFilesToStackData.ts**:
```typescript
function processSubMenu(subMenu: IMenuItem[]): IMenuItem[] {
    return subMenu.flatMap((item) => {
        // Extract the file name (without extension) from the filepath
        const fileNameMatch = item.filepath.match(/([^\\/]+)(?=\.\w+$)/);
        const fileName = fileNameMatch ? fileNameMatch[0] : 'Not-Found';
        // ...
    });
}
```
- **StacksPage.css**:
```css
.category-title {
   color: var(--text-success);
}
```

## Navigate to stack items:

- **StacksPage.tsx**:
- **transformMdFilesToStackData.ts**:
- **StacksPage.css**:

```typescript
function navigateToProjects({
    selected,
    parentFolder,
  }: { selected?: IMenuItem; parentFolder?: string } = {}): void {
    if (!selected || !selected.name) {
      console.warn("navigateToProjects: Missing selected stack or name.");
      return;
    }

    // Generate the slug for the selected stack
    const slug = getSlug(selected.name);
    console.log("Slug:", slug);
    // Normalize parentFolder to avoid double slashes
    const normalizedParentFolder = parentFolder
      ? parentFolder.replace(/\/+$/, '') // Remove trailing slashes
      : '/tech-docs';

    // Construct the full navigation path
    const navto = `${normalizedParentFolder}/${slug}`.replace(/\/+/g, '/'); // Remove double slashes

    console.log("Navigate to:", navto);

    // Navigate to the constructed path
    window.location.href = navto;
  }

  function getParentFolders(path: string): string {
    if (!path) {
      console.warn("getParentFolder: Received an empty path.");
      return '';
    }

    // Remove any relative path notations like ../../
    const sanitizedPath = path.replace(/\.\.\//g, '').replace(/\/$/, '');

    // Normalize path: remove unwanted prefixes like '/docs/TechDocs'
    const normalizedPath = sanitizedPath.replace(/^\/?docs\/TechDocs/, '');

    // Split the path into parts
    const parts = normalizedPath.split('/');

    if (parts.length <= 1) {
      console.warn(`getParentFolder: Path "${path}" does not have a parent folder.`);
      return ''; // Return an empty string if no parent exists
    }

    // Remove the last part (assumed to be the file or current folder)
    parts.pop();

    // Join the remaining parts to reconstruct the parent folder path
    const parentFolders = `/tech-docs/${parts.join('/')}`.replace(/\/+/g, '/');

    console.log(
      "getParentFolder: path =",
      path,
      ", sanitizedPath =",
      sanitizedPath,
      ", parentFolder =",
      parentFolders
    );
    return parentFolders; // Return the valid parent folder path relative to /tech-docs
  }
  ```
  
## Summary:
These changes enhance the functionality and maintainability of the StacksPage component, ensuring better integration with the new data structures and improving user experience through refined styling.
