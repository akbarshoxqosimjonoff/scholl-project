import React from "react";
import "./dwd.css";

const Jurnal = () => {
  const students = [
    {
      name: "Ali",
      maths: 87,
      english: 57,
      biology: 77,
      physics: 63,
      chemistry: 87,
    },
    {
      name: "Aslbek",
      maths: 98,
      english: 88,
      biology: 58,
      physics: 85,
      chemistry: 90,
    },
    {
      name: "Islom",
      maths: 85,
      english: 95,
      biology: 45,
      physics: 90,
      chemistry: 81,
    },
    {
      name: "Maruf",
      maths: 32,
      english: 62,
      biology: 98,
      physics: 98,
      chemistry: 62,
    },
    {
      name: "Akbar",
      maths: 66,
      english: 46,
      biology: 73,
      physics: 66,
      chemistry: 76,
    },
    {
      name: "Laziz",
      maths: 72,
      english: 12,
      biology: 54,
      physics: 70,
      chemistry: 72,
    },
    {
      name: "Nurbek",
      maths: 56,
      english: 66,
      biology: 93,
      physics: 88,
      chemistry: 44,
    },
    {
      name: "Alisherbek",
      maths: 98,
      english: 65,
      biology: 44,
      physics: 99,
      chemistry: 77,
    },
    {
      name: "Nurislom",
      maths: 92,
      english: 52,
      biology: 82,
      physics: 77,
      chemistry: 49,
    },
  ];

  return (
    <div className="excel-container">
      <div className="menu-bar">
        <div className="menu-left">
          <button>File</button>
          <button>Home</button>
          <button>Insert</button>
          <button>Page Layout</button>
          <button>Formulas</button>
          <button>Data</button>
          <button>Review</button>
          <button>View</button>
          <button>Help</button>
        </div>
        <div className="menu-right">
          <input type="text" placeholder="Tell me what you want to do" />
        </div>
      </div>
      <div className="toolbar">
        <div className="toolbar-left">
          <button>Cut</button>
          <button>Copy</button>
          <button>Paste</button>
        </div>
        <div className="toolbar-right">
          <button>B</button>
          <button>I</button>
          <button>U</button>
          <select>
            <option>Georgia</option>
            <option>Arial</option>
            <option>Times New Roman</option>
          </select>
          <input type="number" value="11" />
          <button>Align</button>
          <button>Wrap Text</button>
        </div>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>STUDENT NAME</th>
              <th>MATHS</th>
              <th>ENGLISH</th>
              <th>BIOLOGY</th>
              <th>PHYSICS</th>
              <th>CHEMISTRY</th>
              <th>TOTAL MARKS</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => {
              const totalMarks =
                student.maths +
                student.english +
                student.biology +
                student.physics +
                student.chemistry;
              return (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.maths}</td>
                  <td>{student.english}</td>
                  <td>{student.biology}</td>
                  <td>{student.physics}</td>
                  <td>{student.chemistry}</td>
                  <td>{totalMarks}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Jurnal;
