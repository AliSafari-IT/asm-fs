declare module '*.md' {
  const content: string;
  export default content;
}

declare module '*.mdx' {
  let MDXContent: any;
  export default MDXContent;
}
