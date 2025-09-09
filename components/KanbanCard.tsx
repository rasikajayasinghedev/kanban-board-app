import React from 'react';
import type { Task } from '../types';
import { 
  MoreHorizontalIcon, 
  CommentIcon, 
  AttachmentIcon, 
  InfoIcon,
  ImageIcon,
  LightningIcon,
  CalendarIcon,
  BellIcon
} from './icons';

interface KanbanCardProps {
  task: Task;
}

const categoryColors: { [key: string]: string } = {
  'Research': 'bg-lime-300',
  'Design': 'bg-pink-400',
  'Other': 'bg-gray-400',
  'Feedback': 'bg-cyan-300',
  'Presentation': 'bg-orange-300',
  'UX Research': 'bg-lime-300',
  'Interface': 'bg-purple-400',
  'Marketing': 'bg-pink-400',
  'DevOps': 'bg-indigo-400',
  'Development': 'bg-teal-400',
  'Content': 'bg-lime-300',
  'QA': 'bg-cyan-400',
  'Planning': 'bg-green-400',
};

const PriorityBadge: React.FC<{ priority: Task['priority'] }> = ({ priority }) => {
  const priorityStyles = {
    Low: 'bg-gray-100 text-gray-600',
    Medium: 'bg-yellow-100 text-yellow-700',
    High: 'bg-red-100 text-red-600',
  };
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-xs font-medium rounded-md ${priorityStyles[priority]}`}>
      <LightningIcon className="w-4 h-4 mr-1" />
      {priority}
    </span>
  );
};

const AssigneeAvatars: React.FC<{ assignees: Task['assignees'] }> = ({ assignees }) => {
    if (assignees.length === 0) return null;
    
    const visibleAssignees = assignees.slice(0, 3);
    const hiddenCount = assignees.length - visibleAssignees.length;

    return (
        <div className="flex items-center -space-x-2">
            {visibleAssignees.map(assignee => (
                <img key={assignee.id} className="inline-block h-6 w-6 rounded-full ring-2 ring-white" src={assignee.avatarUrl} alt={assignee.name} />
            ))}
            {hiddenCount > 0 && (
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 text-xs font-semibold ring-2 ring-white">
                    +{hiddenCount}
                </span>
            )}
        </div>
    );
};

export const KanbanCard: React.FC<KanbanCardProps> = ({task}) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('taskId', task.id);
  };
  
  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="p-4 bg-white rounded-lg shadow-md border border-gray-100 cursor-grab active:cursor-grabbing transition-shadow duration-200 hover:shadow-lg"
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center">
          <span className={`w-2.5 h-2.5 mr-2 ${categoryColors[task.category] || 'bg-gray-400'}`}></span>
          <span className="text-sm font-medium text-gray-700">{task.category}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontalIcon className="w-5 h-5" />
        </button>
      </div>

      <h4 className="font-semibold text-gray-900 leading-snug">{task.title}</h4>
      
      {task.image && (
        <img src={task.image} alt={task.title} className="w-full h-32 object-cover rounded-lg mt-3" />
      )}

      <div className="mt-4 flex items-center justify-between">
        <AssigneeAvatars assignees={task.assignees} />
        <PriorityBadge priority={task.priority} />
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-3">
          {task.reports && (
            <span className="flex items-center text-xs font-semibold text-red-600">
              <InfoIcon className="w-4 h-4 mr-1"/> {task.reports} Reports
            </span>
          )}
          {task.stream && (
            <span className="text-xs font-semibold text-blue-600">Stream</span>
          )}
          {task.groupCall && (
            <span className="text-xs font-semibold text-purple-600">Group Call</span>
          )}
          {task.commentsCount > 0 && (
            <span className="flex items-center">
              <CommentIcon className="w-4 h-4 mr-1" /> {task.commentsCount}
            </span>
          )}
          {task.attachmentsCount > 0 && (
            <span className="flex items-center">
              <AttachmentIcon className="w-4 h-4 mr-1" /> {task.attachmentsCount}
            </span>
          )}
        </div>
        
        {task.dueDate && (
          <span className="font-medium">
            {task.dueDate.replace('Due: ', '')}
          </span>
        )}
      </div>
    </div>
  );
};