import "../App.css";
import { useEffect, useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import axios from "axios"; 

function Todo() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("All")

  useEffect(() => {
    // Function to fetch todos
    const fetchTodos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/todos");
        setTodos(response.data); // Update the todos state with fetched data
      } catch (error) {
        console.error("There was an error fetching the todos:", error);
      }
    };
  
    fetchTodos();
  }, []);

  function addTodo(title) {
    const newTodo = {
      id: crypto.randomUUID(), // Generate a UUID for the new todo item
      title,
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);

    axios.post("http://localhost:8000/todos/new", newTodo).catch((error) => {
      console.error("There was an error adding the todo: ", error);
    });
  }

  function toggleTodo(id, completed) {
    axios
      .put(`http://localhost:8000/todos/edit/${id}`, { completed })
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.map((todo) => {
            if (todo.id === id) {
              return { ...todo, completed };
            }
            return todo;
          })
        );
      })
      .catch((error) => {
        console.error("There was an error updating the todo: ", error.response);
      });
  }

  function deleteTodo(id) {
    axios
      .delete(`http://localhost:8000/todos/delete/${id}`)
      .then(() => {
        setTodos((currentTodos) =>
          currentTodos.filter((todo) => todo.id !== id)
        );
      })
      .catch((error) => {
        console.error("There was an error deleting the todo: ", error);
      });
  }

  function filterTodo() {
    switch (filter) {
      case "Active":
        return todos.filter((todo) => !todo.completed);
      case "Completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }
  
  return (
    <>
      <TodoForm addTodo={addTodo} filterTodo={filterTodo} setFilter={setFilter}/>
      <TodoList todos={filterTodo()} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

export default Todo;
