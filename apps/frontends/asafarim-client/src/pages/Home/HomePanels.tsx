// E:\asm-fs\apps\frontends\asafarim-client\src\pages\Home\HomePanels.tsx
import { useRef, useState } from 'react';
import './home.scss';
import DisplayMd from '@/components/MarkdownPage/DisplayMd';
//import Modal from '@/components/Containers/Modal/Modal';
import Barchart from '@/components/D3/Barchart';
import LineChart from '@/components/D3/LineChart';
import Scatterplot from '@/components/D3/Scatterplot';
import Toolbar from '@/components/Toolbars/Toolbar';
import { Modal, ResponsiveMode } from '@fluentui/react';
import { FaDownload, FaTimes } from 'react-icons/fa';
import { TreemapChart, TreeMapData } from '@/components/D3/TreeMapChart';
import treeMapData2 from '@/components/D3/data/treeMapData2';
import treeMapData from '@/components/D3/data/treeMapData';
import { Hierarchy } from '@/components/D3/Hierarchy';
import { IAlign } from '@/interfaces/IAlign';
import StacksPage from '../../components/Stacks/StacksPage';
import StackedAreaChart from '@/components/D3/StackedAreaChart';
import StackedBarChart from '@/components/D3/StackedBarChart';
import WordCloudChart from '@/components/D3/WordCloudChart';
import StackedColumnChart from '@/components/D3/StackedColumnChart';
import StackedLineChart from '@/components/D3/StackedLineChart';
import TimeSeriesChart from '@/components/D3/TimeSeriesChart';
import Header from '@/layout/Header/Header';
import * as d3 from 'd3';

interface Data {
  date: Date | null;
  price: number;
}

interface Line {
  name: string;
  values: Data[];
}

const parseDate = d3.timeParse("%Y-%m");


const dataLineChart: Line[] = [
  {
    name: "NAFTA",
    values: [
      { date: "2020-01", price: 0 },
      { date: "2020-02", price: 500 },
      { date: "2020-03", price: 1500 },
      { date: "2020-04", price: 3000 },
      { date: "2020-05", price: 3500 },
      { date: "2020-06", price: 4500 },
      { date: "2020-07", price: 4000 },
      { date: "2020-08", price: 4250 },
      { date: "2020-09", price: 5000 },
      { date: "2020-10", price: 3500 },
      { date: "2020-11", price: 4000 },
      { date: "2020-12", price: 4500 }
    ].map((line) => {
      const date = parseDate(line.date);

      return {
        date: date,
        price: line.price
      };
    })
  },
  {
    name: "Europe",
    values: [
      { date: "2020-01", price: 0 },
      { date: "2020-02", price: 400 },
      { date: "2020-03", price: 1200 },
      { date: "2020-04", price: 1700 },
      { date: "2020-05", price: 2100 },
      { date: "2020-06", price: 3500 },
      { date: "2020-07", price: 3000 },
      { date: "2020-08", price: 3250 },
      { date: "2020-09", price: 4500 },
      { date: "2020-10", price: 2200 },
      { date: "2020-11", price: 1300 },
      { date: "2020-12", price: 600 }
    ].map((line) => {
      const date = parseDate(line.date);

      return {
        date: date,
        price: line.price
      };
    })
  }
];
// get md file content from d3jsReactUiContent as raw string
const d3jsReactUiContent = import.meta.glob('@mdfiles/TechDocs/**/*.md', {
  as: 'raw',
  eager: true
});

const d3jsContentKey = Object.keys(d3jsReactUiContent).find(key =>
  key.toLowerCase().endsWith('TechDocs/Projects/d3js-react-ui.md'.toLowerCase())
);

