import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
interface Props {
  todo: Todo;

  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const editInputRef = useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, isDone: !todo.isDone } : todo;
      })
    );
  };

  useEffect(() => {
    editInputRef.current?.focus();
  }, [edit]);

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos.map((todo) => {
        return todo.id === id ? { ...todo, todo: editTodo } : todo;
      })
    );
    setEdit(!edit);
  };

  return (
    <div>
      <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
        {edit ? (
          <input
            ref={editInputRef}
            value={editTodo}
            data-testid="edit-input"
            onChange={(e) => setEditTodo(e.target.value)}
            className="todos__single--text"
          />
        ) : todo.isDone ? (
          <s className="todos__single--text">{todo.todo}</s>
        ) : (
          <span
            className="todos__single--text"
            aria-roledescription="taskPrimarySpan"
          >
            {todo.todo}
          </span>
        )}

        <div>
          <span
            data-testid="edit-btn"
            className="icon"
            onClick={() => {
              if (!edit && !todo.isDone) {
                setEdit(!edit);
              }
            }}
          >
            <AiFillEdit />
          </span>
          <span
            data-testid="del-btn"
            className="icon"
            onClick={() => handleDelete(todo.id)}
          >
            <AiFillDelete />
          </span>
          <span className="icon" onClick={() => handleDone(todo.id)}>
            <MdDone />
          </span>
        </div>
      </form>
    </div>
  );
};

export default SingleTodo;
