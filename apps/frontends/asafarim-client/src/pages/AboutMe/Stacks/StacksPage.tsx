// E:\asm-fs\apps\frontends\asafarim-client\src\pages\AboutMe\Stacks\StacksPage.tsx 
import React, { useState } from 'react';
import './StacksPage.css';
import { stackData } from './stackData';
import { IStackItem } from '@/interfaces/IStack';
import { ActionButton, Modal, SearchBox } from '@fluentui/react';
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

  function navigateToProjects(selected?: IStackItem, category?: string): void {
    const topics = selected?.topics;
    if(topics && topics.length > 0) {
      const lnk = topics.map(t => getSlug(t.name)).join('-');
      window.location.href = `/tech-docs/${category}/${topics}/${lnk}`; 
      console.log(" lnk: ", lnk);
    } else {
      const navto = `/tech-docs/${category}/${getSlug(selected?.name)}`;
      window.location.href = navto;
      console.log(" selected: navto: ", navto);
    }
  }
  
  const getCategory = (stackName: string): string => {
    const backendStacks = ['CSharp ASP.Net Core', 'Restful API', 'Clean Architecture', 'SQL (MySQL) and NoSQL (MongoDB)', 'End-to-End Testing'];
    const frontendStacks = ['React TypeScript', 'HTML/CSS', 'Git'];
    const uiFrameworks = ['Tailwind CSS', 'PHP and Laravel', 'Node.js', 'Angular', 'Fluent UI', 'Bootstrap', 'Material UI', 'Syncfusion'];
    const dataAnalysisStacks = ['Python', 'R & R studio', 'D3', 'Data Visualization', 'Data-Driven UI', ];
  
    if (backendStacks.includes(stackName)) return 'backend';
    if (frontendStacks.includes(stackName)) return 'frontend';
    if (uiFrameworks.includes(stackName)) return 'ui-frameworks';
    if (dataAnalysisStacks.includes(stackName)) return 'data-analysis';
    
    return ''; // Default case if no category is found
  };

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
              {selectedStack && (
                <ActionButton
                  className="btn-info"
                  onClick={(e) => {
                    e?.preventDefault();
                    const category = getCategory(selectedStack.name); // Function to get the category based on stack name
                    console.log("category: ", category , " for stack: ", selectedStack.name);
                    navigateToProjects(selectedStack, category);
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
