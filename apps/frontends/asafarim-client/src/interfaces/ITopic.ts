import { IBlogPost } from './IBlogPost';

export interface ITopic {
  id: string;
  name: string;
  description: string;
  postCount: number;
  createdDate: string;
  lastUpdated: string;
  technologyCategory: string;
  difficultyLevel: string;
  tags: string[];
  relatedPosts: IBlogPost[];
}
