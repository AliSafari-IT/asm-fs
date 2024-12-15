const getFirstHeading = (markdownContent: string): string => {
    const headingRegex = /^# (.*)$/m;
    const match = markdownContent.match(headingRegex);
    return match ? match[1] : '';
};

export { getFirstHeading };