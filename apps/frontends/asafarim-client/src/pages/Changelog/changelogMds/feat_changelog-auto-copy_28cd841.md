# Enhanced Changelog Management with Auto-Copy Feature

Date: 2024-12-10
Updated: 2024-12-14

## Problem Statement

Previously, changelog files were scattered across different locations:
```typescript
// Old implementation - only looking in one location
const changelogFiles = import.meta.glob('@/pages/Changelog/changelogMds/*.md', {
  as: 'raw',
  eager: true,
});
```

## Features Added

- Implemented automatic changelog file copying mechanism
- Added new scripts in package.json for both root and frontend projects
- Enhanced build process to include changelog synchronization

## Technical Improvements

### Root Package.json Changes
```json
{
  "scripts": {
    "dev:frontend": "yarn copy-changelogs && yarn workspace @asm-fs/asafarim-client dev",
    "build:frontend": "yarn copy-changelogs && yarn workspace @asm-fs/asafarim-client build",
    "copy-changelogs": "xcopy /Y /I \"E:\\asm-fs\\docs\\ChangeLogs\\*.md\" \"E:\\asm-fs\\apps\\frontends\\asafarim-client\\src\\pages\\Changelog\\changelogMds\""
  }
}
```

### Frontend Package.json Changes
```json
{
  "scripts": {
    "dev": "yarn copy-changelogs && vite",
    "start": "yarn copy-changelogs && vite",
    "build": "yarn copy-changelogs && tsc -b && vite build",
    "copy-changelogs": "xcopy /Y /I \"E:\\asm-fs\\docs\\ChangeLogs\\*.md\" \"src\\pages\\Changelog\\changelogMds\""
  }
}
```

### Changelog Utils Update
```typescript
// Updated implementation - files are now automatically copied to the project directory
const changelogFiles = import.meta.glob('@/pages/Changelog/changelogMds/*.md', {
  as: 'raw',
  eager: true,
});
```

## Implementation Details

### File Copy Command
The solution uses Windows `xcopy` command with specific flags:
- `/Y`: Suppresses prompting to confirm overwriting an existing destination file
- `/I`: If destination does not exist and copying more than one file, assumes that destination must be a directory

### Directory Structure
```
E:/asm-fs/
├── docs/
│   └── ChangeLogs/            # Source changelog files
└── apps/
    └── frontends/
        └── asafarim-client/
            └── src/
                └── pages/
                    └── Changelog/
                        └── changelogMds/  # Development changelog files
```

## Developer Experience

- **Development Flow**: Running `yarn dev` or `yarn start` automatically syncs changelog files
- **Build Process**: Building the app includes all changelog files in the bundle
- **File Management**: 
  - Keep main changelog files in `docs/ChangeLogs/`
  - Files are automatically copied to the development directory
  - No manual file copying needed
