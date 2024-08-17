// index.tsx
import React from "react";
import ReactDOM from "react-dom";
import { TeacherProvider } from "./TeacherContext";
import App from "./App"; // Ensure correct path

ReactDOM.render(
  <React.StrictMode>
    <TeacherProvider>
      <App />
    </TeacherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
