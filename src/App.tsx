// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import Sidebar from "./pages/saidbar";
// import Appliances from "./pages/classes";

// const App = () => {
//   return (
//     <Router>
//       <div className="">
//         <Sidebar />
//       </div>
//     </Router>
//   );
// };

// export default App;
// index.tsx
// index.tsx
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
