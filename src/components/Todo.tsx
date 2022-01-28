import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../model";
import { Draggable } from "react-beautiful-dnd";

// import { Container } from './styles';

interface Props {
  index: number;
  todo: Todo;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todos: Todo[];
}

const TodoItem = ({ index, todo, setTodos, todos }: Props) => {
  const [edit, setEdit] = useState(false);

  const [editTodo, setEditTodo] = useState(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleDone = (id: number) => {
    setTodos((todos) =>
      todos.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };
  const handleDelete = (id: number) => {
    setTodos((todos) => todos.filter((t) => t.id !== id));
  };

  const handleEdit = () => {
    if (!todo.isDone) {
      setEdit(!edit);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTodos((todos) =>
      todos.map((t) => (t.id === todo.id ? { ...todo, todo: editTodo } : t))
    );
    setEdit(false);
  };

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleSubmit(e)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {!edit ? (
            todo.isDone ? (
              <s className="todos__single--text">{todo.todo}</s>
            ) : (
              <span className="todos__single--text">{todo.todo}</span>
            )
          ) : (
            <input
              type="text"
              ref={inputRef}
              className="todos__single--text"
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
            />
          )}
          <div>
            <span className="icon" onClick={() => handleEdit()}>
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default TodoItem;
