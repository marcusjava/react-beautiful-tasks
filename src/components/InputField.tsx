import React, { useRef } from "react";
import "./styles.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (e: React.FormEvent<HTMLFormElement>) => void;
}

// const InputField: React.FC<Props>

const InputField = ({ todo, setTodo, addTodo }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  return (
    <form
      className="form"
      onSubmit={(e) => {
        addTodo(e);
        inputRef.current?.blur();
      }}
    >
      <input
        type="input"
        ref={inputRef}
        className="form__input"
        placeholder="Enter a task"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button type="submit" className="form__submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
