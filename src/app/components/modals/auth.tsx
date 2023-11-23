import { Button, Modal } from 'antd';
import type { TabsProps } from 'antd';
import { Tabs, theme } from 'antd';
import StickyBox from 'react-sticky-box';
import { Checkbox, Form, Input } from 'antd';

const onFinish = (values: any) => {
    console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
};

type FieldType = {
    username?: string;
    password?: string;
    remember?: string;
};

const registerContent = () => {
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

                <Form.Item<FieldType>
                    name="remember"
                    valuePropName="checked"
                    wrapperCol={{ offset: 8, span: 16 }}
                >
                    <Checkbox>Remember me</Checkbox>
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


const AuthModal = (
    {
        isModalOpen,
        setIsModalOpen,
        defaultActiveKey,
    }: {
        isModalOpen: boolean,
        setIsModalOpen: (v: boolean) => void,
        defaultActiveKey: string,
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

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

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
                <Tabs defaultActiveKey={defaultActiveKey} renderTabBar={renderTabBar} items={items}></Tabs>;
            </Modal>
        </>
    )
}

export default AuthModal