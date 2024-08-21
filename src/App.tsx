
import React from "react";
import ReactDOM from "react-dom";
import { TeacherProvider } from "./TeacherContext";
import { BrowserRouter as Router } from "react-router-dom";
import Sidebar from "./pages/saidbar"; // Ensure correct path and naming
import Appliances from "./pages/classes"; // Ensure correct path and naming

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Sidebar />
        {}
      </div>
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <TeacherProvider>
      <App />
    </TeacherProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
export default App;
