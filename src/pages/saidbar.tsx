import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Link, Route, Routes } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import Dashboard from "./dashboard";
import Oquvchilar from "./Readers";
import Otaonalar from "./Otaonalar";
import Siniflar from "./classes";
import Oqituvchilar from "./teachers";
import Jurnal from "./journal";
const { Header, Sider, Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ height: "97vh" }}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/">O'quv yillari</Link>,
            },
            {
              key: "2",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/O'qituvchilar">O'qituvchilar</Link>,
            },
            {
              key: "3",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/Siniflar">Siniflar</Link>,
            },
            {
              key: "4",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/O'quvchilar">O'quvchilar</Link>,
            },
            {
              key: "5",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/Otaonalar">Ota onalar</Link>,
            },
            {
              key: "7",
              icon: <FaHome className="h-6 w-6" />,
              label: <Link to="/Jurnal">Jurnal</Link>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/O'qituvchilar" element={<Oqituvchilar />} />
            <Route path="/Siniflar" element={<Siniflar />} />
            <Route path="/O'quvchilar" element={<Oquvchilar />} />
            <Route path="/Otaonalar" element={<Otaonalar />} />
            <Route path="/Jurnal" element={<Jurnal />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
