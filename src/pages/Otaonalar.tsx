import React, { useState, useEffect } from "react";
import { Button, Table, Space, Input, Modal, Form } from "antd";
import type { TableColumnsType, TableProps } from "antd";
import { MdOutlineRestartAlt } from "react-icons/md";

interface ParentDataType {
  key: number;
  firstName: string;
  lastName: string;
  childName: string;
  childClass: string;
  childTeacher: string;
}

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
  const [loading, setLoading] = useState(false);
  const [parentData, setParentData] = useState<ParentDataType[]>(() => {
    const storedData = localStorage.getItem("parentData");
    return storedData ? JSON.parse(storedData) : initialData;
  });
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
  const [currentParent, setCurrentParent] = useState<ParentDataType | null>(
    null
  );
  const [form] = Form.useForm();

  useEffect(() => {
    if (searchText) {
      const filteredData = filterData(parentData, searchText);
      setParentData(filteredData);
    } else {
      setParentData(initialData);
    }
  }, [searchText]);

  useEffect(() => {
    localStorage.setItem("parentData", JSON.stringify(parentData));
  }, [parentData]);

  const filterData = (data: ParentDataType[], search: string) => {
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
    setParentData(parentData.filter((data) => data.key !== key));
  };

  const columns: TableColumnsType<ParentDataType> = [
    { title: "First Name", dataIndex: "firstName", key: "firstName" },
    { title: "Last Name", dataIndex: "lastName", key: "lastName" },
    { title: "Child's Name", dataIndex: "childName", key: "childName" },
    { title: "Child's Class", dataIndex: "childClass", key: "childClass" },
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
          <Button style={{
              backgroundColor: "green",
              color: "#fff",
            }} onClick={() => handleEdit(record)}>Edit</Button>
          <Button style={{
              backgroundColor: "red",
              color: "#fff",
            }} onClick={() => handleDelete(record.key)}>Delete</Button>
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
        style={{
          backgroundColor:"green",
          marginBottom: "10px",
        }}
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
        loading={loading}
      />

      <Modal
        title="Add Parent"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item
            label="Parent First Name"
            required
            style={{ marginTop: "10px" }}
          >
            <Input
              name="firstName"
              placeholder="Parent First Name"
              value={addParent.firstName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Parent Last Name"
            required
            style={{ marginTop: "10px" }}
          >
            <Input
              name="lastName"
              placeholder="Parent Last Name"
              value={addParent.lastName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Child's Name"
            required
            style={{ marginTop: "10px" }}
          >
            <Input
              name="childName"
              placeholder="Child's Name"
              value={addParent.childName}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Child's Class"
            required
            style={{ marginTop: "10px" }}
          >
            <Input
              name="childClass"
              placeholder="Child's Class"
              value={addParent.childClass}
              onChange={handleInputChange}
            />
          </Form.Item>
          <Form.Item
            label="Child's Teacher"
            required
            style={{ marginTop: "10px" }}
          >
            <Input
              name="childTeacher"
              placeholder="Child's Teacher"
              value={addParent.childTeacher}
              onChange={handleInputChange}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        visible={open}
        title={currentParent ? "Edit Parent" : "Add New Parent"}
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
          name="parentForm"
          onFinish={onFinish}
        >
          <Form.Item
            name="firstName"
            label="Parent First Name"
            rules={[
              {
                required: true,
                message: "Please input the parent's first name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="lastName"
            label="Parent Last Name"
            rules={[
              {
                required: true,
                message: "Please input the parent's last name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="childName"
            label="Child's Name"
            rules={[
              {
                required: true,
                message: "Please input the child's name!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="childClass"
            label="Child's Class"
            rules={[
              {
                required: true,
                message: "Please input the child's class!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="childTeacher"
            label="Child's Teacher"
            rules={[
              {
                required: true,
                message: "Please input the child's teacher!",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OtaOnalar;
