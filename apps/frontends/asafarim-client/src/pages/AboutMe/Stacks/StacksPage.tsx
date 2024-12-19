import React, { useState } from 'react';
import './StacksPage.css';
import { stackData } from './stackData';
import { IStackItem } from '@/interfaces/IStack';
import { ActionButton, BaseButton, Modal, SearchBox } from '@fluentui/react';
import Header from '@/layout/Header/Header';
import { Tooltip } from '@material-tailwind/react';
import { DialogActions } from '@fluentui/react-components';
import getSlug from '@/utils/getSlug';
//import SearchBox from '@/components/SearchBox/SearchBox';

const StacksPage: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<IStackItem | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCardClick = (stack: IStackItem) => {
    setSelectedStack(stack);
  };

  const closeModal = () => {
    setSelectedStack(null);
  };

  const filteredData = Object.entries(stackData).reduce((acc, [category, stacks]) => {
    const filteredStacks = stacks.filter((stack) =>
      stack.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredStacks.length) {
      acc[category] = filteredStacks;
    }
    return acc;
  }, {} as typeof stackData);

  const handleSearch = (e?: { target: { value: string; }; }): void => {
    if (e) {
      setSearchTerm(e.target.value);
    }
  };
  const handleClear = (): void => { setSearchTerm(''); };

  function navigateToProjects(stackName?: string): void {
    window.location.href = `/projects/${getSlug(stackName)}`;
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
        {Object.entries(filteredData).map(([category, stackItems]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
            <div className="stack-grid">
              {stackItems.map((stack, index) => (
                <Tooltip key={index} content={stack.description}>
                  <div
                    className="stack-card"
                    style={{ backgroundColor: stack.color, color: stack.textColor }}
                    onClick={() => handleCardClick(stack)}
                  >
                    <h3 className="stack-name">{stack.name}</h3>
                  </div>
                </Tooltip>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedStack && (
        <Modal className="modal" isOpen={true} onDismiss={closeModal}>
          <div className="modal-content">
            <Header>{selectedStack.name}</Header>
            <p>{selectedStack.description}</p>
            <DialogActions
              className="dialog-actions"
              >
              <ActionButton className="btn-close" onClick={closeModal}>
                Close
              </ActionButton>
              <ActionButton
                className="btn-info"
                onClick={(e) => {
                  e?.preventDefault();
                  navigateToProjects(selectedStack.name);
                }}
                title={selectedStack.name}
              >
                Projects: {selectedStack.name.length > 20 ? `${selectedStack.name.slice(0, 15)}...` : selectedStack.name}
              </ActionButton>
            </DialogActions>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StacksPage;
