import React from 'react';
import { KanbanColumn } from './KanbanColumn';
import { useTaskStore } from '../store/taskStore';
import type { Status } from '../types';

const STATUSES: Status[] = [
  { id: 'todo', title: 'To Do', color: 'bg-[#e7e8ed] text-gray-800' },
  { id: 'inprogress', title: 'In Progress', color: 'bg-[#ffa801] text-gray-800' },
  { id: 'approved', title: 'Approved', color: 'bg-[#afe655] text-gray-800' },
  { id: 'reject', title: 'Reject', color: 'bg-[#f90730] text-white' },
];

export const KanbanBoard: React.FC = () => {
  const tasks = useTaskStore((state) => state.tasks);
  const searchTerm = useTaskStore((state) => state.searchTerm);

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm) || 
    task.category.toLowerCase().includes(searchTerm)
  );
  return (
    <div className="flex space-x-6 overflow-x-auto pb-4">
      {STATUSES.map((status) => (
        <KanbanColumn
          key={status.id}
          status={status}
          tasks={filteredTasks.filter((task) => task.status === status.id)}
        />
      ))}
    </div>
  );
};