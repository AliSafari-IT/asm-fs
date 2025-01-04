// make slug by name or title
const getSlug = (title?: string) => {
  return title?.toLowerCase().replace(/[^a-z_0-9]+/g, '-');
};

export default getSlug;