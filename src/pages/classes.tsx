import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form, Select } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";
import { dataSource } from "./datas/teacherData";

type TableRowSelection<T> = TableProps<T>["rowSelection"];

interface DataType {
  key: number;
  sinf: string;
  teacherName: string;
}

const Oqituvchilar: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [loading, setLoading] = useState(false);
  const [teacherData, setTeacherData] = useState<DataType[]>(() => {
    const storedData = localStorage.getItem("sinfData");
    return storedData ? JSON.parse(storedData) : dataSource;
  });
  const [searchText, setSearchText] = useState("");
  const [addTeacher, setAddTeacher] = useState<DataType>({
    key: Date.now(),
    teacherName: "",
    sinf: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState<DataType | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    localStorage.setItem("sinfData", JSON.stringify(teacherData));
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

  const handleDelete = (key: number) => {
    setTeacherData(teacherData.filter((data) => data.key !== key));
  };

  const columns: TableColumnsType<DataType> = [
    { title: "Teacher", dataIndex: "teacherName", key: "teacherName" },
    { title: "Sinf", dataIndex: "sinf", key: "sinf" },
    {
      title: "Actions",
      key: "action",
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
    setTeacherData([...teacherData, { ...addTeacher, key: Date.now() }]);
    setIsModalOpen(false);
    setAddTeacher({
      key: Date.now(),
      teacherName: "",
      sinf: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = (values: any) => {
    if (currentTeacher) {
      setTeacherData(
        teacherData.map((teacher) =>
          teacher.key === currentTeacher.key
            ? { ...currentTeacher, ...values }
            : teacher
        )
      );
    } else {
      setTeacherData([...teacherData, { key: Date.now(), ...values }]);
    }
    setOpen(false);
    form.resetFields();
  };

  const handleEdit = (teacher: DataType) => {
    setCurrentTeacher(teacher);
    setOpen(true);
    form.setFieldsValue({
      firstName: teacher.teacherName,
      sinf: teacher.sinf,
    });
  };
  const hasSelected = selectedRowKeys.length > 0;
  return (
    <div style={{ padding: "24px", backgroundColor: "#fff" }}>
      <Button
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
        Sinf qo'shish
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
        dataSource={filterData(teacherData, searchText)}
        pagination={{ pageSize: 5 }}
        loading={loading}
      />

      <Modal
        title="Sinf qo'shish"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div style={{ marginTop: "10px" }}>
          <label>*Teacher Name</label>
          <Input
            name="teacherName"
            placeholder="Teacher Name"
            value={addTeacher.teacherName}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>*Sinf</label>
          <Input
            name="sinf"
            placeholder="Sinf"
            value={addTeacher.sinf}
            style={{ marginTop: "5px", padding: "10px" }}
            onChange={handleInputChange}
          />
        </div>
      </Modal>

      <Modal
        title={currentTeacher ? "Edit Teacher" : "Add New Teacher"}
        open={open}
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
            name="teacherName"
            label="Teacher"
            rules={[
              { required: true, message: "Please input the teacher's name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="sinf"
            label="Sinf name"
            rules={[{ required: true, message: "Please input the sinf name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Oqituvchilar;
