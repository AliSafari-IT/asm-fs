// fields.ts
export const tagFields = [
    { name: 'name', type: 'text' },
    { name: 'title', type: 'text' }
] as const;

// fields.ts
export const topicFields = [
    { name: 'id', type: 'text', readonly: true },
    { name: 'name', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'technologyCategory', type: 'text' },
    { name: 'difficultyLevel', type: 'text' },
    { name: 'tags', type: 'array', itemType: 'text' }, // Array of strings
    { name: 'postCount', type: 'number' },
    { name: 'createdDate', type: 'date' },
    { name: 'lastUpdated', type: 'datetime-local' }
] as const;


export const blogPostFields = [
    { name: 'id', type: 'text', readonly: true },
    { name: 'title', type: 'text' },
    { name: 'summary', type: 'text' },
    { name: 'author', type: 'text' },
    { name: 'slug', type: 'text' },
    { name: 'excerpt', type: 'text' },
    { name: 'isPublished', type: 'checkbox' }, // Boolean
    { name: 'imageUrl', type: 'text' },
    { name: 'metaDescription', type: 'text' }
] as const;

export const sitemapItemFields = [
    { name: 'id', type: 'text', readonly: true },
    { name: 'pageName', type: 'text' },
    { name: 'description', type: 'text' },
    { name: 'slug', type: 'text' },
    { name: 'accessByRole', type: 'text' }
] as const;

export const panelFields = [
    { name: 'id', type: 'text', readonly: true },
    { name: 'title', type: 'text' },
    { name: 'content', type: 'text' },
    { name: 'summary', type: 'text' },
    { name: 'dateCreated', type: 'datetime-local' },
    { name: 'dateModified', type: 'datetime-local' }
] as const;

// Function to get fields for a specific model
const getFields = (model: string) => {
    switch (model) {
        case 'topics':
            return topicFields;
        case 'tags':
            return tagFields;
        case 'blogPosts':
            return blogPostFields;
        case 'sitemapItems':
            return sitemapItemFields;
        case 'panels':
            return panelFields;
        default:
            throw new Error(`Unknown model: ${model}`);
    }
};

export default { getFields };
