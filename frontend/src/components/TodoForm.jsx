import { useState } from "react";

export function TodoForm({ addTodo, filterTodo, setFilter }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    addTodo(newItem);
    setNewItem("");
  }

  return (
    <div>
      <form>
        <div>
          <label className="font-sans font-semibold tracking-widest" htmlFor="item">Enter a new task: </label>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            className="w-full rounded-lg mt-1"
          />
        </div>
        <button className="bg-lime-900 hover:bg-lime-800 text-white font-medium w-full py-1 px-4 my-5 rounded" onClick={handleSubmit}>
          Add
        </button>

        <div className="mt-0.3 mb-3">
          <select onChange={(e) => setFilter(e.target.value)} className="bg-neutral-400 text-black w-fit p-1 rounded">
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

      </form>
    </div>
  );
}
