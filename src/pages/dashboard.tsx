import { Modal, Button, Space, Table } from "antd";
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

  useEffect(() => {
    // Load data from localStorage when the component mounts
    const storedData = localStorage.getItem("tableData");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  useEffect(() => {
    // Save data to localStorage whenever data changes
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
    console.log("Clicked cancel button");
    setOpen(false);
  };

  const handleSelectChange = (value: string) => {
    setSelectedYear(value);
  };
  const handleDelete = (key: React.Key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
          }}
          type="primary"
          onClick={showModal}
        >
          Yangi o'quv yili qo'shish
        </Button>
      </div>

      <Modal
        title="Title"
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

      <Table dataSource={data} rowKey="key">
        <Column title="O'quv Yili" dataIndex="OquvYili" key="OquvYili" />
        <Column title="Tanlash" dataIndex="tanlash" key="tanlash" />
        <Column
          title="Action"
          key="action"
          render={(_: any, record: DataType) => (
            <Space size="small" style={{ fontSize: 20 }}>
              <a>
                <EditOutlined />
              </a>
              <a
                onClick={() => handleDelete(record.key)}
                style={{ color: "#f5222d" }}
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
