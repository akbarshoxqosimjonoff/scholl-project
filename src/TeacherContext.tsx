import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
  sinf?: string;
}

interface TeacherContextType {
  teacherData: DataType[];
  addTeacher: (teacher: DataType) => void;
  updateTeacher: (teacher: DataType) => void;
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export const TeacherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [teacherData, setTeacherData] = useState<DataType[]>(() => {
    const storedData = localStorage.getItem("teacherData");
    return storedData ? JSON.parse(storedData) : [];
  });

  const addTeacher = (teacher: DataType) => {
    setTeacherData((prevData) => [...prevData, teacher]);
    localStorage.setItem("teacherData", JSON.stringify([...teacherData, teacher]));
  };

  const updateTeacher = (teacher: DataType) => {
    setTeacherData((prevData) =>
      prevData.map((t) => (t.key === teacher.key ? teacher : t))
    );
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
  };

  return (
    <TeacherContext.Provider value={{ teacherData, addTeacher, updateTeacher }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};
