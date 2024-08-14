import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form, Select } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { studentData } from "./datas/teacherData";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

const Oquvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState<DataType[]>(() => {
    const storedData = localStorage.getItem("studentsData");
    return storedData ? JSON.parse(storedData) : studentData; // studentData o'rniga teacherData
  });
  const [searchText, setSearchText] = useState("");
  const [addTeacher, setAddTeacher] = useState<DataType>({
    key: Date.now(),
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    phone: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      const filteredData = searchText
        ? filterData(studentsData, searchText)
        : studentsData; // studentData o'rniga studentsData
      setStudentsData(filteredData);
      setLoading(false);
    }, 1000);
  }, [searchText, studentsData]); // studentsData qo'shilgan

  useEffect(() => {
    localStorage.setItem("studentsData", JSON.stringify(studentsData)); // studentData o'rniga studentsData
  }, [studentsData]);

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

  const handleDelete = (key: number) => {
    setStudentsData(studentsData.filter((data) => data.key !== key));
  };

  const columns: TableColumnsType<DataType> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Email", dataIndex: "email", key: "email" },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (_, record) => (
        <Space>
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.key)}>Delete</Button>
        </Space>
      ),
    },
  ];

  const rowSelection: TableRowSelection<DataType> = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddTeacher({ ...addTeacher, [e.target.name]: e.target.value });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setStudentsData([...studentsData, { ...addTeacher, key: Date.now() }]);
    setIsModalOpen(false);
    setAddTeacher({
      key: Date.now(),
      firstName: "",
      lastName: "",
      subject: "",
      email: "",
      phone: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (currentTeacher) {
      setStudentsData(
        studentsData.map((student) =>
          student.key === currentTeacher.key
            ? { ...currentTeacher, ...values }
            : student
        )
      );
    } else {
      setStudentsData([...studentsData, { key: Date.now(), ...values }]);
    }
    setOpen(false);
    form.resetFields();
  };

  const handleEdit = (student: DataType) => {
    setCurrentTeacher(student);
    setOpen(true);
    form.setFieldsValue({
      firstName: student.firstName,
      lastName: student.lastName,
      subject: student.subject,
      email: student.email,
      phone: student.phone,
    });
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <button
        onClick={showModal}
        style={{
          backgroundColor: "#3498db",
          color: "#fff",
          padding: "10px",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "background-color 0.3s ease",
          border: "none",
          marginBottom: "10px",
        }}
      >
        O'quvchi qo'shish
      </button>
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
            border: "none",
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
            backgroundColor: "#3498db",
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
        dataSource={studentsData}
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Modal
        title="Add Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginTop: "10px" }}>*First Name</label>
          <Input
            name="firstName"
            placeholder="First Name"
            value={addTeacher.firstName}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginTop: "10px" }}>*Last Name</label>
          <Input
            name="lastName"
            placeholder="Last Name"
            value={addTeacher.lastName}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginTop: "10px" }}>*Subject</label>
          <Input
            name="subject"
            placeholder="Subject"
            value={addTeacher.subject}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label style={{ marginTop: "10px" }}>*Email</label>
          <Input
            name="email"
            placeholder="Email"
            value={addTeacher.email}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
      </Modal>

      <Modal
        visible={open}
        title={currentTeacher?.key ? "Edit Teacher" : "Add New Teacher"}
        onCancel={() => setOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setOpen(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => form.submit()}>
            Save
          </Button>,
        ]}
      >
        <Form
          form={form}
          layout="vertical"
          name="teacherForm"
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[
              { required: true, message: "Please input the first name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input the last name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="subject"
            label="Subject"
            rules={[{ required: true, message: "Please select the subject!" }]}
          >
            <Select>
              <Select.Option value="Math">Math</Select.Option>
              <Select.Option value="English">English</Select.Option>
              <Select.Option value="Science">Science</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="phone" label="Phone">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Oquvchilar;
