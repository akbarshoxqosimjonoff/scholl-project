import React, { useState } from "react";
import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useTeacher } from "../TeacherContext";

const Classes: React.FC = () => {
  const { teacherData, updateTeacher } = useTeacher();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<any>(null);
  const [form] = Form.useForm();

  const columns = [
    { title: "Teacher", dataIndex: "firstName", key: "firstName" },
    { title: "Class", dataIndex: "sinf", key: "sinf" },
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
          {/* <Button
            danger
            style={{ backgroundColor: "red", color: "#fff" }}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button> */}
        </Space>
      ),
    },
  ];

  const handleEdit = (teacher: any) => {
    setCurrentTeacher(teacher);
    form.setFieldsValue(teacher);
    setIsModalOpen(true);
  };

  // const handleDelete = (key: number) => {
  //   Modal.confirm({
  //     title: "Are you sure you want to delete this record?",
  //     onOk: () => removeTeacher(key),
  //   });
  // };

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
        rowKey="key" // Ensure `key` is a unique identifier
      />

      <Modal
        title="Edit Class"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical" name="classForm">
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
            label="Class"
            name="sinf"
            rules={[{ required: true, message: "Please input the class!" }]}
          >
            <Input placeholder="Class" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Classes;
