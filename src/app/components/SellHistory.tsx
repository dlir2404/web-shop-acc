import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import sellService from '../services/sell.service';
import { Button, Table, Image, Modal, message, Form, Input, Upload } from 'antd';
import { ColumnsType } from 'antd/es/table'
import moment from 'moment';
import { EyeOutlined } from '@ant-design/icons'
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import imgToUrl from '../services/cloudinary.service';


const SellHistory = () => {
    const queryClient = useQueryClient()
    const [isPayInfoModalOpen, setIsPayInfoModalOpen] = useState(false)
    const [sellId, setSellId] = useState(null)
    const [isButtonLoading, setIsButtonLoading] = useState(false)

    //api
    const { data, isLoading, isError } = useQuery<any>({
        queryKey: ['adminsells'],
        queryFn: async () => {
            try {
                const data = await sellService.getSolds()
                return data
            } catch (error) {

            }
        }

    })

    const payInfoMutation = useMutation({
        mutationFn: (values: any) => sellService.sendPayInfo(values),
        onSuccess(data, variables, context) {
            message.success('Đã gửi thông tin thanh toán')
            setIsButtonLoading(false)
            setIsPayInfoModalOpen(false)
        },
        onError(error, variables, context) {
            console.log(error)
            message.error('Có lỗi xảy ra')
            setIsButtonLoading(false)
        },
    })

    const accountSellInfo = (account: any) => {
        Modal.info({
            title: 'Thông tin acc',
            content: (
                <div>
                    <p className='py-2'>Số tướng: <strong>{account.heroes_num}</strong></p>
                    <p className='py-2'>Số trang phục: <strong>{account.costumes_num}</strong></p>
                    <p className='py-2'>Full ngọc: <strong>{account.is_full_gems ? 'Có' : 'Không'}</strong></p>
                    <p className='py-2'>Rank: <strong>{account.rank}</strong></p>
                    <p className='py-2'>Giá bán:  <strong>{account.price}</strong> đ</p>
                    <p className='py-2 inline-block mr-10'>Ảnh profile: </p>
                    <span className='inline-block w-[100px]'>
                        <Image src={account.image_url}></Image>
                    </span>
                </div>
            ),
            onOk() { },
        });
    };

    const columns: ColumnsType<any> = [
        {
            title: 'ID yêu cầu',
            dataIndex: 'id',
            key: 'id',
            align: 'center',
        },
        {
            title: 'Thông tin acc',
            key: 'info',
            align: 'center',
            render: (_, record) => {
                return (
                    <div>
                        <Button onClick={() => accountSellInfo(record)} className='flex items-center w-[207px]'><EyeOutlined />Xem thông tin tài khoản</Button>
                    </div>
                )
            },
            width: '210px'
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
        },
        {
            title: 'Ngày yêu cầu',
            dataIndex: 'createdAt',
            key: 'createdAt',
            align: 'center',
            render: (_, { createdAt }) => (<p>{moment(createdAt).format('DD/MM/YYYY')}</p>)
        },
        {
            title: 'Hành động',
            key: 'action',
            align: 'center',
            render: (_, record) => {
                if (record.status === 'Đã xác nhận') {
                    return (
                        <>
                            <Button onClick={() => {
                                setIsPayInfoModalOpen(true)
                                setSellId(record.id)
                            }}>
                                Gửi thông tin đăng nhập và thanh toán
                            </Button>
                        </>
                    )
                } else if (record.status === 'Giao dịch hoàn tất') {
                    return (
                        <>
                            <Image src={record.billUrl} className='w-100'></Image>
                        </>
                    )
                } else {
                    return ''
                }
            }
        }
    ];

    //logic
    const handleFinish = async (values: any) => {
        setIsButtonLoading(true)
        let image_url = ''
        const { img, ...body } = values
        if (img.file) {
            image_url = await imgToUrl(img.file)
        }
        body.payUrl = image_url
        body.id = sellId
        payInfoMutation.mutate(body)
    }

    return (
        <>
            <div className='container mx-auto mt-4'>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Error loading data</p>}
                {!isLoading && !isError && (
                    <Table
                        dataSource={data?.data?.data.map((sell: any) => ({ ...sell, key: sell.id })) || []}
                        columns={columns}
                        bordered
                        pagination={{
                            defaultCurrent: 1,
                            pageSize: 10,
                            position: ['bottomCenter'],
                            total: data?.data?.count || 1
                        }}
                    />
                )}
                {isPayInfoModalOpen ? (
                    <Modal
                        title="Gửi thông tin"
                        open={isPayInfoModalOpen}
                        onCancel={() => setIsPayInfoModalOpen(false)}
                        footer={[
                            <Button onClick={() => setIsPayInfoModalOpen(false)}>Huỷ</Button>
                        ]}
                    >
                        <Form
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                            onFinish={handleFinish}
                            className='ml-[50px]'
                            labelAlign='left'
                        >
                            <Form.Item required={true} label="Tên đăng nhập" name='username'>
                                <Input />
                            </Form.Item>
                            <Form.Item required={true} label="Mật khẩu" name='password'>
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label='Ảnh QR ngân hàng'
                                name='img'
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please uploade image'
                                    }
                                ]}
                            >
                                <Upload
                                    name='profile'
                                    listType="picture-card"
                                    beforeUpload={(file) => {
                                        return new Promise((resolve, reject) => {
                                            if (file.size > 2) {
                                                reject('File size excceed')
                                            } else {
                                                resolve('success')
                                            }
                                        })
                                    }}
                                    maxCount={1}>
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Button loading={isButtonLoading} className='ml-[135px]' htmlType="submit">Gửi thông tin</Button>
                        </Form>
                    </Modal>
                ) : ''}
            </div>
        </>
    )
}

export default SellHistory