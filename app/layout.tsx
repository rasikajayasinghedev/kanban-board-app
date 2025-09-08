import type { Metadata } from "next";
import { Inter } from 'next/font/google';
import "./globals.css";

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Kanban Board App',
  description: 'A responsive Kanban-style task management board built with Next.js, React, TypeScript, and Tailwind CSS. Features drag-and-drop functionality and state management with Zustand.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50 text-gray-800`}>
        {children}
        <div id="modal-root" />
        </body>
    </html>
  );
}
