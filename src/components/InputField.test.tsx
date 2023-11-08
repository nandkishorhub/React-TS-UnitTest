import { render, screen } from "@testing-library/react";
import InputField from "./InputField";
import userEvent from "@testing-library/user-event";

test("input functionality check", async () => {
  render(<InputField todo="" setTodo={jest.fn()} handleAdd={jest.fn()} />);

  const inputBox = screen.getByTestId("task-input");
  userEvent.type(inputBox, "Hello React");

  const goButton = screen.getByRole("button", { name: /go/i });
  userEvent.click(goButton);
  expect(inputBox).toHaveTextContent("");

  inputBox.focus();
  expect(inputBox).toHaveFocus();

  userEvent.click(goButton);
  expect(inputBox).not.toHaveFocus();
});
