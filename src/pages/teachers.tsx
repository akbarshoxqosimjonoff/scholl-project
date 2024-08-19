import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form, Popconfirm } from "antd";
import type { TableColumnsType } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { useTeacher } from "../TeacherContext";

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
  sinf?: string;
}

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  const { teacherData, setTeacherData, addTeacher, updateTeacher, deleteTeacher } = useTeacher();

  useEffect(() => {
    const storedTeachers = localStorage.getItem("teachers");
    if (storedTeachers) {
      setTeacherData(JSON.parse(storedTeachers));
    }
  }, [setTeacherData]);

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teacherData));
  }, [teacherData]);

  const filterData = (data: DataType[], search: string) => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleClearSearch = () => {
    setSearchText("");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const columns: TableColumnsType<DataType> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
    { title: "Class", dataIndex: "sinf", key: "sinf" },
    {
      title: "Actions",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            style={{ backgroundColor: "green", color: "#fff" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Haqiqatdan ham ochirmoqchimisz?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ backgroundColor: "red", color: "#fff" }}>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (currentTeacher) {
        updateTeacher({ ...values, key: currentTeacher.key });
      } else {
        addTeacher({ key: Date.now(), ...values });
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

  const handleEdit = (teacher: DataType) => {
    setCurrentTeacher(teacher);
    form.setFieldsValue(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (key: number) => {
    deleteTeacher(key);
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
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
        O'qituvchi qo'shish
      </Button>
      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "10px",
          borderRadius: "5px",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Input
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #d9d9d9",
            outline: "none",
            fontSize: "16px",
            width: "100%",
          }}
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={onSearchChange}
        />
        <Button
          onClick={handleClearSearch}
          style={{
            backgroundColor: "green",
            color: "#fff",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "bold",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
            border: "none",
          }}
        >
          <MdOutlineRestartAlt />
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={filterData(teacherData, searchText)}
        pagination={{ pageSize: 4 }}
        loading={loading}
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

export default Oqituvchilar;
