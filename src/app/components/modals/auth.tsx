import { Button, Modal } from 'antd';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import { Checkbox, Form, Input } from 'antd';
import { useMutation } from '@tanstack/react-query';
import authService from '@/app/services/auth.service';
import { ILogin, ILoginResponse, IRegister } from '@/app/shared/type/auth.type';
import { message } from 'antd';
import localStorageService from '@/app/services/localStorage.service';

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const AuthModal = (
    {
        isModalOpen,
        setIsModalOpen,
        defaultActiveKey,
        setUser,
    }: {
        isModalOpen: boolean,
        setIsModalOpen: (v: boolean) => void,
        defaultActiveKey: string,
        setUser: (v: string) => void,
    }
) => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const renderTabBar: TabsProps['renderTabBar'] = (props, DefaultTabBar) => (
        <StickyBox offsetTop={0} offsetBottom={20} style={{ zIndex: 1 }}>
            <DefaultTabBar {...props} style={{ background: colorBgContainer }} />
        </StickyBox>
    );


    //logic
    const onFinish = (values: any) => {
        loginMutation.mutate(values)
    };

    const onFinishRegister = (values: any) => {
        registerMutation.mutate(values)
    }

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };


    //api
    const loginMutation = useMutation({
        mutationFn: (body: ILogin) => authService.login(body),
        onSuccess(data, variables, context) {
            message.success('Đăng nhập thành công.')
            setIsModalOpen(false)
            localStorageService.setValue('DINH_LINH_SHOP_TOKEN', 'Bearer ' + data.data.accessToken)
            setUser(data.data.username)
        },
        onError(error: any) {
            message.error(error.response.data.message)
        }
    })

    const registerMutation = useMutation({
        mutationFn: (body: IRegister) => authService.register(body),
        onSuccess(data, variables, context) {
            message.success('Đăng ký thành công.')
            localStorageService.setValue('DINH_LINH_SHOP_TOKEN', 'Bearer ' + data.data.accessToken)
            setUser(data.data.username)
            setIsModalOpen(false)
        },
        onError(error: any) {
            message.error(error.response.data.message)
        }
    })

    //item
    const registerContent = () => {
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinishRegister}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên tài khoản"
                        name="username"
                        rules={[{ required: true, message: 'Nhập tên tài khoản!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Nhập lại mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Nhập lại mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className='bg-[#1677ff]' type="primary" htmlType="submit">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }

    const loginContent = () => {
        return (
            <>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label="Tên tài khoản"
                        name="username"
                        rules={[{ required: true, message: 'Nhập tên tài khoản!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Mật khẩu"
                        name="password"
                        rules={[{ required: true, message: 'Nhập mật khẩu!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button className='bg-[#1677ff]' type="primary" htmlType="submit">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </>
        )
    }

    const items = [
        {
            label: `Đăng nhập`,
            key: 'login',
            children: loginContent(),
        },
        {
            label: `Đăng ký`,
            key: 'register',
            children: registerContent(),
        }
    ]


    return (
        <>
            <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={[
                <Button key="back" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button className='bg-[#1677ff]' key="submit" type="primary" onClick={handleOk}>
                    Ok
                </Button>,

            ]}>
                <Tabs defaultActiveKey={defaultActiveKey} renderTabBar={renderTabBar} items={items}></Tabs>
            </Modal>
        </>
    )
}

export default AuthModal