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
  classNumber?: number;
  classLetter?: string;
  childName?: string;
}

const Oquvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentsData, setStudentsData] = useState<DataType[]>(() => {
    const storedData = localStorage.getItem("StudentDataType");
    return storedData ? JSON.parse(storedData) : studentData;
  });
  const [parentsData, setParentsData] = useState<DataType[]>(() => {
    const storedData = localStorage.getItem("ParentDataType");
    return storedData ? JSON.parse(storedData) : [];
  });
  const [searchText, setSearchText] = useState("");
  const [addTeacher, setAddTeacher] = useState<DataType>({
    key: Date.now(),
    firstName: "",
    lastName: "",
    subject: "",
    email: "",
    phone: "",
    classNumber: undefined,
    classLetter: undefined,
    childName: "",
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
        : studentsData;
      setStudentsData(filteredData);
      setLoading(false);
    }, 10);
  }, [searchText, studentsData]);

  useEffect(() => {
    localStorage.setItem("StudentDataType", JSON.stringify(studentsData));
    localStorage.setItem("ParentDataType", JSON.stringify(parentsData));
  }, [studentsData, parentsData]);

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
    {
      title: "Class",
      key: "class",
      render: (_, record) =>
        `${record.classNumber || "N/A"}${record.classLetter || ""}`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space>
          <Button
            style={{
              backgroundColor: "green",
              color: "#fff",
            }}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            style={{
              backgroundColor: "red",
              color: "#fff",
            }}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
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
    const newStudent: DataType = {
      ...addTeacher,
      key: Date.now(),
    };

    setStudentsData([...studentsData, newStudent]);
    setParentsData(
      parentsData.map((parent) => ({
        ...parent,
        childName:
          parent.childName === ""
            ? `${addTeacher.firstName} ${addTeacher.lastName}`
            : parent.childName,
      }))
    );

    setIsModalOpen(false);
    setAddTeacher({
      key: Date.now(),
      firstName: "",
      lastName: "",
      subject: "",
      email: "",
      phone: "",
      classNumber: undefined,
      classLetter: undefined,
      childName: "",
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
      classNumber: student.classNumber,
      classLetter: student.classLetter,
    });
  };

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <button
        onClick={showModal}
        style={{
          backgroundColor: "green",
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
          <label style={{ marginTop: "10px" }}>*Class Number</label>
          <Select
            value={addTeacher.classNumber ?? undefined}
            style={{ marginTop: "5px", width: "100%" }}
            onChange={(value) =>
              setAddTeacher({ ...addTeacher, classNumber: value })
            }
          >
            {Array.from({ length: 11 }, (_, number) => (
              <Select.Option key={number + 1} value={number + 1}>
                {number + 1}
              </Select.Option>
            ))}
          </Select>
        </div>

        <div style={{ marginTop: "10px" }}>
          <label style={{ marginTop: "10px" }}>*Class Letter</label>
          <Select
            value={addTeacher.classLetter ?? undefined}
            style={{ marginTop: "5px", width: "100%" }}
            onChange={(value) =>
              setAddTeacher({ ...addTeacher, classLetter: value })
            }
          >
            {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
              <Select.Option key={letter} value={letter}>
                {letter}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Modal>

      <Modal
        title={currentTeacher ? "Edit Student" : "Add Student"}
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="firstName"
            label="First Name"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Last Name"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="classNumber"
            label="Class Number"
            rules={[{ required: true, message: "Please select class number!" }]}
          >
            <Select style={{ width: "100%" }}>
              {Array.from({ length: 11 }, (_, number) => (
                <Select.Option key={number + 1} value={number + 1}>
                  {number + 1}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="classLetter"
            label="Class Letter"
            rules={[{ required: true, message: "Please select class letter!" }]}
          >
            <Select style={{ width: "100%" }}>
              {["A", "B", "C", "D", "E", "F", "G"].map((letter) => (
                <Select.Option key={letter} value={letter}>
                  {letter}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentTeacher ? "Update" : "Add"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Oquvchilar;
