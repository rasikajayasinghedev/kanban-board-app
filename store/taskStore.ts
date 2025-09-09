import { create } from 'zustand';
import type { Task, StatusType, Assignee } from '../types';

interface TaskState {
  tasks: Task[];
  searchTerm: string;
  fetchTasks: () => Promise<void>;
  moveTask: (taskId: string, newStatus: StatusType) => void;
  addTask: (
    title: string,
    description: string,
    category: string,
    priority: 'Low' | 'Medium' | 'High',
    dueDate: string,
    assignees: Assignee[],
    status: StatusType
  ) => void;
  setSearchTerm: (term: string) => void;
}

export const useTaskStore = create<TaskState>()(
    (set) => ({
      tasks: [],
      searchTerm: '',
      fetchTasks: async () => {
        try {
          // Fetch the JSON data from a public path.
          const response = await fetch('/data/tasks.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch tasks: ${response.statusText}`);
          }
          const tasksData = await response.json();
          set({ tasks: tasksData as Task[] });
        } catch (error) {
          console.error("Could not load initial task data.", error);
          set({ tasks: [] });
        }
      },
      moveTask: (taskId, newStatus) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          ),
        }));
      },
      addTask: (title, description, category, priority, dueDate, assignees, status) => {
        const newTask: Task = {
          id: `task-${Date.now()}`,
          title,
          description,
          category,
          priority,
          dueDate,
          assignees,
          status,
          commentsCount: 0,
          attachmentsCount: 0,
        };
        set(state => ({
          tasks: [...state.tasks, newTask]
        }));
      },
      setSearchTerm: (term: string) => set({ searchTerm: term.toLowerCase() }),
    })
);
