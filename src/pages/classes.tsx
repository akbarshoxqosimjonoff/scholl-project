import React, { useState, useEffect } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useTeacher, DataType } from "../TeacherContext";

const Classes: React.FC = () => {
  const { teacherData, setTeacherData, addTeacher, updateTeacher, deleteTeacher } = useTeacher(); // Ensure setTeacherData is available
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const storedData = localStorage.getItem("teacherData");
    if (storedData) {
      setTeacherData(JSON.parse(storedData));
    }
  }, [setTeacherData]);

  useEffect(() => {
    // Save data to localStorage whenever teacherData changes
    localStorage.setItem("teacherData", JSON.stringify(teacherData));
  }, [teacherData]);

  const columns = [
    { title: "Teacher firstname", dataIndex: "firstName", key: "firstName" },
    { title: "Teacher lastname", dataIndex: "lastName", key: "lastName" },
    { title: "Class", dataIndex: "sinf", key: "sinf" },
    {
      title: "Actions",
      key: "action",
      render: (_: any, record: DataType) => (
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

  const handleEdit = (teacher: DataType) => {
    setCurrentTeacher(teacher);
    form.setFieldsValue(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (key: number) => {
    deleteTeacher(key);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentTeacher) {
        // Update existing teacher
        updateTeacher({ ...values, key: currentTeacher.key });
      } else {
        // Add new teacher
        addTeacher({ ...values, key: Date.now() }); // Create a unique key using Date.now()
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
        Sinf qo'shish
      </Button>
      <div style={{ padding: "24px", backgroundColor: "#fff" }}>
        <Table
          columns={columns}
          dataSource={teacherData}
          pagination={{ pageSize: 4 }}
          rowKey="key"
        />

        <Modal
          title={currentTeacher ? "Edit Teacher" : "Add Teacher"}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
          cancelText="Cancel"
        >
          <Form form={form} layout="vertical" name="teacherForm">
            <Form.Item
              label="First Name"
              name="firstName"
              rules={[
                { required: true, message: "Please input the first name!" },
              ]}
            >
              <Input placeholder="First Name" />
            </Form.Item>
            <Form.Item
              label="Last Name"
              name="lastName"
              rules={[
                { required: true, message: "Please input the last name!" },
              ]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              label="Subject"
              name="subject"
              rules={[
                { required: true, message: "Please input the subject!" },
              ]}
            >
              <Input placeholder="Subject" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Please input the email!" },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Phone"
              name="phone"
              rules={[
                { required: true, message: "Please input the phone number!" },
              ]}
            >
              <Input placeholder="Phone" />
            </Form.Item>
            <Form.Item label="Class" name="sinf">
              <Input placeholder="Class" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </>
  );
};

export default Classes;
