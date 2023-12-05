'use client'
import { Menu, Avatar, Drawer, Layout, message } from "antd";
import { UserOutlined, CodeOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import React, { useState } from "react";
import AuthModal from "./modals/auth";
import localStorageService from "../services/localStorage.service";
import { useEffect } from "react";

const Header = () => {
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<string | null | undefined>(localStorageService.getValue('DINH_LINH_SHOP_TOKEN'))
  const [defaultActiveKey, setDefaultActiveKey] = useState('');

  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = () => {
    localStorageService.cleanAll()
    setUser(null)
    message.success('Đăng xuất thành công')
  }

  const LeftMenu = ({ mode }: { mode: any }) => {
    const items = [
      {
        label: 'Trang chủ',
        key: 'homepage'
      },
      {
        label: 'Thông tin shop',
        key: 'info'
      },
      {
        label: 'Hướng dẫn',
        key: 'about'
      },
      {
        label: 'Liên hệ',
        key: 'contact'
      },
    ]
    return (
      <Menu mode="horizontal" items={items}></Menu>
    );
  };

  const RightMenuLogouted = ({ mode }: { mode: any }) => {
    const items = [
      {
        label: <Button
          onClick={() => {
            setDefaultActiveKey('register')
            setIsModalOpen(true)
          }}
        >
          Đăng ký
        </Button>,
        key: 'register'
      },
      {
        label: <Button
          className="bg-black text-white"
          onClick={() => {
            setDefaultActiveKey('login')
            setIsModalOpen(true)
          }}
        >
          Đăng nhập
        </Button>,
        key: 'login'
      }
    ]
    return (
      <Menu mode={mode} items={items}></Menu>
    )
  }

  const RightMenuLogined = ({ mode }: { mode: any }) => {
    const items = [
      {
        label: <>
          <Avatar icon={<UserOutlined />} />
          <span className="username">User name</span>
        </>,
        key: 'submenu',
        children: [
          {
            label: 'Projects',
            key: 'project',
            icon: <CodeOutlined />
          },
          {
            label: 'Profile',
            key: 'profile',
            icon: <UserOutlined />
          },
          {
            label: 'Logout',
            key: 'logout',
            icon: <LogoutOutlined />,
            onClick: handleLogout
          },
        ]
      }
    ]
    return (
      <Menu mode={mode} items={items}></Menu>
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
                  {isClient ?
                    (user ?
                      (<RightMenuLogined mode={'horizontal'}></RightMenuLogined>)
                      : (<RightMenuLogouted mode={"horizontal"} />))
                    : (<RightMenuLogouted mode={"horizontal"} />)}
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
      {isModalOpen &&
        <AuthModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setUser={setUser}
          defaultActiveKey={defaultActiveKey}
        ></AuthModal>}
    </>
  );
};




export default Header