const HomePanels = () => {
  const [selectedLinkId, setSelectedLinkId] = useState<number>(1);
  const [openDetailsId, setOpenDetailsId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const componentRef = useRef<HTMLDivElement>(null);
  const d3jsContent = d3jsContentKey ?
    <div className="prose dark:prose-invert max-w-none" id="markdown-container">
      <DisplayMd id={'d3js-react-ui'} markdownContent={d3jsReactUiContent[d3jsContentKey] + '' || ''} key={`${d3jsContentKey}_`} />
    </div>
    :
    'Content not found';

  // Access the content
  const linkData = [
    { id: 1, title: 'D3.js', content: d3jsContent, components: ['Barchart', 'LineChart', 'TreemapChart', 'Hierarchy', 'Scatterplot', 'StackedAreaChart', 'StackedBarChart', 'StackedColumnChart', 'StackedLineChart', 'TimeSeriesChart', 'WordCloudChart'] },
    { id: 2, title: 'Change Logs', content: <StacksPage docBranch="changelogs" stackTitle="Change Logs" /> },
    { id: 3, title: 'Charts', content: <Header color='red' size='text-3xl'> Panel 3: Under Construction! </Header> },
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

  const exportModalContent = (name: string) => {
    if (componentRef.current) {
      const svg = componentRef.current.querySelector('svg');
      if (svg) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const url = URL.createObjectURL(svgBlob);

        const img = new Image();
        img.onload = () => {
          // Set canvas dimensions
          canvas.width = svg.clientWidth;
          canvas.height = svg.clientHeight;

          // Fill canvas with a white background
          ctx!.fillStyle = '#ffffff'; // Explicitly set white background
          ctx!.fillRect(0, 0, canvas.width, canvas.height);

          // Draw the SVG onto the canvas
          ctx!.drawImage(img, 0, 0, canvas.width, canvas.height);

          // Export the canvas as a JPEG
          const dataUrl = canvas.toDataURL('image/jpeg', 1.0);
          const link = document.createElement('a');
          link.href = dataUrl;
          link.download = `${name}.jpg`;
          link.click();

          // Clean up
          URL.revokeObjectURL(url);
        };
        img.onerror = () => {
          console.error('Failed to load the SVG as an image.');
        };
        img.src = url;
      } else {
        console.error('SVG element not found in the modal content.');
      }
    } else {
      console.error('Component ref is null or undefined.');
    }
  };
  const dimensions =
  {
    width: 700,
    height: 500
  };
  const d3Components = [
    <Barchart data ={
      [
        { name: 'A', value: 30 },
        { name: 'B', value: 80 },
        { name: 'C', value: 45 },
        { name: 'D', value: 60 },
        { name: 'E', value: 20 },
        { name: 'F', value: 90 },
        { name: 'G', value: 55 },
        
      ] as { name: string; value: number | undefined } []
    } width={dimensions.width} height={dimensions.height} />,
    <LineChart width={dimensions.width} height={dimensions.height} data ={dataLineChart} />,
    <Scatterplot data={[{ x: 1, y: 7 }, { x: 3, y: 4 }, { x: 5, y: 26 }, { x: 7, y: 8 }, { x: 9, y: 100 }]} width={dimensions.width} height={dimensions.height} />,
    <TreemapChart data={treeMapData as unknown as TreeMapData[]} width={dimensions.width} height={dimensions.height} />,
    <Hierarchy width={dimensions.width} height={dimensions.height} data={treeMapData2} />,
    <StackedAreaChart data={[
      { "date": new Date("2020-01-01"), "apples": 10, "oranges": 20 },
      { "date": new Date("2020-01-02"), "apples": 15, "oranges": 25 },
    ]}  />,
    <StackedBarChart data={[
      { "label": "A", "value": 10 },
      { "label": "B", "value": 20 },
      { "label": "C", "value": 30 },
      { "label": "D", "value": 40 }
    ]}  />,
    <StackedColumnChart data={
      [
        { "label": "A", "value": 10 },
        { "label": "B", "value": 20 },
        { "label": "C", "value": 30 },
        { "label": "D", "value": 40 }
      ]
    } width={dimensions.width} height={dimensions.height} />,
    <StackedLineChart data={
      [
        { "label": "A", "value": 10 },
        { "label": "B", "value": 20 },
        { "label": "C", "value": 30 },
        { "label": "D", "value": 40 }
      ]
    } width={dimensions.width} height={dimensions.height} />,
    <TimeSeriesChart data={
      [
        { DateTime: new Date("2020-01-01"), value: 10 },
        { DateTime: new Date("2020-01-02"), value: 20 },
        { DateTime: new Date("2020-01-03"), value: 30 },
        { DateTime: new Date("2020-01-04"), value: 17 }
      ]
    } width={dimensions.width+300} height={dimensions.height}  xKey={'DateTime'} yKey={'value'} />,
    <WordCloudChart data={
      [
        { word: "Hello", count: 10 },
        { word: "React", count: 5 },
        { word: "D3", count: 15 },
        { word: "Cloud", count: 20 },
        { word: "Chart", count: 8 },
        { word: "TypeScript", count: 12 }
      ]
    } width={dimensions.width} height={dimensions.height} />
  ];

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
      <Modal
        isOpen={isModalOpen}
        onDismiss={closeModal}
        responsiveMode={ResponsiveMode.small}
        isBlocking={false}
        isModeless={false}
        containerClassName="max-w-4xl mx-auto my-4 space-x-0 space-y-0 align-middle bg-primary dark:bg-primary-dark rounded-md shadow-lg text-primary dark:text-primary-dark"
      >
        <Toolbar aria-label="Component Toolbar" align={IAlign.right}>
          <div className="flex justify-between w-full">
            <h2 className="text-lg font-semibold text-info align-middle text-left truncate">Chart: {selectedComponent}</h2>
            <div className="flex space-x-2">
              {selectedComponent && (
                <button
                  className="flex items-center justify-center w-10 h-10 bg-teams-purple text-white rounded-full hover:bg-teams-purple-light active:bg-teams-purple-dark transition-all"
                  onClick={() => exportModalContent(selectedComponent || 'not-found')}
                  aria-label="Export Component"
                  title="Export Chart"
                >
                  <FaDownload className="w-5 h-5" />
                </button>
              )}
              {selectedComponent && (
                <button
                  className="flex items-center justify-center w-10 h-10 bg-danger text-white rounded-full hover:bg-danger-light active:bg-danger-dark transition-all"
                  onClick={closeModal}
                  aria-label="Close Modal"
                  title="Close Modal"
                >
                  <FaTimes className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </Toolbar>

        {selectedComponent && (
          <div className="py-4 px-1 bg-transparent dark:bg-inverted-light ">
            {d3Components.map((component, index) => (
              <div
                key={index}
                ref={selectedComponent === component.type.name ? componentRef : null} // Attach ref only to the selected component
              >
                {selectedComponent === component.type.name ? component : null}
              </div>
            ))}
          </div>
        )}

      </Modal>
    </div>
  );
};

export default HomePanels;