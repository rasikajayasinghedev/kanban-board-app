import { create } from 'zustand';
import type { Task, StatusType, Assignee } from '../types';

const TASKS_STORAGE_KEY = 'kanban-tasks';

// Helper to safely access localStorage, avoiding errors during server-side rendering.
const getTasksFromStorage = (): Task[] | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  try {
    const item = window.localStorage.getItem(TASKS_STORAGE_KEY);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage key “${TASKS_STORAGE_KEY}”:`, error);
    return null;
  }
};

const setTasksInStorage = (tasks: Task[]) => {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    window.localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error(`Error writing to localStorage key “${TASKS_STORAGE_KEY}”:`, error);
  }
};

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
        const storedTasks = getTasksFromStorage();
        if (storedTasks) {
          set({ tasks: storedTasks });
        } else {
          try {
            // Fetch the JSON data from a public path on initial load.
            const response = await fetch('/data/tasks.json');
            if (!response.ok) {
              throw new Error(`Failed to fetch tasks: ${response.statusText}`);
            }
            const tasksData = await response.json();
            set({ tasks: tasksData as Task[] });
            setTasksInStorage(tasksData as Task[]);
          } catch (error) {
            console.error("Could not load initial task data.", error);
            set({ tasks: [] });
          }
        }
      },
      moveTask: (taskId, newStatus) => {
        set((state) => {
            const updatedTasks = state.tasks.map((task) =>
                task.id === taskId ? { ...task, status: newStatus } : task
            );
            setTasksInStorage(updatedTasks);
            return { tasks: updatedTasks };
        });
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
        set(state => {
            const updatedTasks = [...state.tasks, newTask];
            setTasksInStorage(updatedTasks);
            return { tasks: updatedTasks };
        });
      },
      setSearchTerm: (term: string) => set({ searchTerm: term.toLowerCase() }),
    })
);