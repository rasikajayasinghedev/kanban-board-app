# 🏊 Swimlane Dashboard (Next.js + Tailwind + Zustand)

A **Swimlane Dashboard** built with **Next.js**, featuring drag-and-drop tasks, dynamic search, and persistent task state.

---

## 📋 Project Requirements

### 🎨 UI Implementation
- Recreate the swimlane dashboard based on the provided **Figma mockup** (`Board App – Dashboard.fig`).
- Ensure the layout is **pixel-perfect**, **responsive** (at least up to `768px`), and **cross-browser compatible**.
- Styling implemented using **TailwindCSS**.

### 🏊 Swimlane Features
- Display tasks in **swimlanes** based on their `status`.

### 🖱️ Drag-and-Drop Functionality
- Drag-and-drop to move tasks between swimlanes.
- When moved, tasks update their `status` property accordingly.

### 🗂️ State Management
- Use **Zustand** for task state management.
- Ensure all state updates reflect immediately in the UI.

### 📑 Prepopulate Data
- Fetch initial task data from a **JSON file** acting as a **mock API**.

### 💾 Data Persistence
- Store task updates in **localStorage** (or `sessionStorage`) to persist across page reloads.

### 🔍 Search Task
- A **search bar** dynamically filters tasks.
- As the user types, only tasks matching the query remain visible in their swimlanes.

---

## 🚀 Getting Started

### 1️⃣ Clone Repository
```bash
git clone https://github.com/your-username/kanban-board-app.git
cd kanban-board-app
npm install
npm run dev