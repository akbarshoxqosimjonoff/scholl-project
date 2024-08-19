import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
  sinf?: string;
}

export interface TeacherContextType {
  teacherData: DataType[];
  addTeacher: (teacher: DataType) => void;
  updateTeacher: (teacher: DataType) => void;
  deleteTeacher: (key: number) => void;
  setTeacherData: (data: DataType[]) => void; // Include this function
}

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

interface TeacherProviderProps {
  children: ReactNode;
}

export const TeacherProvider: React.FC<TeacherProviderProps> = ({ children }) => {
  const [teacherData, setTeacherData] = useState<DataType[]>([]);

  const addTeacher = (teacher: DataType) => {
    setTeacherData((prev) => [...prev, teacher]);
  };

  const updateTeacher = (updatedTeacher: DataType) => {
    setTeacherData((prev) =>
      prev.map((teacher) =>
        teacher.key === updatedTeacher.key ? updatedTeacher : teacher
      )
    );
  };

  const deleteTeacher = (key: number) => {
    setTeacherData((prev) => prev.filter((teacher) => teacher.key !== key));
  };

  return (
    <TeacherContext.Provider value={{ teacherData, addTeacher, updateTeacher, deleteTeacher, setTeacherData }}>
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = (): TeacherContextType => {
  const context = useContext(TeacherContext);
  if (context === undefined) {
    throw new Error('useTeacher must be used within a TeacherProvider');
  }
  return context;
};
