export type StatusType = 'todo' | 'inprogress' | 'approved' | 'reject';

export interface Status {
  id: StatusType;
  title: string;
  color: string;
}

export interface Assignee {
  id: string;
  avatarUrl: string;
  name: string;
}

export interface Task {
  id: string;
  category: string;
  title: string;
  description?: string;
  priority: 'Low' | 'Medium' | 'High';
  image?: string;
  commentsCount: number;
  attachmentsCount: number;
  dueDate: string;
  assignees: Assignee[];
  status: StatusType;
  reports?: number;
  stream?: boolean;
  groupCall?: boolean;
}
