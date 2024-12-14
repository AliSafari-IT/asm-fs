**Type**: fix
**Date**: December 14, 2024
**Author**: kianSafari

### Fixed TechDocs Routing and Navigation

Fixed issues with the technical documentation routing and navigation system:

- Fixed routing in TechDocs page to properly handle document navigation
- Updated navigation structure to use correct URL paths
- Switched from `getMdDocByFilePath` to `getMdDocByRelPath` for proper slug handling
- Ensured consistent URL patterns between router and navigation links
- Updated page titles and descriptions to reflect tech docs content

### Technical Changes
- Modified `TechDocsPage.tsx` to use correct document lookup function
- Updated navigation item creation in `mdFilesUtils.ts`
- Aligned route patterns in `App.tsx` with navigation structure
- Fixed URL path generation for tech docs navigation items
