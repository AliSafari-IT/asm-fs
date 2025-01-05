import React, { useState, useEffect, useMemo } from 'react';
import './StacksPage.css';
import { ActionButton, Modal, SearchBox } from '@fluentui/react';
import Header from '@/layout/Header/Header';
import { Tooltip } from '@material-tailwind/react';
import { DialogActions, Title3 } from '@fluentui/react-components';
import transformMdFilesToStackData from './transformMdFilesToStackData';
import { IMenuItem } from '@/interfaces/IMenuItem';
import getSlug from '@/utils/getSlug';
import generateCategoryColors from '@/utils/categoryColors';
import determineTextColor from '@/utils/determineTextColor';
import { getFirstHeading } from '@/utils/mdUtils';

interface StacksPageProps {
  docBranch: string;
  stackTitle: string;
}

const StacksPage: React.FC<StacksPageProps> = ({ docBranch, stackTitle }) => {
  const [selectedStack, setSelectedStack] = useState<IMenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dynamicStackData, setDynamicStackData] = useState<Record<string, IMenuItem[]>>({});

  const basePath = docBranch === 'techDocs'
    ? '/tech-docs'
    : docBranch === 'changelogs'
      ? '/changelogs'
      : '/legal-docs';

  useEffect(() => {
    const transformedData = transformMdFilesToStackData(docBranch);
    console.log('Transformed Stack Data:', transformedData);
    setDynamicStackData(transformedData);
  }, []);

  const handleCardClick = (stack: IMenuItem) => {
    setSelectedStack(stack);
  };

  const closeModal = () => {
    setSelectedStack(null);
  };
  const handleClear = () => setSearchTerm('');

  const handleSearch = (e?: { target: { value: string } }) => {
    if (e) {
      setSearchTerm(e.target.value);
    }
  };

  const filteredData = Object.entries(dynamicStackData).reduce((acc, [category, stacks]) => {
    const filteredStacks = stacks?.filter((stack) =>
      stack?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredStacks?.length) {
      acc[category] = filteredStacks;
    }
    return acc;
  }, {} as typeof dynamicStackData);


  function navigateToProjects({
    selected,
    parentFolder,
  }: { selected?: IMenuItem; parentFolder?: string } = {}): void {
    if (!selected || !selected.name) {
      console.warn("navigateToProjects: Missing selected stack or name.");
      return;
    }

    const slug = getSlug(selected.name);
    console.log("Slug:", slug);
    const normalizedParentFolder = parentFolder
      ? parentFolder.replace(/\/+$/, '') // Remove trailing slashes
      : basePath;

    const navto = docBranch === 'changelogs' ? `${basePath}/${slug}` : `${normalizedParentFolder}/${slug}`.replace(/\/+/g, '/');

    console.log("Navigate to:", navto);
    window.location.href = navto;
  }

  function getParentFolders(path: string): string {
    if (!path) {
      console.warn('getParentFolder: Received an empty path.');
      return '';
    }

    // Remove any relative path notations like ../../ and normalize slashes
    const sanitizedPath = path.replace(/\.\.\//g, '').replace(/\\/g, '/').replace(/\/$/, '');

    // Split the path into parts
    const parts = sanitizedPath.split('/');

    // Check if the path contains "docs/TechDocs"
    const techDocsIndex = parts.indexOf('docs');
    if (techDocsIndex !== -1 && parts[techDocsIndex + 1] === 'TechDocs') {
      parts.splice(0, techDocsIndex + 2); // Remove everything up to and including "docs/TechDocs"
    }

    if (parts.length <= 1) {
      console.warn(`getParentFolder: Path "${path}" does not have a parent folder.`);
      return basePath; // Default to basePath if no parent exists
    }

    // Remove the last part (assumed to be the file or current folder)
    parts.pop();

    // Join the remaining parts to reconstruct the parent folder path
    const parentFolders = `${basePath}/${parts.join('/')}`.replace(/\/+/g, '/'); // Normalize slashes

    console.log(
      'getParentFolder: path =',
      path,
      ', sanitizedPath =',
      sanitizedPath,
      ', parentFolder =',
      parentFolders
    );

    return parentFolders; // Return the valid parent folder path relative to basePath
  }

  const categoryColors = useMemo(() => generateCategoryColors(Object.keys(filteredData)), [filteredData]);

  return (
    <div className="stacks-container">
      <Header className="stacks-header">
        <h1 className="text-xl font-bold text-center mb-4 md:text-2xl">{stackTitle}</h1>
        <SearchBox
          value={searchTerm}
          onChange={handleSearch}
          onClear={handleClear}
          onEscape={handleClear}
          onAbort={handleClear}
          onSearch={handleClear}
          className="search-bar"
          placeholder="Search..."
        />
      </Header>
      <div className="categories">
        {Object.entries(filteredData)?.map(([category, stackItems]) => {
          const categoryStyle = categoryColors[category] || categoryColors.default;

          stackItems.map((stack) => {
            stack.color = categoryStyle.color;
            stack.textColor = determineTextColor(categoryStyle.color);
          });

          return (
            <div key={category} className="category-section">
              <Title3
                className="category-title"
                style={{
                  color: categoryStyle.textColor,
                  backgroundColor: categoryStyle.color,
                }}
              >
                {stackItems[0].parentFolder || category}
              </Title3>
              <div className="stack-grid">
                {stackItems.length > 0 ? (
                  stackItems.map((stack, index) => (
                    <Tooltip key={index} content={stack.description ?? (stack.content ? getFirstHeading(stack.content) : stack.title ?? stack.name)}>
                      <div
                        className="stack-card"
                        style={{
                          backgroundColor: stack.color,
                          color: stack.textColor,
                        }}
                        onClick={() => handleCardClick(stack)}
                      >
                        <span className="stack-name">{stack.content ? getFirstHeading(stack.content) : stack.title ?? stack.name}</span>
                      </div>
                    </Tooltip>
                  ))
                ) : (
                  <p>No stacks available in this category.</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {selectedStack && (
        <Modal className="modal" isOpen={true} onDismiss={closeModal} containerClassName='techdoc-modal-container' >
          <div className="modal-content">
            <Header>{selectedStack.name}</Header>
            <p>{selectedStack.description}</p>
            <DialogActions className='techdoc-modal-actions'>
              <ActionButton className="btn-close" onClick={closeModal}>
                Close
              </ActionButton>
              {selectedStack && (
                <ActionButton
                  className="btn-info"
                  onClick={(e) => {
                    e?.preventDefault();

                    console.log("Selected Stack:", selectedStack);

                    const folderName = selectedStack.folderName || '';
                    const filepath = selectedStack.filepath || '';

                    console.log("Folder Name:", folderName);
                    console.log("Filepath:", filepath);

                    const parentFolderName = getParentFolders(folderName || filepath);
                    console.log("Parent Folder Name:", parentFolderName);

                    navigateToProjects({
                      selected: selectedStack,
                      parentFolder: parentFolderName,
                    });
                  }}
                  title={selectedStack.name}
                >
                  Projects: {selectedStack.name.length > 20 ? `${selectedStack.name.slice(0, 15)}...` : selectedStack.name}
                </ActionButton>

              )}
            </DialogActions>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StacksPage;
