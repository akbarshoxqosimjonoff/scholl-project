import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useTeacher, DataType } from "../TeacherContext"; // Use the correct name for DataType

const Classes: React.FC = () => {
  const { teacherData, updateTeacher, deleteTeacher } = useTeacher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: "Teacher  firstname", dataIndex: "firstName", key: "firstName"  },
    { title: "Teacher   lastname", dataIndex: "lastName", key: "lastName" },

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
        updateTeacher({ ...values, key: currentTeacher.key });
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
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please input the subject!" }]}
          >
            <Input placeholder="Subject" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input the email!" }]}
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
  );
};

export default Classes;
