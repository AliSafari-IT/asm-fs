// E:\asm-fs\apps\frontends\asafarim-client\src\pages\Home\HomePanels.tsx
import { useState } from 'react';
import './home.scss';
import DisplayMd from '@/components/DisplayMd';
import Modal from '@/components/Containers/Modal/Modal';
import Barchart from '@/components/D3/Barchart';
import LineChart from '@/components/D3/LineChart';
// get md file content from d3jsReactUiContent as raw string

const d3jsReactUiContent = import.meta.glob('@mdfiles/TechDocs/**/*.md', {
  as: 'raw',
  eager: true
});


const d3jsContentKey = Object.keys(d3jsReactUiContent).find(key =>
  key.endsWith('TechDocs/projects/d3js-react-ui.md')
);

const HomePanels = () => {
  const [selectedLinkId, setSelectedLinkId] = useState<number>(1);
  const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const d3jsContent = d3jsContentKey ?
    <div className="prose dark:prose-invert max-w-none" id="markdown-container">
      <DisplayMd id={'d3js-react-ui'} markdownContent={d3jsReactUiContent[d3jsContentKey] + '' || ''} key={`${d3jsContentKey}_`} />
    </div>
    :
    'Content not found';

  // Access the content
  const linkData = [
    { id: 1, title: 'D3.js', content: d3jsContent, components: ['Barchart', 'LineChart', 'Scatterplot', 'StackedAreaChart', 'StackedBarChart', 'StackedColumnChart', 'StackedLineChart', 'TimeSeriesChart', 'TreeMapChart', 'WordCloudChart'] },
    { id: 2, title: 'Link 2', content: '<h2>Content for Link 2</h2><p>This is the content of the second link.</p>' },
    { id: 3, title: 'Link 3', content: '<h2>Content for Link 3</h2><p>This is the content of the third link.</p>' },
  ];

  const selectedLink = linkData.find(link => link.id === selectedLinkId);

  const handleLinkClick = (id: number) => {
    setSelectedLinkId(id);
    setIsMobileMenuOpen(false); // Close mobile menu after selection
  };

  const handleDetailsToggle = (id: number) => {
    setOpenDetailsId(openDetailsId === id ? null : id);
  };

  const handleComponentClick = (component: string) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedComponent(null);
    setIsModalOpen(false);
  };

  const d3Components = [<Barchart />, <LineChart />];

  return (
    <div className="w-full flex flex-col md:flex-row min-h-[calc(100vh-var(--navbar-height)-var(--footer-height))]">
      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden px-4 py-2 mb-4 text-primary dark:text-primary-dark hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        {isMobileMenuOpen ? 'Hide Menu' : 'Show Menu'}
      </button>

      {/* Left Panel (Sidebar) */}
      <div className={`
        w-full md:w-64 
        bg-white dark:bg-gray-800
        border-b md:border-r border-gray-200 dark:border-gray-700
        ${isMobileMenuOpen ? 'block' : 'hidden'} md:block
        transition-all duration-300
      `}>
        <div className="p-4">
          {linkData.map(link => (
            <details
              key={link.id}
              className={`
                mb-2 rounded-lg
                bg-gray-50 dark:bg-gray-900
                border border-gray-200 dark:border-gray-700
                ${link.id === selectedLinkId ? 'ring-2 ring-primary dark:ring-primary-dark' : ''}
              `}
              open={link.id === openDetailsId}
              onClick={(e) => e.preventDefault()}
            >
              <summary
                onClick={() => handleDetailsToggle(link.id)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-gray-800 dark:text-gray-200">
                  {link.title}
                </span>
              </summary>

              {link.id === openDetailsId && (
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLinkClick(link.id);
                    }}
                    className="w-full px-4 py-2 text-sm
                      bg-primary dark:bg-primary-dark
                      text-[var(--text-primary)] dark:text-gray-200
                      rounded-lg
                      hover:bg-primary-dark dark:hover:bg-primary
                      transition-colors
                      focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary dark:focus:ring-primary-dark"
                  >
                    View Content
                  </button>
                  {link.components && (
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold">Components:</h3>
                      <ul>
                        {link.components.map((component, index) => (
                          <li key={index}>
                            <button
                              onClick={() => handleComponentClick(component)}
                              className="text-teams-blue hover:underline cursor-pointer"
                            >
                              {component}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </details>
          ))}
        </div>
      </div>

      {/* Right Panel (Content) */}
      <div className="flex-1 p-4 md:p-6 lg:p-8
        bg-white dark:bg-gray-800
        text-gray-800 dark:text-gray-200">
        <article className="prose dark:prose-invert max-w-none">
          {selectedLink && typeof selectedLink.content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: selectedLink.content }} />
          ) : (
            <>
              {selectedLink?.content}
            </>
          )}
        </article>
      </div>

      {/* Modal for displaying components */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        {selectedComponent && (
          <>
            {d3Components.map((component, index) => (
              <div key={index}>
                {selectedComponent === component.type.name ? component : null}
              </div>
            ))}
          </>
        )}
      </Modal>
    </div>
  );
};

export default HomePanels;