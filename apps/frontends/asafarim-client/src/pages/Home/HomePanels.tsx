// E:\asm-fs\apps\frontends\asafarim-client\src\pages\Home\HomePanels.tsx
import { useEffect, useState } from 'react';
import { Stack } from '@fluentui/react/lib/Stack';
import './home.scss';

const linkData = [
  { id: 1, title: 'Link 1', content: '<h2>Content for Link 1</h2><p>This is the content of the first link.</p>' },
  { id: 2, title: 'Link 2', content: '<h2>Content for Link 2</h2><p>This is the content of the second link.</p>' },
  { id: 3, title: 'Link 3', content: '<h2>Content for Link 3</h2><p>This is the content of the third link.</p>' },
  // Add more links as needed
];

const HomePanels = () => {
  const [selectedLinkId, setSelectedLinkId] = useState<number>(1); // Default selected link is the first one
  const [openDetailsId, setOpenDetailsId] = useState<number | null>(null); // Tracks which details block is open
  const selectedLink = linkData.find(link => link.id === selectedLinkId);

  // Handle the link click event
  const handleLinkClick = (id: number) => {
    setSelectedLinkId(id); // Update the selected link ID
  };

  const handleDetailsToggle = (id: number) => {
    if (openDetailsId === id) {
      setOpenDetailsId(null); // Close the details block if it's already open
    } else {
      setOpenDetailsId(id); // Open the details block
    }
  };

  useEffect(() => {
    console.log('selectedLinkId:', selectedLinkId);
  }, [selectedLinkId]);

  return (
    <div className="home-panels">
      <Stack horizontal wrap className="container" tokens={{ childrenGap: 3 }}>
        {/* Left Panel (Sidebar) */}
        <Stack.Item className="left-panel" styles={{ root: { width: '250px', minHeight: '100vh' } }}>
          <div className="link-list">
            {linkData.map(link => (
              <details
                key={link.id}
                className={`link-item ${link.id === selectedLinkId ? 'active' : ''}`}
                open={link.id === openDetailsId} // Only open the selected details block
                onClick={(e) => e.preventDefault()} // Prevent default behavior of details element
              >
                <summary onClick={() => handleDetailsToggle(link.id)}>
                  {link.title}
                </summary>
                {/* The links inside the details block */}
                {link.id === openDetailsId && (
                  <div className="link-contents">
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the details element from closing
                        handleLinkClick(link.id);
                      }}
                      className="content-link"
                    >
                      View Content
                    </button>
                  </div>
                )}
              </details>
            ))}
          </div>
        </Stack.Item>

        {/* Right Panel (Content) */}
        <Stack.Item className="right-panel" styles={{ root: { flexGrow: 1, minHeight: '100vh' } }}>
          <article className="content">
            {selectedLink && <div dangerouslySetInnerHTML={{ __html: selectedLink.content }} />}
          </article>
        </Stack.Item>
      </Stack>
    </div>
  );
};

export default HomePanels;
