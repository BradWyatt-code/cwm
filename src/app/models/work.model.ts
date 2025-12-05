export interface Work {
  id: string;
  title: string;
  type: 'play' | 'poem' | 'prose';
  content: string;
  excerpt: string;
  tags: string[];
  dateCreated: Date;
  lastModified: Date;
  status: 'draft' | 'published' | 'archived';
  notes?: string;
}
