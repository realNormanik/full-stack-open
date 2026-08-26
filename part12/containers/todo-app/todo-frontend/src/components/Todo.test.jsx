import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import "@testing-library/jest-dom";

test("renders todo content", () => {
  const todo = { text: "Buy milk", done: false };
  render(<Todo todo={todo} />);
  expect(screen.getByText("Buy milk")).toBeInTheDocument();
});