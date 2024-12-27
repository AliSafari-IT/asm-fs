const getFirstHeading = (markdownContent: string): string => {
    const headingRegex = /^# (.*)$/m;
    const match = markdownContent.match(headingRegex);
    return match ? match[1] : '';
};


function getCreationDate(content: string): Date | undefined {
    const match = content?.match(/(?:\*\*Date:?\*\*|Date:|Created:|Created At:|Created On:|Created Date:|Created Time:|Created At|Created On|Created Date|Created Time|Date) (.+?)(?:\n|$)/m);
    if (!match) return undefined;
    const dateStr = match[1].trim();
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }
  
  function getUpdateDate(content: string): Date | undefined {
    const match = content?.match(/(?:\*\*(?:Updated|Modified|Changed|Last Changed):?\*\*|(?:Updated|Modified|Changed|Last Changed):) (.+?)(?:\n|$)/m);
    if (!match) return undefined;
    const dateStr = match[1].trim();
    // Try parsing both formats: "December 07, 2024" and "10/10/2024, 1:00:00 AM"
    const parsedDate = new Date(dateStr);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate;
  }

  const log = (...message: any) => console.log(...message);

  const getGitHash = (path: string): string => {
    const match = path?.match(/_([a-f0-9]+)$/);
    return match ? match[1] : '-';
  };

  const getUpdatedTimeFromContent = (content: string) => {
    const lines = content.split('\n');
    const updateLine = lines.find(line => line.toLowerCase().startsWith('updated:'));
    if (updateLine) {
      const dateMatch = updateLine.match(/updated:\s*(.+)/i);
      if (dateMatch) {
        return new Date(dateMatch[1]);
      }
    }
    return null;
  };

  const getUpdatedTimeFromPath = (path: string) => {
    const match = path?.match(/_([a-f0-9]+)$/);
    return match ? new Date(match[1]) : null;
  };
  
export { getFirstHeading, getCreationDate, getUpdateDate, log, getGitHash, getUpdatedTimeFromContent, getUpdatedTimeFromPath };