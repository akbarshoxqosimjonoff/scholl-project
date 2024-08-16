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
              <th>Matematika</th>
              <th>ingilis tili</th>
              <th>Biologiya</th>
              <th>Fizika</th>
              <th>Kimyo</th>
              <th>Jami</th>
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
