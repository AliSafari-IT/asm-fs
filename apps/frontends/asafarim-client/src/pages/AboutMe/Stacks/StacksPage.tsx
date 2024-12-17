import React, { useState } from 'react';
import './StacksPage.css';
import { stackData } from './stackData';
import { IStackItem } from '@/interfaces/IStack';
import { Modal } from '@fluentui/react';
import Header from '@/layout/Header/Header';

const StacksPage: React.FC = () => {
  const [selectedStack, setSelectedStack] = useState<IStackItem | null>(null);

  const handleCardClick = (stack: IStackItem) => {
    setSelectedStack(stack);
  };

  const closeModal = () => {
    setSelectedStack(null);
  };

  return (
    <div className="stacks-container">
      {Object.entries(stackData).map(([category, stackItems]) => (
        <div key={category}>
          <h2>{category.replace(/([A-Z])/g, ' $1').trim()}</h2>
          {stackItems.map((stack, index) => (
            <div
              key={index}
              className="stack-card"
              onClick={() => handleCardClick(stack)}
            >
              <h3>{stack.name}</h3>
            </div>
          ))}
        </div>
      ))}

      {selectedStack && (
        <Modal className="modal " isOpen={true} onDismiss={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <Header>{selectedStack.name}</Header>
            <p>{selectedStack.description}</p>
            <button className="close-button" onClick={closeModal}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default StacksPage;