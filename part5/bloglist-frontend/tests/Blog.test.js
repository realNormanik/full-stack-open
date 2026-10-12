import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

import Blog from "../components/Blog";
import BlogForm from "../components/BlogForm";

test("renders blog title and author, but not URL or likes by default", () => {
  const blog = {
    title: "Testing React Components",
    author: "John Doe",
    url: "https://example.com",
    likes: 10,
    user: {
      username: "John Doe",
      name: "John Doe"
    }
  };

  render(<Blog blog={blog} user={{ username: "testuser" }} onLike={() => {}} onDelete={() => {}} />);

  expect(screen.getByText("Testing React Components")).toBeDefined();
  expect(screen.getByText("John Doe")).toBeDefined();
  expect(screen.queryByText("https://example.com")).toBeNull();
  expect(screen.queryByText("likes 10")).toBeNull();
});

test("shows URL and likes when the details button is clicked", () => {
  const blog = {
    title: "Testing React Components",
    author: "John Doe",
    url: "https://example.com",
    likes: 10,
  };

  render(<Blog blog={blog} user={{ username: "testuser" }} onLike={() => {}} onDelete={() => {}} />);
  
  const button = screen.getByText("view");
  fireEvent.click(button);

  expect(screen.getByText("https://example.com")).toBeDefined();
  expect(screen.getByText("likes 10")).toBeDefined();
});

test("clicking the like button twice calls event handler twice", () => {
  const blog = {
    title: "Testing React Components",
    author: "John Doe",
    url: "https://example.com",
    likes: 10,
  };
  
  const mockLikeHandler = jest.fn();
  render(<Blog blog={blog} user={{ username: "testuser" }} onLike={mockLikeHandler} onDelete={() => {}} />);
  
  fireEvent.click(screen.getByText("view"));
  const likeButton = screen.getByText("like");
  
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);
  
  expect(mockLikeHandler).toHaveBeenCalledTimes(2);
});

test("BlogForm calls event handler with correct data when a new blog is created", () => {
  const mockCreateHandler = jest.fn();
  render(<BlogForm onAddBlog={mockCreateHandler} />);

  fireEvent.change(screen.getByPlaceholderText("Title"), {
    target: { value: "New Blog Title" },
  });
  fireEvent.change(screen.getByPlaceholderText("Author"), {
    target: { value: "Jane Doe" },
  });
  fireEvent.change(screen.getByPlaceholderText("URL"), {
    target: { value: "https://newblog.com" },
  });
  
  fireEvent.submit(screen.getByText("create"));
  
  expect(mockCreateHandler).toHaveBeenCalledTimes(1);
  expect(mockCreateHandler).toHaveBeenCalledWith({
    title: "New Blog Title",
    author: "Jane Doe",
    url: "https://newblog.com",
  });
});