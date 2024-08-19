import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input, Select } from "antd";
import { useTeacher } from "../TeacherContext";

const { Option } = Select;

const Classes: React.FC = () => {
  const { teacherData, addTeacher, updateTeacher, deleteTeacher } =
    useTeacher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<any | null>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: "Teacher First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Teacher Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Class", dataIndex: "class", key: "class" },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: any) => (
        <Space>
          <Button
            type="primary"
            style={{ backgroundColor: "green", color: "#fff" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            danger
            style={{ backgroundColor: "red", color: "#fff" }}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleEdit = (teacher: any) => {
    setCurrentTeacher(teacher);
    form.setFieldsValue({
      teacherId: teacher.teacherId,
      class: teacher.class,
    });
    setIsModalOpen(true);
  };

  const handleDelete = (key: number) => {
    deleteTeacher(key);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      console.log("Form Values:", values);

      const newClass = {
        key: currentTeacher ? currentTeacher.key : Date.now(),
        ...values,
      };

      if (currentTeacher) {
        console.log("Updating Class:", newClass);
        updateTeacher(newClass);
      } else {
        console.log("Adding Class:", newClass);
        addTeacher(newClass);
      }

      setIsModalOpen(false);
      form.resetFields();
      setCurrentTeacher(null);
    } catch (error) {
      console.error("Validation Failed:", error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentTeacher(null);
    form.resetFields();
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        style={{
          backgroundColor: "green",
          color: "#fff",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          border: "none",
          marginBottom: "10px",
        }}
      >
        Add Class
      </Button>
      <div style={{ padding: "24px", backgroundColor: "#fff" }}>
        <Table
          columns={columns}
          dataSource={teacherData}
          pagination={{ pageSize: 4 }}
          rowKey="key"
        />

        <Modal
          title={currentTeacher ? "Edit Class" : "Add Class"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" name="teacherForm">
            {/* <Form.Item
              label="Teacher"
              name="teacherId"
              rules={[{ required: true, message: "Please select a teacher!" }]}
            >
              <Select placeholder="Select Teacher" allowClear>
                {teacherData.map((teacher) => (
                  <Option key={teacher.key} value={teacher.key}>
                    {`${teacher.firstName} ${teacher.lastName}`}
                  </Option>
                ))}
              </Select>
            </Form.Item> */}
            <Form.Item
              label="Teacher"
              name="teacherId"
              rules={[{ required: true, message: "Please select a teacher!" }]}
            >
              <Select placeholder="Select Teacher" allowClear>
                {teacherData.length ? (
                  teacherData.map((teacher) => (
                    <Option key={teacher.key} value={teacher.key}>
                      {`${teacher.firstName} ${teacher.lastName}`}
                    </Option>
                  ))
                ) : (
                  <Option disabled>No teachers available</Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              label="Class"
              name="class"
              rules={[{ required: true, message: "Please input the class!" }]}
            >
              <Input placeholder="Class" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Classes;

// import React, { useState } from "react";
// import { Table, Button, Space, Modal, Form, Input, Select } from "antd";
// import { useTeacher } from "../TeacherContext";

// const { Option } = Select;

// const Classes: React.FC = () => {
//   const { teacherData, addTeacher, updateTeacher, deleteTeacher } = useTeacher();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTeacher, setCurrentTeacher] = useState<any | null>(null); // `any` tipidan foydalaning yoki `DataType`ni yangilang
//   const [form] = Form.useForm();

//   const columns = [
//     { title: "Teacher First Name", dataIndex: "firstName", key: "firstName" },
//     { title: "Teacher Last Name", dataIndex: "lastName", key: "lastName" },
//     { title: "Class", dataIndex: "class", key: "class" },
//     {
//       title: "Actions",
//       key: "action",
//       render: (_: any, record: any) => (
//         <Space>
//           <Button
//             type="primary"
//             style={{ backgroundColor: "green", color: "#fff" }}
//             onClick={() => handleEdit(record)}
//           >
//             Edit
//           </Button>
//           <Button
//             danger
//             style={{ backgroundColor: "red", color: "#fff" }}
//             onClick={() => handleDelete(record.key)}
//           >
//             Delete
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   const handleEdit = (teacher: any) => {
//     setCurrentTeacher(teacher);
//     form.setFieldsValue({
//       teacherId: teacher.teacherId,
//       class: teacher.class,
//     });
//     setIsModalOpen(true);
//   };

//   const handleDelete = (key: number) => {
//     deleteTeacher(key);
//   };

//   const handleOk = async () => {
//     try {
//       const values = await form.validateFields();
//       console.log("Form Values:", values);

//       const newClass = {
//         key: currentTeacher ? currentTeacher.key : Date.now(),
//         ...values,
//       };

//       if (currentTeacher) {
//         console.log("Updating Class:", newClass);
//         updateTeacher(newClass); // Agar siz `updateTeacher` metodini to'g'ri ishlatayotgan bo'lsangiz
//       } else {
//         console.log("Adding Class:", newClass);
//         addTeacher(newClass); // Agar siz `addTeacher` metodini to'g'ri ishlatayotgan bo'lsangiz
//       }

//       setIsModalOpen(false);
//       form.resetFields();
//       setCurrentTeacher(null);
//     } catch (error) {
//       console.error("Validation Failed:", error);
//     }
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setCurrentTeacher(null);
//     form.resetFields();
//   };

//   return (
//     <>
//       <Button
//         onClick={() => setIsModalOpen(true)}
//         style={{
//           backgroundColor: "green",
//           color: "#fff",
//           padding: "10px 20px",
//           borderRadius: "5px",
//           cursor: "pointer",
//           fontSize: "16px",
//           transition: "background-color 0.3s ease",
//           border: "none",
//           marginBottom: "10px",
//         }}
//       >
//         Add Class
//       </Button>
//       <div style={{ padding: "24px", backgroundColor: "#fff" }}>
//         <Table
//           columns={columns}
//           dataSource={teacherData}
//           pagination={{ pageSize: 4 }}
//           rowKey="key"
//         />

//         <Modal
//           title={currentTeacher ? "Edit Class" : "Add Class"}
//           open={isModalOpen}
//           onOk={handleOk}
//           onCancel={handleCancel}
//           okText="Save"
//           cancelText="Cancel"
//         >
//           <Form form={form} layout="vertical" name="teacherForm">
//             <Form.Item
//               label="Teacher"
//               name="teacherId"
//               rules={[{ required: true, message: "Please select a teacher!" }]}
//             >
//               <Select placeholder="Select Teacher">
//                 {teacherData.map((teacher) => (
//                   <Option key={teacher.key} value={teacher.key}>
//                     {`${teacher.firstName} ${teacher.lastName}`}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//             <Form.Item
//               label="Class"
//               name="class"
//               rules={[{ required: true, message: "Please input the class!" }]}
//             >
//               <Input placeholder="Class" />
//             </Form.Item>
//             <Form.Item
//               label="Class Number"
//               name="classNumber"
//             >
//               <Select placeholder="Select a number">
//                 {Array.from({ length: 11 }, (_, number) => (
//                   <Option key={number + 1} value={number + 1}>
//                     {number + 1}
//                   </Option>
//                 ))}
//               </Select>
//             </Form.Item>
//           </Form>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default Classes;
