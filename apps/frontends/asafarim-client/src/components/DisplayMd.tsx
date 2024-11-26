import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize from 'rehype-sanitize';
import './DisplayMd.css';

interface DisplayMdProps {
  id?: string;
  markdownContent: string;
  theme?: string
}

const DisplayMd: React.FC<DisplayMdProps> = ({ markdownContent, theme, id, ...props }) => {

  useEffect(() => {

    if (theme === 'dark') {
      document.body.setAttribute('data-theme', 'dark');
    }

    if (theme === 'light') {
      document.body.setAttribute('data-theme', 'light');
    }

  }, [theme]);

  return (
    <div className="markdown-container" id={id}>
      <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default DisplayMd;
