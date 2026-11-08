import { useState } from "react";

const TodoList = ({ todos, deleteTodo, toggleTodo }) => {
  // Id of the todo the user has just completed; the celebration plays only for this one
  const [celebratingId, setCelebratingId] = useState(null);

  const onClickDelete = (todo) => () => {
    deleteTodo(todo);
  };

  const onClickToggle = (todo) => () => {
    if (!todo.done) setCelebratingId(todo._id)

      toggleTodo(todo)
  };

  if (todos.length === 0) {
    return <p className="empty">No todos yet. Add your first one above.</p>;
  };

  return (
    <ul className="stack">
      {todos.map(todo => {
        const done = todo.done ? "true" : "false";
        const celebrate = todo._id === celebratingId ? "true" : "false";

        return (
          <li key={todo._id} className="todo-row" data-done={done} data-celebrate={celebrate}>
            <span className="mark" data-done={done} data-celebrate={celebrate} aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path pathLength="1" d="M3 7.5 5.8 10 11 4" />
              </svg>
            </span>

            <span className="todo-text" data-done={done}>
              {todo.text}
            </span>

            <span className="visually-hidden">
              {todo.done ? "This todo is done" : "This todo is not done"}
            </span>

            <span className="actions">
              <button className={todo.done ? "ghost" : "success"} onClick={onClickToggle(todo)}>
                {todo.done ? 
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="20" height="20" fill="currentColor">
                    <path d="M216.3 124C262.5 44 378 44 424.2 124L461.5 188.6L489.2 172.6C497.6 167.7 508.1 168.4 515.8 174.3C523.5 180.2 526.9 190.2 524.4 199.6L500.9 287C497.5 299.8 484.3 307.4 471.5 304L384.1 280.6C374.7 278.1 367.8 270.2 366.5 260.6C365.2 251 369.9 241.5 378.3 236.7L406 220.7L368.7 156.1C347.1 118.8 293.3 118.8 271.7 156.1L266.4 165.2C257.6 180.5 238 185.7 222.7 176.9C207.4 168.1 202.2 148.5 211 133.1L216.3 124zM513.7 343.1C529 334.3 548.6 339.5 557.4 354.8L562.7 363.9C608.9 443.9 551.2 543.9 458.8 543.9L384.2 543.9L384.2 575.9C384.2 585.6 378.4 594.4 369.4 598.1C360.4 601.8 350.1 599.8 343.2 592.9L279.2 528.9C269.8 519.5 269.8 504.3 279.2 495L343.2 431C350.1 424.1 360.4 422.1 369.4 425.8C378.4 429.5 384.2 438.3 384.2 448L384.2 480L458.8 480C501.9 480 528.9 433.3 507.3 396L502 386.9C493.2 371.6 498.4 352 513.7 343.2zM115 299.4L87.3 283.4C78.9 278.5 74.2 269.1 75.5 259.5C76.8 249.9 83.7 242 93.1 239.5L180.5 216C193.3 212.6 206.5 220.2 209.9 233L233.3 320.4C235.8 329.8 232.4 339.7 224.7 345.7C217 351.7 206.5 352.3 198.1 347.4L170.4 331.4L133.1 396C111.5 433.3 138.5 480 181.6 480L192.2 480C209.9 480 224.2 494.3 224.2 512C224.2 529.7 209.9 544 192.2 544L181.6 544C89.3 544 31.6 444 77.8 364L115 299.4z" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22" fill="currentColor">
                    <path d="M530.8 134.1C545.1 144.5 548.3 164.5 537.9 178.8L281.9 530.8C276.4 538.4 267.9 543.1 258.5 543.9C249.1 544.7 240 541.2 233.4 534.6L105.4 406.6C92.9 394.1 92.9 373.8 105.4 361.3C117.9 348.8 138.2 348.8 150.7 361.3L252.2 462.8L486.2 141.1C496.6 126.8 516.6 123.6 530.9 134z" />
                  </svg>
                }
              </button>

              <button className="danger" onClick={onClickDelete(todo)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" width="22" height="22" fill="currentColor">
                  <path d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z" />
                </svg>
              </button>
            </span>
          </li>
        )
      })}
    </ul>
  );
};

export default TodoList;