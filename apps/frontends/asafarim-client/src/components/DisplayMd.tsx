import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Toolbar from './Toolbars/Toolbar';

interface DisplayMdProps {
  id?: string;
  markdownContent: string;
  theme?: string;
}

const DisplayMd: React.FC<DisplayMdProps> = ({ markdownContent, theme, id }) => {
  const [fontSize, setFontSize] = React.useState('16px');

  useEffect(() => {
    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [theme]);

  useEffect(() => {
    const element = id
      ? (document.getElementById(id) as HTMLDivElement)
      : (document.getElementsByClassName('markdown-container')[0] as HTMLDivElement);
    if (element) {
      element.style.fontSize = fontSize;
    }
  }, [fontSize, id]);

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(e.target.value);
  };

  const saveToFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'content.md';
    anchor.click();
    URL.revokeObjectURL(url); // Clean up the URL object
  };

  return (
    <div className="markdown-container" id={id}>
      <Toolbar aria-label="Markdown Toolbar" className="m-4 p-4">
        {/* Copy to Clipboard */}
        <button
          className="px-4 py-1 rounded"
          onClick={() => navigator.clipboard.writeText(markdownContent)}
        >

          <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 50 32" height="2em" width="2em" xmlns="http://www.w3.org/2000/svg">
            <title>Copy Markdown to Clipboard</title>
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
            <text x="23" y="24" fontSize="18px" fill="#000"> MD</text>
          </svg>
        </button>

        {/* Save to File */}
        <button className="px-2 py-1 rounded ml-2" onClick={saveToFile}>
          Save as File
        </button>

        <div className="font-size-options">
          <label>
            <input
              type="radio"
              name="fontSize"
              value="14px"
              checked={fontSize === '14px'}
              onChange={handleFontSizeChange}
            />
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
            </svg>
          </label>
          <label>
            <input
              type="radio"
              name="fontSize"
              value="16px"
              checked={fontSize === '16px'}
              onChange={handleFontSizeChange}
            />
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 18 18" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
            </svg>
          </label>
          <label>
            <input
              type="radio"
              name="fontSize"
              value="18px"
              checked={fontSize === '18px'}
              onChange={handleFontSizeChange}
            />
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 20 20" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
            </svg>
          </label>
        </div>
      </Toolbar>

      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default DisplayMd;
