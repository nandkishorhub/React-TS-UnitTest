import React, { useRef } from "react";
import "./style.css";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (e: React.FormEvent) => void;
}
const InputField = ({ todo, setTodo, handleAdd }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setTodo(e.target.value);
  };
  return (
    <form
      className="input"
      onSubmit={(e) => {
        e.preventDefault();
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        type="input"
        placeholder="Enter a task"
        className="input__box"
        value={todo}
        data-testid="task-input"
        onChange={handleChange}
      ></input>
      <button className="input_submit" type="submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
