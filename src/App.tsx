import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todo) {
      setTodos((oldTodos) => [
        ...oldTodos,
        { id: Date.now(), todo, isDone: false },
      ]);
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    let active = todos;
    let complete = completedTodos;

    // Source Logic
    //>>>>>>>>>>>>>
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      add.isDone = true;
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      add.isDone = false;
      complete.splice(source.index, 1);
    }

    // Destination Logic
    //<<<<<<<<<<<<<<<<<<<<<<<
    if (destination.droppableId === "TodosList") {
      console.log(complete.filter((c) => +destination.droppableId === c.id));
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskfy</span>
        <InputField todo={todo} setTodo={setTodo} addTodo={addTodo} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
}

export default App;
