import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import ListNhanVien from "./pages/ListNhanVien";
import NotToFound from "./pages/NotToFound";
const { Header, Sider, Content } = Layout;
const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Router>
      <div style={{ height: "100vh", width: "100%" }} className="d-flex">
        <Sider
          style={{ width: "20% !important" }}
          trigger={null}
          collapsible
          collapsed={collapsed}
        >
          <div className="demo-logo-vertical" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                icon: <UserOutlined />,
                label: <NavLink to="/">Trang Chủ</NavLink>,
              },
              {
                key: "2",
                icon: <VideoCameraOutlined />,
                label: (
                  <NavLink to="/list-nhan-vien">Quản Lý Nhân Viên</NavLink>
                ),
              },
              {
                key: "3",
                icon: <UploadOutlined />,
                label: <NavLink to="/them-nhan-vien">Thêm Viên</NavLink>,
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
              <Route path="/" element={<ListNhanVien />} />
              <Route path="*" element={<NotToFound />} />
            </Routes>
          </Content>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
