import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";

import "./index.css";
import App from "./App";
import client from "./client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);