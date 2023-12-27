'use client'
import { useQuery } from "@tanstack/react-query"
import purchaseService from "../services/purchase.service"
import { Table, Button, Image, Modal, message } from "antd"
import { ColumnsType } from 'antd/es/table'
import moment from 'moment';
import { EyeOutlined } from "@ant-design/icons";
import localStorageService from "../services/localStorage.service"
import { useRouter } from "next/navigation"


const Purchased = () => {


    const verifyLogin = useQuery({
        queryKey: ['verifyAtPurchase'],
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

    const { data, isLoading, isError } = useQuery<any>({
        queryKey: ['myrequest'],
        queryFn: () => purchaseService.getPurchased()
    })

    const router = useRouter()

    if (verifyLogin.isLoading) return (<p>Loading...</p>)
    if (((verifyLogin.data?.status !== 200) && (verifyLogin.data?.status !== 204)) || verifyLogin.isError) {
        message.error('Unauthorized')
        return router.push('/')
    } else {
        const loginInfo = (values: { username: string, password: string }) => {
            Modal.info({
                title: 'Đây là thông tin đăng nhập của tài khoản bạn đã mua',
                content: (
                    <div>
                        <p>Tên đăng nhập: <strong>{values.username}</strong></p>
                        <p>Mật khẩu: <strong>{values.password}</strong></p>
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
                title: 'ID tài khoản mua',
                dataIndex: 'accountId',
                key: 'accountId',
                align: 'center',
                render: (_, record) => {
                    return (
                        <>
                            ID: {record.id}<EyeOutlined className="ml-4" />
                        </>
                    )
                }
            },
            {
                title: 'Giá mua',
                dataIndex: 'accountPrice',
                key: 'accountPrice',
                align: 'center',
            },
            {
                title: 'Trạng thái',
                dataIndex: 'status',
                key: 'status',
                align: 'center',
            },
            {
                title: 'Bill chuyển khoản',
                dataIndex: 'billUrl',
                key: 'billUrl',
                align: 'center',
                render: (_, { billUrl }) => (
                    <Image
                        width={200}
                        src={billUrl}
                    />
                )
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
                    if (record.status === "Đã xác nhận") {
                        return (
                            <>
                                <Button onClick={() => loginInfo(record.account)} className='mr-4'>Xem thông tin đăng nhập</Button>
                            </>
                        )
                    } else return ('')
                },
            }
        ];

        return (
            <>
                <div className="text-center">
                    <h3 className="mx-auto text-2xl font-semibold">Danh sách các yêu cầu mua</h3>
                </div>
                <div className='container mx-auto mt-4'>
                    {isLoading && <p>Loading...</p>}
                    {isError && <p>Error loading data</p>}
                    {!isLoading && !isError && (
                        <Table
                            dataSource={data?.data?.data?.map((account: any) => ({ ...account, key: account.id })) || []}
                            columns={columns}
                            bordered
                            pagination={{
                                defaultCurrent: 1,
                                pageSize: 10,
                                position: ['bottomCenter'],
                                total: data?.data?.count || 1,
                            }}
                        />
                    )}
                </div>
            </>
        )
    }
}

export default Purchased