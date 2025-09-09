import React, { useState } from 'react';
import { KanbanCard } from './KanbanCard';
import type { Task, Status } from '../types';
import { useTaskStore } from '../store/taskStore';
import { PlusIcon, MoreHorizontalIcon } from './icons';

interface KanbanColumnProps {
  status: Status;
  tasks: Task[];
}

export const KanbanColumn: React.FC<KanbanColumnProps> =  ({ status, tasks }) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);
    const moveTask = useTaskStore((state) => state.moveTask);

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(true);
  };

  const handleDragLeave = () => {
    setIsDraggingOver(false);
  };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      moveTask(taskId, status.id);
    }
    setIsDraggingOver(false);
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`flex-shrink-0 w-80 rounded-lg transition-all duration-300 ${isDraggingOver ? 'bg-blue-50 border-2 border-dashed border-blue-400' : 'bg-gray-100 border-2 border-transparent'}`}
      >
          <div className="p-4">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="flex items-center">
                        <span className={`px-3 py-1 text-sm font-semibold rounded-full ${status.color}`}>
                            {status.title}
                        </span>
                      <span className="ml-2 text-sm font-medium text-gray-500 bg-gray-200 rounded-full px-2 py-0.5">
                        {tasks.length}
                      </span>
                  </div>
                  <div className="flex items-center space-x-1">
                  <button onClick={() => ('')} className="text-gray-500 hover:text-gray-800 p-1 rounded-md hover:bg-gray-200" aria-label="Add new task">
                      <PlusIcon className="w-5 h-5" />
                  </button>
                  <button className="text-gray-500 hover:text-gray-800 p-1 rounded-md hover:bg-gray-200" aria-label="More options">
                      <MoreHorizontalIcon className="w-5 h-5" />
                  </button>
                  </div>
              </div>
              <div className="space-y-4 h-full overflow-y-auto pt-4">
                  {tasks.map((task) => (
                  <KanbanCard key={task.id} task={task} />
                  ))}
              </div>
          </div>
      </div>
     
    </>
  );
};