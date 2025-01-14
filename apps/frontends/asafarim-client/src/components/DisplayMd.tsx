import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import Toolbar from './Toolbars/Toolbar';
import FontSizeRadioButtons from './FontSizeRadioButtons';
import SaveButtons from './SaveButtons';
import { useTheme } from '@/contexts/ThemeContext';

interface DisplayMdProps {
  markdownContent: string;
  id?: string;
}

const DisplayMd: React.FC<DisplayMdProps> = ({ markdownContent, id }) => {
  const [fontSize, setFontSize] = React.useState('14px');
  const [viewBox, setViewBox] = React.useState('0 0 24 24');
  const [copySuccess, setCopySuccess] = React.useState(false);
  const themeContext = useTheme();

  useEffect(() => {
    console.log('Theme:', themeContext.theme, "filename:", id);
    if (themeContext.theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    } else if (themeContext.theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    }
  }, [themeContext.theme, themeContext, id]);

  useEffect(() => {
    const element = id
      ? (document.getElementById(id) as HTMLDivElement)
      : (document.getElementsByClassName('markdown-container')[0] as HTMLDivElement);
    if (element) {
      element.style.fontSize = fontSize;
    }
  }, [fontSize, id]);

  useEffect(() => {
    setViewBox("-15 0 20 23");
    if (fontSize === '14px') {
      setViewBox("-15 -1 15 25");
    } else if (fontSize === '16px') {
      setViewBox("-15 0 20 23");
    }
  }, [fontSize]);

  const sanitizeConfig = {
    tagNames: ['b', 'strong', 'p', 'ul', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'], // Add more tags as needed
    attributes: {
      '*': [], // Allow all attributes
    },
    protocols: {
      // Allow protocols as needed
      'a': ['href', 'title'],
    },
  };


  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 3000);
    });
  };

  const saveToFile = () => {
    const filename = id ? `${id}.md` : 'asafarim-about-me.md';
    console.log('Saving Markdown file...', filename);

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    // Clean up the URL object
    URL.revokeObjectURL(url);
  };

  const saveHtmlToFile = () => {
    // Get the innerHTML of the element with class "markdown-body"
    const filename = id ? `${id}.html` : 'asafarim-about-me.html';
    console.log('Saving HTML file...', filename);

    const markdownBodyElement = document.querySelector('.markdown-body');
    if (markdownBodyElement) {
      const markdownContent = markdownBodyElement.innerHTML;
      const blob = new Blob([markdownContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = filename;
      anchor.click();
      // Clean up the URL object
      URL.revokeObjectURL(url);
    };
  }
  return (
    <div className="markdown-container flex flex-col m-5" id={id}>
      <Toolbar
        aria-label="Markdown Toolbar"
        className="md-toolbar m-4 p-4 flex flex-row justify-between items-center border-b"
      >
        {/* Left: Save Buttons */}
        <div className="flex items-center ">
          <SaveButtons
            onSaveMarkdown={saveToFile}
            onSaveHtml={saveHtmlToFile}
            onCopyMarkdown={handleCopy}
            copySuccess={copySuccess}
            viewBox={viewBox}
          />
        </div>
        {/* Right: Font Size Options */}
        <div className="flex items-center">
          <FontSizeRadioButtons currentFontSize={fontSize} onFontSizeChange={setFontSize} />
        </div>
      </Toolbar>

      <ReactMarkdown
        rehypePlugins={[rehypeRaw, [rehypeSanitize, sanitizeConfig]]}
        className="markdown-body mt-4 px-4 py-2 md:px-8 md:py-4 lg:px-12 lg:py-6 xl:px-16 xl:py-8 rounded-md shadow-md"
        children={markdownContent} />
    </div>
  );
};

export default DisplayMd;