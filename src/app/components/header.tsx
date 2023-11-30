'use client'
import { Menu, Avatar, Drawer, Layout } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import React, { useState } from "react";
import AuthModal from "./modals/auth";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [defaultActiveKey, setDefaultActiveKey] = useState('');


  const LeftMenu = ({ mode }: { mode: any }) => {
    return (
      <Menu mode={'horizontal'}>
        <Menu.Item key="homepage">Trang chủ</Menu.Item>
        <Menu.Item key="features">Thông tin shop</Menu.Item>
        <Menu.Item key="about">Hướng dẫn</Menu.Item>
        <Menu.Item key="contact">Liên hệ</Menu.Item>
      </Menu>
    );
  };

  const RightMenuLogouted = ({ mode }: { mode: any }) => {
    return (
      <Menu mode={mode}>
        <Button
          className="mr-4"
          onClick={() => {
            setDefaultActiveKey('register')
            setIsModalOpen(true)
          }}
        >
          Đăng ký
        </Button>
        <Button
          className="bg-black text-white"
          onClick={() => {
            setDefaultActiveKey('login')
            setIsModalOpen(true)
          }}
        >
          Đăng nhập
        </Button>
      </Menu>
    )
  }

  const RightMenuLogined = ({ mode }: { mode: any }) => {
    return (
      <Menu mode={mode}>
        <Menu.SubMenu
          title={
            <>
              <Avatar icon={<UserOutlined />} />
              <span className="username">User name</span>
            </>
          }
        >
          <Menu.Item key="project">
            <CodeOutlined /> Projects
          </Menu.Item>
          <Menu.Item key="about-us">
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item key="log-out">
            <LogoutOutlined /> Logout
          </Menu.Item>
        </Menu.SubMenu>
      </Menu>
    );
  };

  const showDrawer = () => {
    setVisible(!visible);
  };

  return (
    <>
      <nav className="navbar">
        <Layout>
          <Layout.Header className="nav-header">
            <div className="container mx-auto">
              <div className="logo">
                <a href="/"><h3 className="brand-font">Dinh Linh's Shop Acc</h3></a>
              </div>
              <div className="navbar-menu">
                <div className="leftMenu">
                  <LeftMenu mode={"horizontal"} />
                </div>
                <div className="rightMenu">
                  <RightMenuLogouted mode={"horizontal"} />
                </div>

                <Button className="menuButton" type="text" onClick={showDrawer}>
                  <MenuOutlined />
                </Button>
                <Drawer
                  title={"Brand Here"}
                  placement="right"
                  closable={true}
                  onClose={showDrawer}
                  open={visible}
                  style={{ zIndex: 99999 }}
                >
                  <LeftMenu mode={"inline"} />
                  <RightMenuLogouted mode={"inline"} />
                </Drawer>
              </div>
            </div>
          </Layout.Header>
        </Layout>
      </nav>
      {isModalOpen && <AuthModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} defaultActiveKey={defaultActiveKey}></AuthModal>}
    </>
  );
};




export default Header