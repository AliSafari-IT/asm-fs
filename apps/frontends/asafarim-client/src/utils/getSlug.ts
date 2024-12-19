// make slug by name or title
const getSlug = (title?: string) => {
  return title?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

export default getSlug;