import React, { useState, useEffect } from 'react';
import './StacksPage.css';
import { ActionButton, Modal, SearchBox } from '@fluentui/react';
import Header from '@/layout/Header/Header';
import { Tooltip } from '@material-tailwind/react';
import { DialogActions } from '@fluentui/react-components';
import { getAllMdFiles } from '@/utils/mdFilesUtils';
import transformMdFilesToStackData from './transformMdFilesToStackData';
import { IMenuItem } from '@/interfaces/IMenuItem';
import getSlug from '@/utils/getSlug';

const StacksPage: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<IMenuItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dynamicStackData, setDynamicStackData] = useState<Record<string, IMenuItem[]>>({});

  useEffect(() => {
    // Fetch and transform Markdown data into stackData format
    const mdFiles = getAllMdFiles();
    console.log('Raw Markdown Files:', mdFiles);

    const transformedData = transformMdFilesToStackData(mdFiles.techDocs);
    console.log('Transformed Stack Data:', transformedData);
    setDynamicStackData(transformedData);
  }, []);

  const handleCardClick = (stack: IMenuItem) => {
    setSelectedStack(stack);
  };

  const closeModal = () => {
    setSelectedStack(null);
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

  const handleSearch = (e?: { target: { value: string } }) => {
    if (e) {
      setSearchTerm(e.target.value);
    }
  };

  const handleClear = () => setSearchTerm('');

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

  return (
    <div className="stacks-container">
      <Header className="stacks-header">
        <h1 className="text-xl font-bold text-center mb-4 md:text-2xl">Tech Stacks</h1>
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
          return (
            <div key={category} className="category-section">
              <h2 className="category-title">{stackItems[0].parentFolder}</h2>
              <div className="stack-grid">
                {stackItems.length > 0 ? (
                  stackItems.map((stack, index) => (
                    <Tooltip key={index} content={stack.description}>
                      <div
                        className="stack-card"
                        style={{
                          backgroundColor: stack.color,
                          color: stack.textColor,
                        }}
                        onClick={() => handleCardClick(stack)}
                      >
                        <h3 className="stack-name">{stack.name}</h3>
                      </div>
                    </Tooltip>
                  ))
                ) : (
                  <p>No stacks available in this category.</p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {selectedStack && (
        <Modal className="modal" isOpen={true} onDismiss={closeModal} containerClassName='techdoc-modal-container' >
          <div className="modal-content">
            <Header>{selectedStack.name}</Header>
            <p>{selectedStack.description}</p>
            <DialogActions>
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
