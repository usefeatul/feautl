export type SubdomainRequestDetailData = {
  id: string;
  title: string;
  content: string | null;
  image: string | null;
  upvotes: number;
  commentCount: number;
  roadmapStatus: string | null;
  isFeatured?: boolean;
  isLocked?: boolean;
  isPinned?: boolean;
  publishedAt: string | null;
  createdAt: string;
  boardName: string;
  boardSlug: string;
  hasVoted?: boolean;
  author?: {
    name: string | null;
    image: string | null;
    email: string | null;
  } | null;
};
