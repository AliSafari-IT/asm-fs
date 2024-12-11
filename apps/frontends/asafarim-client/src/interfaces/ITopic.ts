export interface ITopic {
  id: string;
  title: string;
  to?: string;
  icon?: React.ReactElement;
  name: string;
  description?: string;
  technologyCategory?: string;
  difficultyLevel?: string;
  relatedPosts?: any[]; // Consider creating a proper type for this
};

