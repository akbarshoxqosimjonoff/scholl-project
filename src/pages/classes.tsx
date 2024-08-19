import React, { useEffect, useState } from "react";
import { Button, Form, Modal, Input, Select, Table } from "antd";

const { Option } = Select;

interface ITeacher {
  firstName: string;
  lastName: string;
  subject: string;
  email: string;
  phone: string;
}

const initialTeachers = (): ITeacher[] => {
  const storedTeachers = localStorage.getItem("teachers");
  return storedTeachers ? JSON.parse(storedTeachers) : [];
};

const Classes: React.FC = () => {
  const [teachers, setTeachers] = useState<ITeacher[]>(initialTeachers);
  const [selectedFirstName, setSelectedFirstName] = useState<
    string | undefined
  >();
  const [selectedLastName, setSelectedLastName] = useState<
    string | undefined
  >();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem("teachers", JSON.stringify(teachers));
  }, [teachers]);

  const handleSelectFirstName = (value: string) => {
    setSelectedFirstName(value);
  };

  const handleSelectLastName = (value: string) => {
    setSelectedLastName(value);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newTeacher: ITeacher = {
        firstName: selectedFirstName!,
        lastName: selectedLastName!,
        ...values,
      };
      setTeachers([...teachers, newTeacher]);
      setIsModalOpen(false);
      form.resetFields();
      setSelectedFirstName(undefined);
      setSelectedLastName(undefined);
    } catch (errorInfo) {
      console.log("Failed:", errorInfo);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const columns = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Subject", dataIndex: "subject", key: "subject" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Phone", dataIndex: "phone", key: "phone" },
  ];
  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Add Teacher
      </Button>
      <Modal
        title="Add Teacher"
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please select the first name!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select First Name"
              onChange={handleSelectFirstName}
              value={selectedFirstName}
            >
              {teachers.map((teacher, index) => (
                <Option key={index} value={teacher.firstName}>
                  {teacher.firstName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[
              { required: true, message: "Please select the last name!" },
            ]}
          >
            <Select
              showSearch
              placeholder="Select Last Name"
              onChange={handleSelectLastName}
              value={selectedLastName}
            >
              {teachers.map((teacher, index) => (
                <Option key={index} value={teacher.lastName}>
                  {teacher.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Subject"
            name="subject"
            rules={[{ required: true, message: "Please select the subject!" }]}
          >
            <Select placeholder="Select Subject">
              <Option value="Mathematics">Mathematics</Option>
              <Option value="Science">Science</Option>
              <Option value="English">English</Option>
              <Option value="History">History</Option>
              <Option value="Geography">Geography</Option>
              <Option value="Biology">Biology</Option>
              <Option value="Chemistry">Chemistry</Option>
              <Option value="Physics">Physics</Option>
              <Option value="Computer Science">Computer Science</Option>
              <Option value="Art">Art</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter the email!" }]}
          >
            <Input type="email" placeholder="Email" />
          </Form.Item>
          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              { required: true, message: "Please enter the phone number!" },
            ]}
          >
            <Input type="tel" placeholder="Phone Number" />
          </Form.Item>
        </Form>
      </Modal>
      <Table
        dataSource={teachers}
        columns={columns}
        rowKey="email"
        pagination={{ pageSize: 5 }} // This enables pagination with 5 items per page
      />
    </>
  );
};

export default Classes;
