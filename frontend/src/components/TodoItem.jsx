import { useState } from "react";

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo }) {
  return (
    <li>
      <label className="flex items-center w-full">
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        {todoContent}
        <button className="bg-red-900 hover:bg-red-800 text-white font-bold p-2 ml-1 rounded-md" onClick={() => deleteTodo(id)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </button>
      </label>
    </li>
  );
}
