import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { SearchOutlined, PlusOutlined, CopyOutlined } from '@ant-design/icons';
import { Card, Skeleton, Button, Select, Pagination, Form, Modal, Upload, message } from 'antd';
const { Option } = Select;
import { IAccount, IAccounts } from '../shared/type/account.type';
import Http from '../utils/http'
import { useState } from "react";
import { IChoices } from "../shared/type/auth.type";
import imgToUrl from '../services/cloudinary.service';
import purchaseService from "../services/purchase.service";
import { IPurchase } from "../shared/type/purchase.type";
import localStorageService from "../services/localStorage.service";
import AccountsList from "./AccountList";


const AccountsListLayout = () => {
    const [isModalPurchaseOpen, setIsModalPurchaseOpen] = useState(false)
    const [accountToBuy, setAccountToBuy] = useState<IAccount | null>(null)
    const [loadings, setLoadings] = useState<boolean>(false);
    const http = new Http('no-token').instance
    const queryClient = useQueryClient()
    const [params, setParams] = useState<any>({ _page: 1 })

    const notLogin = () => {
        Modal.info({
            title: 'Bạn chưa đăng nhập.',
            content: (
                <div>
                    <p>Vui lòng đăng nhập để tiếp tục.</p>
                </div>
            ),
            okType: 'default',
            onOk() { },
        });
    };


    //api
    let { data, isLoading, isError } = useQuery({
        queryKey: [
            'accounts',
            {
                params: params
            }],
        queryFn: async () => {
            try {
                const response = await http.get<IAccounts>(`/api/accounts`, { params });
                return response.data; // Assuming the data is in response.data
            } catch (error) {
                throw new Error('Failed to fetch accounts'); // Handle errors appropriately
            }
        },
    })

    const purchaseMutation = useMutation({
        mutationFn: (body: IPurchase) => purchaseService.purchase(body),
        onSuccess(data, variables, context) {
            message.success('Đã gửi yêu cầu mua tài khoản.')
            setIsModalPurchaseOpen(false)
            setLoadings(false)
            queryClient.invalidateQueries({ queryKey: ['accounts'] })
        },
        onError(error: any) {
            message.error(error.response.data.message)
        }
    })

    const handleChangePage = (page: any, pageSize: any) => {
        const newParams = {
            _page: page,
            ...params
        }
        newParams._page = page
        setParams(newParams)
    }

    const onFinish = (values: any) => {
        const newParams = values
        newParams._page = params._page
        setParams(values)
    };

    const handleFinishPurchase = async ({ accountToBuy, values }: { accountToBuy: IAccount | null, values: any }) => {
        try {
            let image_url = ''
            const { img, ...body } = values
            setLoadings(true)
            if (img.file) {
                image_url = await imgToUrl(img.file)
            }
            body.billUrl = image_url
            body.accountPrice = accountToBuy?.price
            body.accountId = accountToBuy?.id
            purchaseMutation.mutate(body)
        } catch (error) {
            message.error('Gửi yêu cầu mua không thành công')
        }
    }

    return (
        <>
            <div className="">
                <Form
                    // form={form}
                    name="control-hooks"
                    onFinish={onFinish}
                    className="flex gap-4 justify-center bg-white mb-4 rounded-md items-center p-4 flex-wrap"
                >
                    <Form.Item name="rank" className="mb-0" initialValue={params?.rank}>
                        <Select
                            placeholder="-- Chọn mức rank --"
                            allowClear
                        >
                            <Option value="Thách đấu">Thách đấu</Option>
                            <Option value="Chiến tướng">Chiến tướng</Option>
                            <Option value="Cao thủ">Cao thủ</Option>
                            <Option value="Tinh Anh">Tinh Anh</Option>
                            <Option value="Kim Cương">Kim Cương</Option>
                            <Option value="Bạch kim">Bạch kim</Option>
                            <Option value="Vàng">{'< '}Bạch kim</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="heroes_num" className="mb-0" initialValue={params?.heroes_num}>
                        <Select
                            placeholder="-- Tướng --"
                            allowClear
                            className="min-w-[180px]"
                        >
                            <Option value="tren100">Trên 100 tướng</Option>
                            <Option value="50den100">Từ 50 đến 100 tướng</Option>
                            <Option value="duoi50">Dưới 50 tướng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="costumes_num" className="mb-0" initialValue={params?.costumes_num}>
                        <Select
                            placeholder="-- Trang phục --"
                            allowClear
                            className="min-w-[210px]"
                        >
                            <Option value="tren100">Trên 100 trang phục</Option>
                            <Option value="50den100">Từ 50 đến 100 trang phục</Option>
                            <Option value="duoi50">Dưới 50 trang phục</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="price" className="mb-0" initialValue={params?.price}>
                        <Select
                            placeholder="-- Chọn mức giá --"
                            allowClear
                            className="min-w-[220px]"
                        >
                            <Option value="tren10tr">Trên 10.000.000đ</Option>
                            <Option value="5den10tr">Từ 5.000.000đ đến 10.000.000đ</Option>
                            <Option value="1den5tr">Từ 1.000.000đ đến 5.000.000đ</Option>
                            <Option value="500den1tr">Từ 500.000đ đến 1.000.000đ</Option>
                            <Option value="2den5tram">Từ 200.000đ đến 500.000đ</Option>
                            <Option value="duoi200">Dưới 200.000đ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="is_full_gems" className="mb-0 min-w-[130px]" initialValue={params?.is_full_gems}>
                        <Select
                            placeholder="-- Full ngọc --"
                            allowClear
                        >
                            <Option value="1">Full</Option>
                            <Option value="0">Không full</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="mb-0">
                        <Button className='bg-blue-500 items-center flex' type="primary" htmlType="submit">
                            <SearchOutlined />Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <AccountsList isLoading={isLoading} data={data} setAccountToBuy={setAccountToBuy} setIsModalPurchaseOpen={setIsModalPurchaseOpen} notLogin={notLogin} params={params}></AccountsList>
            <div className="text-center py-4">
                <Pagination
                    defaultCurrent={1}
                    total={data?.count}
                    onChange={(page, pageSize) => handleChangePage(page, pageSize)}
                />
            </div>
            {isModalPurchaseOpen ? (
                <Modal
                    title="Xác nhận mua tài khoản liên quân"
                    open={isModalPurchaseOpen}
                    onCancel={() => setIsModalPurchaseOpen(false)}
                    style={{ top: 15 }}
                    footer={[
                        <Button key="back" onClick={() => setIsModalPurchaseOpen(false)}>
                            Huỷ
                        </Button>
                    ]}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex-1">
                            <h3>ID tài khoản này là: {accountToBuy?.id}</h3>
                            <p className='py-1'>Vui lòng chuyển khoản tới số tài khoản sau:</p>
                            <p className='py-1'>STK :
                                <strong>19037597518015 </strong>
                                <CopyOutlined onClick={() => {
                                    navigator.clipboard.writeText('19037597518015')
                                    message.success('Đã sao chép')
                                }} />
                            </p>
                            <p className='py-1'>Ngân hàng: <strong>Techcombank</strong></p>
                            <p className='py-1'>Số tiền cần chuyển: <strong>{accountToBuy?.price} đ</strong></p>
                            <p className='py-1'>Nội dung chuyển khoản: </p>
                            <p className="py-2">DLSHOP + Id tài khoản muốn mua</p>
                            <p className='text-red-700'>Chú ý: <span className="text-black">Tài khoản của bạn sẽ bị khoá nếu quá 3 lần giao dịch thất bại.</span></p>
                        </div>
                        <div className="flex-1">
                            <img className="w-full" src="/qrcode.jpg" alt="" />
                        </div>
                    </div>
                    <div className="mt-10">
                        <Form
                            labelWrap={true}
                            labelCol={{ span: 10 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{ maxWidth: 600 }}
                            onFinish={(values: any) => handleFinishPurchase({ accountToBuy, values })}
                        >
                            <Form.Item
                                label='Ảnh chụp bill thành công:'
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
                                    maxCount={1}
                                >
                                    <div>
                                        <PlusOutlined />
                                        <div style={{ marginTop: 8 }}>Upload</div>
                                    </div>
                                </Upload>
                            </Form.Item>
                            <Button
                                className="ml-[142px]"
                                loading={loadings}
                                htmlType="submit"
                            >
                                Xác nhận đã chuyển khoản
                            </Button>
                        </Form>
                    </div>
                </Modal>
            ) : ''}
        </>
    )
}

export default AccountsListLayout