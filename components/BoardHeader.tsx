import React from 'react';
import { PencilIcon } from './icons';

export const BoardHeader: React.FC = () => {
    // Hardcoded data
    const assignees = [
        { id: 'user1', avatarUrl: 'https://i.pravatar.cc/36?u=assignee-c' },
        { id: 'user2', avatarUrl: 'https://i.pravatar.cc/36?u=assignee-b' },
        { id: 'user3', avatarUrl: 'https://i.pravatar.cc/36?u=assignee-a' },
    ];
    const moreAssigneesCount = 2;

    return (
        <div className="bg-white">
            <div className="p-4 sm:p-5">
                <div className="flex flex-row items-start justify-between gap-4">
                    {/* Left side: Title, status, and subtitle */}
                    <div>
                        <div className="flex items-center flex-wrap gap-x-3 gap-y-2">
                            <h1 className="text-2xl font-bold text-gray-900 leading-tight">Sport Xi Project</h1>
                            <span className="text-xs font-bold text-black bg-yellow-400 px-2.5 py-1 rounded-md whitespace-nowrap">
                                In progress
                            </span>
                        </div>
                        <p className="mt-1.5 text-sm text-gray-500">event production</p>
                    </div>

                    {/* Right side: Assignees and Manage button */}
                    <div className="flex items-center flex-shrink-0 gap-x-3 sm:gap-x-4">
                        <span className="text-sm text-gray-500">assigned</span>
                        <div className="flex items-center -space-x-2.5">
                            {assignees.map((assignee) => (
                                <img
                                    key={assignee.id}
                                    className="inline-block h-9 w-9 rounded-full ring-2 ring-white"
                                    src={assignee.avatarUrl}
                                    alt="Assignee"
                                />
                            ))}
                            {moreAssigneesCount > 0 && (
                                <div className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-200 text-slate-700 text-xs font-bold ring-2 ring-white">
                                    +{moreAssigneesCount}
                                </div>
                            )}
                        </div>
                        <button className="flex items-center gap-x-2 px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                            <span>Manage</span>
                            <PencilIcon className="w-4 h-4 text-gray-500" />
                        </button>
                    </div>
                </div>

                {/* Bottom section with last updated date */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-500">Last updated on: 04 April, 2022</p>
                </div>
            </div>
        </div>
    );
};
