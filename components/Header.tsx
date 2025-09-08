import React from 'react';
import { BoardAppLogoIcon, SearchIcon, FilterIcon, MenuIcon, BellIcon, PlusIcon, ImageIcon } from './icons';


interface HeaderProps {
    sidebarToggle?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ sidebarToggle }) => {
  return (
    <header className="flex-shrink-0 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4 md:px-6">
        <div className="flex items-center">
          {sidebarToggle && (
            <button onClick={sidebarToggle} className="lg:hidden mr-4 text-gray-600 hover:text-gray-900">
                <MenuIcon className="w-6 h-6" />
            </button>
          )}
            <div className="flex items-center space-x-3">
            <BoardAppLogoIcon className="w-8 h-8" />
            <span className="font-semibold text-xl">
              <span className="text-gray-800">Board</span> <span className="text-blue-600">App</span>
            </span>
        </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="hidden md:inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2">
            <span>Create new board</span>
            <PlusIcon className="w-5 h-5" />
          </button>
          <div className="relative hidden sm:block">
            <SearchIcon className="absolute w-5 h-5 text-gray-400 left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tasks..."
              value={""}
              onChange={(e) => ("")}
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-900 bg-gray-100 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white"
            />
          </div>
          <button className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
            <FilterIcon className="w-5 h-5" />
          </button>
          <button className="relative p-2 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700">
            <BellIcon className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-orange-500 ring-2 ring-white"></span>
          </button>
          <div className="h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center">
            <ImageIcon className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </header>
  );
};