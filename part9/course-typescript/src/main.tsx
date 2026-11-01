import ReactDOM from "react-dom/client";

// @ts-expect-error CSS imports are handled by the bundler.
import "./index.css";
import App from "./App";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <App />
);