# Fix: Resolve dynamic route issues for MarkdownPage

Date: 20-12-2024  
UpdatedAt: 23-12-2024 17:40:00

## Description of Changes:

- **Fixed Dynamic Route Handling**:
  Resolved issues in rendering nested routes for `MarkdownPage`, ensuring proper handling of `baseUrl`, `category`, and `slug`. Updated logic to dynamically generate correct paths for files and categories.

  **Updated Route Logic in `App.tsx`:**
  ```tsx
  const dropdownItems = [
    { name: 'legal-docs', label: 'Legal Docs', data: mds.legalDocs, baseUrl: '/legal-docs', description: 'Legal Documentation' },
    { name: 'changelogs', label: 'Changelogs', data: mds.changelogs, baseUrl: '/changelogs', description: 'Changelogs' },
    { name: 'tech-docs', label: 'Tech Docs', data: mds.techDocs, baseUrl: '/tech-docs', description: 'Technical Documentation' },
    { name: 'essential-insights', label: 'Essential Insights', data: mds.essentialInsights, baseUrl: '/essential-insights', description: 'Essential Insights Documentation' },
  ];

  {dropdownItems.map((item) => (
    <React.Fragment key={item.name}>
      <Route
        path={item.baseUrl}
        element={<MarkdownPage data={item.data} title={item.label} description={item.description} />}
      />
      <Route
        path={`${item.baseUrl}/:category?/:slug?`}
        element={<MarkdownPage data={item.data} title={item.label} description={item.description} />}
      />
    </React.Fragment>
  ))}
  ```

- **Improved Tree Building Logic**:
  Ensured consistent URL generation and hierarchy handling in `getTree()`.

  **Snippet from `mdFilesUtils.ts`:**
  ```tsx
  const relativePath = filePath
    .replace(new RegExp(`^.*?${branchInfo.folderName}/`), '') // Match folder name dynamically
    .replace(/\.md$/, ''); // Remove .md extension

  const parts = relativePath.split('/');
  if (parts.length === 1) {
    const fileName = parts[0];
    const fileItem: IMenuItem = {
      id: `${idPrefix}${fileName}`,
      title: fileName.replace(/-/g, ' ').replace(/^.*\//, ''),
      label: fileName,
      name: fileName,
      to: `${to}/${fileName}`,
      content,
      type: 'file',
      filepath: filePath,
    };
    tree.subMenu!.push(fileItem);
  }
  ```

- **Enhanced Debugging for Route Matching**:
  Added debug logs to identify issues with `category`, `slug`, and `data.subMenu`.

  **Example Log:**
  ```tsx
  useEffect(() => {
    console.log('Current Data:', data);
    console.log('Current SubMenu:', data.subMenu);
    console.log('Current Route Params:', { category, slug });
  }, [data, category, slug]);
  ```

- **Resolved Navigation Issues**:
  Fixed back navigation and ensured links redirect to valid paths.

---

#### Impact:

- Dynamic routes (`baseUrl/:category?/:slug?`) now render correctly for all documentation sections (e.g., `tech-docs`, `essential-insights`).
- Eliminated 404 errors for valid routes with improved path resolution.
- Streamlined the user experience when navigating between files and categories.

---

#### Files Affected:

- `App.tsx`  
- `utils/mdFilesUtils.ts`  
- `MarkdownPage.tsx`

---

#### Testing:

- Verified base routes (`/tech-docs`, `/essential-insights`, etc.) render as expected.
- Tested dynamic routes for all `category` and `slug` combinations.
- Confirmed proper functioning of navigation buttons and links.
- Ensured no regressions in the routing mechanism. 
---