import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navbar from "./assets/components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [count, setCount] = useState(0);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const stored = localStorage.getItem("todos");
    return stored ? JSON.parse(stored) : [];
  });
  const [showfinished, setShowfinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const toggleFinished = (params) => {
    setShowfinished(!showfinished);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
  };
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id != id;
    });
    setTodos(newTodos);
  };
  const handleEdit = (e, id) => {
    let t = todos.filter((item) => {
      return item.id === id;
    });
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
  };
  const handleCheckbox = (e) => {
    const id = e.target.name;

    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item,
    );

    setTodos(newTodos);
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-100  min-h-[80vh] md:w-[35%]">
        <h1 className="font-bold text-center text-3xl">
          iTask - Manage your todos at one place{" "}
        </h1>
        <div className="addTodo flex flex-col mb-2 gap-4">
          <h2 className="text-xl font-bold my-4">Add a Todo</h2>
          <div className="flex">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className="bg-white w-full rounded-full px-5 py-1 mb-1  "
            ></input>
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-800 mx-2 hover:bg-violet-950 disabled:bg-violet-600 p-2 py-1 text-sm font-bold text-white rounded-full "
            >
              Save
            </button>
          </div>
        </div>
        <input
          className="mr-2"
          type="checkbox"
          id="show"
          checked={showfinished}
          onChange={toggleFinished}
        ></input>
        Show Finished
        <div className="h-[1px] bg-black opacity-15 my-3 w-[90%] mx-auto"></div>
        <h2 className="text-xl font-bold mt-2">Your Todos</h2>
        <div className="todos">
          {todos.length == 0 && <div className="m-5">No todos to display</div>}
          {todos.map((item) => {
            return (
              (showfinished || !item.isCompleted) && (
                <div key={item.id} className="todo flex  justify-between my-3">
                  <div className="flex gap-5">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      id=""
                    ></input>
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>

                  <div className="buttons flex h-full">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1"
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
