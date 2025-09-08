import React, { useState } from 'react';
import {
  ImageIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ChevronRightIcon,
  GridIcon,
  FolderIcon,
  MessageIcon,
  CalendarIcon,
  UsersIcon,
  SupportIcon,
  LogoutIcon,
} from './icons';

interface SidebarProps {
  isOpen: boolean;
}

const NavLink: React.FC<{ icon: React.ReactNode; text: string; active?: boolean; badge?: number; }> = ({ icon, text, active, badge }) => (
    <a href="#" className={`flex items-center p-2 rounded-lg text-sm font-medium transition-colors ${active ? 'text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
        {icon}
        <span className="ml-3">{text}</span>
        {badge && (
            <span className="ml-auto text-xs font-semibold text-white bg-orange-500 rounded-full px-2 py-0.5">
                {badge}
            </span>
        )}
    </a>
);

const BoardLink: React.FC<{ text: string; active?: boolean }> = ({ text, active }) => (
    <a href="#" className={`flex items-center text-sm py-1.5 px-2 rounded-md ${active ? 'text-blue-600 font-semibold' : 'text-gray-500 hover:text-gray-800'}`}>
        <ChevronRightIcon className={`w-4 h-4 mr-2 ${active ? 'text-blue-600' : 'text-gray-400'}`} />
        {text}
    </a>
);

export const Sidebar: React.FC<SidebarProps> = ({isOpen}) => {
  const [isBoardsOpen, setIsBoardsOpen] = useState(true);
  
  const isResponsive = typeof isOpen !== 'undefined';
  const effectiveIsOpen = isOpen === undefined ? true : isOpen;

  const responsiveClasses = isResponsive
    ? `transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static absolute inset-y-0 left-0 z-30 ${effectiveIsOpen ? 'translate-x-0' : '-translate-x-full'}`
    : '';

  return (
    <aside className={`w-72 bg-white border-r border-gray-200 flex-shrink-0 flex flex-col justify-between ${responsiveClasses}`}>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                <div className="flex items-center justify-between cursor-pointer">
                    <div className="flex items-center">
                        <div className="flex items-center justify-center h-10 w-10 bg-gray-800 rounded-full">
                            <ImageIcon className="w-5 h-5 text-white" />
                        </div>
                        <div className="ml-3">
                            <p className="text-xs text-gray-500">workspace</p>
                            <p className="text-sm font-semibold text-gray-800">Root folder</p>
                        </div>
                    </div>
                    <ChevronDownIcon className="w-5 h-5 text-gray-500" />
                </div>
            </div>

            <nav className="space-y-1">
                <NavLink icon={<GridIcon className="w-5 h-5" />} text="Dashboard" />
                
                <div>
                    <button onClick={() => setIsBoardsOpen(!isBoardsOpen)} className="w-full flex items-center p-2 rounded-lg text-sm font-medium transition-colors text-blue-600 bg-blue-50 border border-gray-200">
                        <FolderIcon className="w-5 h-5" />
                        <span className="ml-3">Boards</span>
                        {isBoardsOpen ? <ChevronUpIcon className="w-5 h-5 ml-auto"/> : <ChevronDownIcon className="w-5 h-5 ml-auto" />}
                    </button>
                    {isBoardsOpen && (
                        <div className="mt-2 pl-4 pr-2 py-2 space-y-1 border border-gray-200 rounded-lg">
                            <BoardLink text="Create routes" />
                            <BoardLink text="Deleplement React App" />
                            <BoardLink text="Sport Xi Project" active />
                            <BoardLink text="Wordpress theme" />
                        </div>
                    )}
                </div>
                
                <NavLink icon={<MessageIcon className="w-5 h-5" />} text="Messages" badge={3} />
                <NavLink icon={<CalendarIcon className="w-5 h-5" />} text="Calendar" />
                <NavLink icon={<UsersIcon className="w-5 h-5" />} text="Team members" />
            </nav>
        </div>

        <div className="p-4 mt-auto border-t border-gray-200 space-y-2">
            <a href="#" className="flex items-center p-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100">
                <SupportIcon className="w-5 h-5" />
                <span className="ml-3">Support</span>
            </a>
            <button className="w-full flex items-center p-2 rounded-lg text-sm font-medium text-white bg-gray-800 hover:bg-gray-900">
                <LogoutIcon className="w-5 h-5" />
                <span className="ml-3">Logout</span>
            </button>
        </div>
    </aside>
  );
};