import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form, Select } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";

const { Option } = Select;

interface ParentDataType {
  key: number;
  firstName: string;
  lastName: string;
  childName: string;
  childClass: string;
  childTeacher: string;
}

interface StudentDataType {
  key: number;
  firstName: string;
  lastName: string;
  classNumber: string;
  classLetter: string;
  teacherName: string;
}

const initialStudents: StudentDataType[] = [];

const initialData: ParentDataType[] = [
  {
    key: 1,
    firstName: "Ali",
    lastName: "Valiyev",
    childName: "John Valiyev",
    childClass: "5A",
    childTeacher: "Sarvar Akramov",
  },
];

const OtaOnalar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [parentData, setParentData] = useState<ParentDataType[]>(() => {
    const storedData = localStorage.getItem("parentData");
    return storedData ? JSON.parse(storedData) : initialData;
  });
  const [students, setStudents] = useState<StudentDataType[]>(initialStudents);

  const [searchText, setSearchText] = useState("");
  const [addParent, setAddParent] = useState<ParentDataType>({
    key: Date.now(),
    firstName: "",
    lastName: "",
    childName: "",
    childClass: "",
    childTeacher: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [currentParent, setCurrentParent] = useState<ParentDataType | null>(
    null
  );
  const [form] = Form.useForm();

  useEffect(() => {
    // Fetch students from local storage on component mount
    const storedStudentData = localStorage.getItem("StudentDataType");
    if (storedStudentData) {
      const parsedStudents = JSON.parse(storedStudentData);
      setStudents(parsedStudents);
      console.log("Students on mount:", parsedStudents);
    }
  }, []);

  useEffect(() => {
    const storedParentData = localStorage.getItem("parentData");
    const storedStudentData = localStorage.getItem("StudentDataType");

    if (storedParentData) {
      setParentData(JSON.parse(storedParentData));
    }

    if (storedStudentData) {
      setStudents(JSON.parse(storedStudentData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("parentData", JSON.stringify(parentData));
    localStorage.setItem("StudentDataType", JSON.stringify(students));
  }, [parentData, students]);

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
    setParentData(parentData.filter((data) => data.key !== key));
  };

  const columns: TableColumnsType<ParentDataType> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Child's Name", dataIndex: "childName", key: "childName" },
    {
      title: "Child's Class Number",
      dataIndex: "classNumber",
      key: "classNumber",
    },
    {
      title: "Child's Class Letter",
      dataIndex: "classLetter",
      key: "classLetter",
    },
    {
      title: "Child's TeacherName",
      dataIndex: "childTeacher",
      key: "childTeacher",
    },

    {
      title: "Child's Teacher",
      dataIndex: "childTeacher",
      key: "childTeacher",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Button
            style={{ backgroundColor: "green", color: "#fff" }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "#fff" }}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const rowSelection: TableProps<ParentDataType>["rowSelection"] = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddParent({ ...addParent, [e.target.name]: e.target.value });
  };

  const handleStudentChange = (value: string) => {
    const student = students.find((student) => student.key === Number(value));
    if (student) {
      setBtnDisabled(true);

      setAddParent({
        ...addParent,
        childName: `${student.firstName} ${student.lastName}`,
        childClass: `${student.classNumber} ${student.classLetter}`,
        childTeacher: student.teacherName,
      });
      form.setFieldsValue({
        childName: `${student.firstName} ${student.lastName}`,
        childClass: `${student.classNumber} ${student.classLetter}`,
        childTeacher: student.teacherName,
      });
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setParentData([...parentData, { ...addParent, key: Date.now() }]);
    setIsModalOpen(false);
    setAddParent({
      key: Date.now(),
      firstName: "",
      lastName: "",
      childName: "",
      childClass: "",
      childTeacher: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (currentParent) {
      setParentData(
        parentData.map((parent) =>
          parent.key === currentParent.key
            ? { ...currentParent, ...values }
            : parent
        )
      );
    } else {
      setParentData([...parentData, { key: Date.now(), ...values }]);
    }
    setOpen(false);
    form.resetFields();
  };

  const handleEdit = (parent: ParentDataType) => {
    setCurrentParent(parent);
    setOpen(true);
    form.setFieldsValue({
      firstName: parent.firstName,
      lastName: parent.lastName,
      childName: parent.childName,
      childClass: parent.childClass,
      childTeacher: parent.childTeacher,
    });
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Button
        type="primary"
        onClick={showModal}
        style={{ backgroundColor: "green", marginBottom: "10px" }}
      >
        Add Parent
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
        }}
      >
        <Input
          type="text"
          placeholder="Search"
          value={searchText}
          onChange={onSearchChange}
          style={{
            padding: "10px",
            borderRadius: "5px",
            fontSize: "16px",
            width: "calc(100% - 60px)",
          }}
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
          }}
        >
          <MdOutlineRestartAlt />
        </Button>
      </div>

      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={parentData}
        pagination={{ pageSize: 5 }}
        rowKey="key"
      />

      <Modal
        title={currentParent ? "Edit Parent" : "Add Parent"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish}>
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please enter first name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please enter last name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="childName" label="Child's Name">
            <Select
              onChange={handleStudentChange}
              placeholder="Select a student"
            >
              {students.map((student) => (
                <Option key={student.key} value={student.key.toString()}>
                  {student.firstName} {student.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="childClass" label="Child's Class">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item name="childTeacher" label="Child's Teacher">
            <Input disabled={true} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentParent ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Add Parent"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="First Name"
          name="firstName"
          value={addParent.firstName}
          onChange={handleInputChange}
        />
        <Input
          placeholder="Last Name"
          name="lastName"
          value={addParent.lastName}
          onChange={handleInputChange}
          style={{ marginTop: "10px" }}
        />
        <Select onChange={handleStudentChange} placeholder="Select a student">
          {students.map((student) => (
            <Option key={student.key} value={student.key.toString()}>
              {student.firstName} {student.lastName}
            </Option>
          ))}
        </Select>
        <Input
          placeholder="Child's Class"
          name="childClass"
          value={addParent.childClass}
          onChange={handleInputChange}
          style={{ marginTop: "10px" }}
        />
        <Input
          placeholder="Child's Teacher"
          name="childTeacher"
          value={addParent.childTeacher}
          onChange={handleInputChange}
          style={{ marginTop: "10px" }}
        />
      </Modal>
    </div>
  );
};

export default OtaOnalar;
