'use client'
import { Menu, Avatar, Drawer, Layout, message } from "antd";
import { UserOutlined, ShoppingCartOutlined, LogoutOutlined, MenuOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import React, { useState } from "react";
import AuthModal from "./modals/auth";
import localStorageService from "../services/localStorage.service";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";

const Header = () => {
  //hook
  const [visible, setVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [user, setUser] = useState<string | null | undefined>(localStorageService.getValue('DINH_LINH_SHOP_TOKEN'))
  const [defaultActiveKey, setDefaultActiveKey] = useState('');
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  const verifyLogin = useQuery({
    queryKey: ['verify'],
    queryFn: async () => {
      const token = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
      if (!token) {
        const response = await fetch('http://localhost:8080/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        return response
      } else {
        const response = await fetch('http://localhost:8080/api/auth/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        });
        return response
      }
    }
  })

  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleLogout = () => {
    localStorageService.cleanAll()
    setUser(null)
    queryClient.invalidateQueries({ queryKey: ['verify'] })
    message.success('Đăng xuất thành công')
    router.push('/')
  }

  const LeftMenu = ({ mode }: { mode: any }) => {
    const items = [
      {
        label: 'Trang chủ',
        key: 'homepage',
        onClick: () => router.push('/')
      },
      {
        label: 'Các yêu cầu mua',
        key: 'info',
        onClick: () => router.push('/purchased')
      },
      {
        label: <p onClick={() => { router.push('/sell') }}>Bán tài khoản</p>,
        key: 'sell'
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
      <Menu className="min-w-[300px]" mode={mode} items={items}></Menu>
    )
  }

  const RightMenuLogined = ({ mode }: { mode: any }) => {
    const items = [
      {
        label: <>
          <Avatar icon={<UserOutlined />} />
          <span className="text-black ml-4">{ }</span>
        </>,
        key: 'submenu',
        children: [
          {
            label: 'Các yêu cầu mua',
            key: 'project',
            icon: <ShoppingCartOutlined />,
            onClick: () => router.push('/purchased')
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
      <Menu className="min-w-[30px] w-[200px]" mode={mode} items={items}></Menu>
    );
  };

  const renderRightMenu = () => {
    if (isClient) {
      if (!(verifyLogin.data?.status !== 200 || verifyLogin.isError)) {
        if (user) {
          return (<RightMenuLogined mode={'horizontal'}></RightMenuLogined>)
        }
      }
    }
    return (<RightMenuLogouted mode={"horizontal"} />)
  }

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
                <Link href="/"><h3 className="brand-font">Dinh Linh's Shop Acc</h3></Link>
              </div>
              <div className="navbar-menu">
                <div className="leftMenu">
                  <LeftMenu mode={"horizontal"} />
                </div>
                <div className="rightMenu">
                  {renderRightMenu()}
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