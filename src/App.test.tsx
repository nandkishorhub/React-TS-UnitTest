import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";
import App from "./App";

test("check for task creation", async () => {
  render(<App />);
  //get the input
  const inputBox = screen.getByTestId("task-input");
  userEvent.type(inputBox, "Hello React");
  expect(inputBox).toHaveValue("Hello React");

  const goButton = screen.getByRole("button", { name: /go/i });
  userEvent.click(goButton);
  const taskSpan = await screen.findByText("Hello React");
  expect(taskSpan).toBeInTheDocument();
});

test("task edit and delete functionality", async () => {
  render(<App />);
  const inputBox = screen.getByTestId("task-input");
  userEvent.type(inputBox, "Hello React");

  const goButton = screen.getByRole("button", { name: /go/i });
  userEvent.click(goButton);

  const editBtn = screen.getByTestId("edit-btn");
  userEvent.click(editBtn);

  const editInputBox = screen.getByTestId("edit-input");
  expect(editInputBox).toBeInTheDocument();
  expect(editInputBox).toHaveValue("Hello React");
  userEvent.clear(editInputBox);
  userEvent.type(editInputBox, "Hello Node");
  userEvent.keyboard("{enter}");

  const editTaskSpan = await screen.findByText("Hello Node");
  expect(editTaskSpan).toBeInTheDocument();

  const delBtn = screen.getByTestId("del-btn");
  userEvent.click(delBtn);

  const deletedTask =   screen.queryByText("Hello Node");
  expect(deletedTask).not.toBeInTheDocument();
});

 