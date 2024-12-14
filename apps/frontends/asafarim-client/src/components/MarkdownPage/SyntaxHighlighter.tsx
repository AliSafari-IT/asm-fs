import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '@/hooks/useTheme';

interface CodeProps {
  node?: unknown;
  inline?: boolean;
  className?: string;
  children: React.ReactNode;
}

const CodeSnippet = ({ codeString }: { codeString: string }) => {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter language="javascript" style={theme === 'dark' ? vscDarkPlus : oneDark}>
      {codeString}
    </SyntaxHighlighter>
  );
};

const CodeSnippetWithLineNumbers = ({ codeString }: { codeString: string }) => {
  const { theme } = useTheme();
  return (
    <SyntaxHighlighter language="javascript" style={theme === 'dark' ? vscDarkPlus : oneDark} showLineNumbers>
      {codeString}
    </SyntaxHighlighter>
  );
};

export const CodeBlock: React.FC<CodeProps> = ({ inline, className, children, ...props }) => {
  const { theme } = useTheme();
  const match = /language-(\w+)/.exec(className || '');
  const language = match ? match[1] : 'text';

  return !inline && match ? (
    <SyntaxHighlighter
      style={theme === 'dark' ? vscDarkPlus : oneDark}
      language={language}
      PreTag="div"
      {...props}
    >
      {String(children).replace(/\n$/, '')}
    </SyntaxHighlighter>
  ) : (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

export default {CodeSnippet, CodeSnippetWithLineNumbers, CodeBlock};
