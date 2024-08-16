import { Modal, Button, Space, Table, Input } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";

const { Column } = Table;

interface DataType {
  key: React.Key;
  OquvYili: string;
  tanlash: string;
}

const initialData: DataType[] = [
  {
    key: "1",
    OquvYili: "2019-2020",
    tanlash: "Select",
  },
  {
    key: "2",
    OquvYili: "2020-2021",
    tanlash: "Select",
  },
  {
    key: "3",
    OquvYili: "2021-2022",
    tanlash: "Select",
  },
];

const Dashboard: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string | undefined>(
    undefined
  );
  const [data, setData] = useState<DataType[]>(initialData);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingYear, setEditingYear] = useState<DataType | null>(null);

  useEffect(() => {
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tableData", JSON.stringify(data));
  }, [data]);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    if (selectedYear) {
      const newData = [
        ...data,
        {
          key: (data.length + 1).toString(),
          OquvYili: selectedYear,
          tanlash: "Select",
        },
      ];
      setData(newData);
      setSelectedYear(undefined);
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSelectChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
  };

  const showEditModal = (record: DataType) => {
    setEditingYear(record);
    setEditModalVisible(true);
  };

  const handleEditOk = () => {
    if (editingYear) {
      const newData = data.map((item) =>
        item.key === editingYear.key ? editingYear : item
      );
      setData(newData);
      setEditingYear(null);
    }
    setEditModalVisible(false);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setEditingYear(null);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingYear) {
      setEditingYear({ ...editingYear, OquvYili: e.target.value });
    }
  };

  return (
    <>
      <h1
        style={{
          margin: "10px",
          fontSize: "20px",
          fontWeight: "bold",
        }}
      >
        O'quv yillari
      </h1>

      <div>
        <Button
          style={{
            margin: "10px",
            backgroundColor: "green",
          }}
          type="primary"
          onClick={showModal}
        >
          Yangi o'quv yili qo'shish
        </Button>
      </div>

      <Modal
        title="Yangi o'quv yili qo'shish"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <select
          style={{
            padding: "10px",
            fontSize: "16px",
            height: "50px",
            width: "200px",
          }}
          value={selectedYear}
          onChange={(e) => handleSelectChange(e.target.value)}
        >
          <option value="">Select a year</option>
          <option value="2019-2020">2019-2020</option>
          <option value="2020-2021">2020-2021</option>
          <option value="2021-2022">2021-2022</option>
          <option value="2022-2023">2022-2023</option>
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </Modal>

      <Modal
        title="Edit O'quv Yili"
        open={editModalVisible}
        onOk={handleEditOk}
        onCancel={handleEditCancel}
      >
        <Input
          value={editingYear?.OquvYili}
          onChange={handleYearChange}
          style={{ padding: "10px", fontSize: "16px", height: "50px" }}
        />
      </Modal>

      <Table
        dataSource={data}
        rowKey="key"
        pagination={{ pageSize: 5 }}
      >
        <Column title="O'quv Yili" dataIndex="OquvYili" key="OquvYili" />
        <Column title="Tanlash" dataIndex="tanlash" key="tanlash" />
        <Column
          title="Amallar"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="small" style={{ fontSize: 20 }}>
              <a onClick={() => showEditModal(record)}>
                <EditOutlined />
              </a>
              <a
                onClick={() => handleDelete(record.key)}
                style={{ color: "red" }}
              >
                <DeleteOutlined />
              </a>
            </Space>
          )}
        />
      </Table>
    </>
  );
};

export default Dashboard;
