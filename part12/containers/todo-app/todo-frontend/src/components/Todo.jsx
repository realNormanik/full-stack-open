const Todo = ({ todos }) => {
  return (
    <div>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.text}
          {todo.done ? " ✔️" : ""}
        </li>
      ))}
    </div>
  );
};

export default Todo;