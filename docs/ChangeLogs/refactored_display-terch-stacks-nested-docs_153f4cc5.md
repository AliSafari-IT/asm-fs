# Refactored `StacksPage.tsx` to utilize transformed Markdown data and improve folder handling
Date: 2025-01-05

## [1.0.0] - 2025-01-05
### Added
- Refactored `StacksPage.tsx` to utilize transformed Markdown data and improve folder handling.

### Detailed Log
The recent changes involved refactoring the `StacksPage.tsx` component to utilize transformed Markdown data and improve folder handling. This change aimed to enhance the overall performance and organization of the component.

### Code Snippets
#### StacksPage.tsx
```tsx
import Header from '@/layout/Header/Header';
import { Tooltip } from '@material-tailwind/react';
import { DialogActions, Title3 } from '@fluentui/react-components';
import transformMdFilesToStackData from './transformMdFilesToStackData';
import { IMenuItem } from '@/interfaces/IMenuItem';
import getSlug from '@/utils/getSlug';
import determineTextColor from '@/utils/determineTextColor';
import { getFirstHeading } from '@/utils/mdUtils';

const StacksPage: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<IMenuItem | null>(null);
  const [dynamicStackData, setDynamicStackData] = useState<Record<string, IMenuItem[]>>({});

  useEffect(() => {
    const transformedData = transformMdFilesToStackData('techDocs');
    console.log('Transformed Stack Data:', transformedData);
    setDynamicStackData(transformedData);
  }, []);
  
  // ... rest of the component logic
};
```

#### transformMdFilesToStackData.ts
```typescript
import { IMenuItem } from '@/interfaces/IMenuItem';
import { IStackGroup } from '@/interfaces/IStack';
import { getAllMdFiles } from '@/utils/mdFilesUtils';
import { getFirstHeading } from '@/utils/mdUtils';

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
            items.map((item) => {
                if (item.subMenu && Array.isArray(item.subMenu)) {
                    stackData[item.id] = processNestedSubMenu(item.subMenu);
                }
            });
        }
    }
    return stackData;
}
```

### Commit
- Commit hash: `153f4cc5ccce3c503dc713d0ca01aa265273d505`
- Detailed message: "Refactor StacksPage.tsx to utilize transformed Markdown data and improve folder handling."
