'use client';

import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { KanbanBoard } from "@/components/KanbanBoard";


export default function Home() {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8">
          <KanbanBoard/>
        </main>
      </div>

    </div>
  );
}
