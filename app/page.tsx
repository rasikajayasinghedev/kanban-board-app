'use client';

import React, { useEffect, useState } from 'react';
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { KanbanBoard } from "@/components/KanbanBoard";
import { BoardHeader } from '@/components/BoardHeader';


export default function Home() {
   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

   useEffect(()=>{
    const handleResize = () => {
      // Tailwind's 'lg' breakpoint is 1024px
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => {
      window.removeEventListener('resize', handleResize);
    };

   },[])

  return (
   <div className="flex flex-col h-screen bg-white overflow-hidden">
      <Header sidebarToggle={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden relative">
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Overlay for mobile/tablet view when sidebar is open */}
        {isSidebarOpen && (
          <div 
            onClick={() => setIsSidebarOpen(false)} 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            aria-hidden="true"
          ></div>
        )}

        <main className="flex-1 overflow-y-auto bg-gray-50">
          <BoardHeader />
          <div className='p-4 md:p-6 lg:p-8'>
            <KanbanBoard />
          </div>
          
        </main>
      </div>
    </div>
  );
}
