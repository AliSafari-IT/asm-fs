import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Toolbar from './Toolbars/Toolbar';
import { useTheme } from '../hooks/useTheme';

interface DisplayMdProps {
  markdownContent: string;
  id?: string;
}

const DisplayMd: React.FC<DisplayMdProps> = ({ markdownContent, id }) => {
  const [fontSize, setFontSize] = React.useState('16px');
  const [viewBox, setViewBox] = React.useState('0 0 24 24');
  const themeContext = useTheme();

  useEffect(() => {
    console.log('Theme:', themeContext.theme);
    if (themeContext.theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else if (themeContext.theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [themeContext.theme, themeContext]);

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

  useEffect(() => {
    setViewBox("-15 0 20 23");
    if (fontSize === '14px') {
      setViewBox("-15 -1 15 25");
    } else if (fontSize === '16px') {
      setViewBox("-15 0 20 23");
    }
  }, [fontSize]);

  const saveToFile = () => {
    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'content.md';
    anchor.click();
    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  return (
    <div className="markdown-container" id={id}>
      <Toolbar aria-label="Markdown Toolbar" className="m-4 p-4">
        {/* Copy to Clipboard */}
        <button
          className="px-4 py-1 rounded info"
          onClick={() => navigator.clipboard.writeText(markdownContent)}
        >
          <svg xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox={viewBox}
            height="1.25em" width="4.25em">
            <title>Copy Markdown to Clipboard</title>
            <text x="-30" y="18" fontSize={fontSize}>MD</text>
            <path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
          </svg>
        </button>

        {/* Save to File */}
        <button className="px-2 py-1 rounded ml-2 info" onClick={saveToFile}>
          <svg xmlns="http://www.w3.org/2000/svg"
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox={viewBox}
            height="1.25em"
            width="4em"
          >
            <text x="-30" y="18" fontSize={fontSize}>MD</text>
            <path fill="none" d="M9 14H15V19H9zM11 5H13V7H11z"></path><path fill="none" d="M7,14c0-1.103,0.897-2,2-2h6c1.103,0,2,0.897,2,2v5h2.001L19,8.414L15.586,5H15v4h-1h-1h-2H9H7V5H5v14h2V14z"></path><path d="M5,21h14c1.103,0,2-0.897,2-2V8c0-0.265-0.105-0.52-0.293-0.707l-4-4C16.52,3.105,16.266,3,16,3H5C3.897,3,3,3.897,3,5v14 C3,20.103,3.897,21,5,21z M15,19H9v-5h6V19z M13,7h-2V5h2V7z M5,5h2v4h2h2h2h1h1V5h0.586L19,8.414L19.001,19H17v-5 c0-1.103-0.897-2-2-2H9c-1.103,0-2,0.897-2,2v5H5V5z"></path>
          </svg>
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
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
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
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 18 18" height="1.25em" width="1.25em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
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
            <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" height="1.5em" width="1.5em" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M13.62 9.08L12.1 3.66h-.06l-1.5 5.42h3.08zM5.7 10.13S4.68 6.52 4.53 6.02h-.08l-1.13 4.11H5.7zM17.31 14h-2.25l-.95-3.25h-4.07L9.09 14H6.84l-.69-2.33H2.87L2.17 14H0l3.3-9.59h2.5l2.17 6.34L10.86 2h2.52l3.94 12h-.01z"></path>
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
