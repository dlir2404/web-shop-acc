import { useMutation, useQuery } from "@tanstack/react-query"
import { ShoppingCartOutlined, SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Card, Skeleton, Button, Select, Pagination, Form, Modal, Upload, message } from 'antd';
const { Meta } = Card;
const { Option } = Select;
import { IAccount, IAccounts } from '../shared/type/account.type';
import http from '../utils/http'
import { useState } from "react";
import { IChoices } from "../shared/type/auth.type";
import imgToUrl from '../services/cloudinary.service';
import purchaseService from "../services/purchase.service";
import { IPurchase } from "../shared/type/purchase.type";


const AccountsList = () => {
    const [page, setPage] = useState<any>(1)
    const [criteria, setCriteria] = useState<string>('')
    const [choices, setChoices] = useState<IChoices | null>()
    const [isModalPurchaseOpen, setIsModalPurchaseOpen] = useState(false)
    const [accountToBuy, setAccountToBuy] = useState<IAccount | null>(null)
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });

        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 10000);
    };



    //api
    let { data, isLoading, isError } = useQuery({
        queryKey: ['accounts', { _page: page, criteria }],
        queryFn: async () => {
            try {
                const response = await http.get<IAccounts>(`/api/accounts?_page=${page}${criteria}`);
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
        },
        onError(error: any) {
            message.error(error.response.data.message)
        }
    })

    if (isLoading) {
        const skeletonItems = Array.from({ length: 10 }, (_, index) => (
            <Card
                key={index}
                style={{ width: 250, marginTop: 16 }}
                actions={[
                    <Skeleton.Button key={`button-${index}`} />
                ]}
            >
                <Skeleton.Image key={`image-${index}`} active className="mb-4 w-full h-80px" />
                <Skeleton key={`skeleton-${index}`} title={false} paragraph={{ rows: 2 }} />
            </Card>
        ));
        return (
            <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
                {skeletonItems}
            </div>
        )
    }

    const handleBuy = (account: any) => {
        setAccountToBuy(account)
        setIsModalPurchaseOpen(true)
    }

    const handleChangePage = (page: any, pageSize: any) => {
        setPage(page)
    }

    const onRankChange = () => {

    }

    const onFinish = (values: any) => {
        setChoices(values)

        Object.keys(values).forEach(key => {
            if (values[key] === undefined) {
                delete values[key];
            }
        });
        const queryString = Object.entries(values)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        setCriteria('&' + queryString)
    };

    const handleFinishPurchase = async ({ accountToBuy, values }: { accountToBuy: IAccount | null, values: any }) => {
        let image_url = ''
        const { img, ...body } = values
        if (img.file) {
            image_url = await imgToUrl(img.file)
        }
        body.billUrl = image_url
        body.accountPrice = accountToBuy?.price
        body.accountId = accountToBuy?.id
        purchaseMutation.mutate(body)
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
                    <Form.Item name="rank" className="mb-0">
                        <Select
                            placeholder={choices ? choices.rank : "-- Chọn mức rank --"}
                            allowClear
                        >
                            <Option value="thachdau">Thách đấu</Option>
                            <Option value="chientuong">Chiến tướng</Option>
                            <Option value="caothu">Cao thủ</Option>
                            <Option value="tinhanh">Tinh Anh</Option>
                            <Option value="kimcuong">Kim Cương</Option>
                            <Option value="bachkim">Bạch kim</Option>
                            <Option value="vang">{'< '}Bạch kim</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="heroes_num" className="mb-0">
                        <Select
                            placeholder={choices ? choices.heroes_num : "-- Tướng --"}
                            allowClear
                            className="min-w-[180px]"
                        >
                            <Option value="tren100">Trên 100 tướng</Option>
                            <Option value="50den100">Từ 50 đến 100 tướng</Option>
                            <Option value="duoi50">Dưới 50 tướng</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="costumes_num" className="mb-0">
                        <Select
                            placeholder={choices ? choices.costumes_num : "-- Trang phục --"}
                            allowClear
                            className="min-w-[210px]"
                        >
                            <Option value="tren100">Trên 100 trang phục</Option>
                            <Option value="50den100">Từ 50 đến 100 trang phục</Option>
                            <Option value="duoi50">Dưới 50 trang phục</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="price" className="mb-0">
                        <Select
                            placeholder={choices ? choices.price : "-- Chọn mức giá --"}
                            allowClear
                            className="min-w-[220px]"
                        >
                            <Option value="tren10tr">Trên 10.000.000đ</Option>
                            <Option value="5den10tr">Từ 5.000.000đ đến 9.999.999đ</Option>
                            <Option value="1den5tr">Từ 1.000.000đ đến 4.999.999đ</Option>
                            <Option value="500den1tr">Từ 500.000đ đến 999.999đ</Option>
                            <Option value="2den5tram">Từ 200.000đ đến 499.999đ</Option>
                            <Option value="duoi200">Dưới 200.000đ</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="gems" className="mb-0 min-w-[130px]">
                        <Select
                            placeholder={choices ? choices.full_gems : "-- Full ngọc --"}
                            allowClear
                        >
                            <Option value="full">Full</Option>
                            <Option value="notfull">Không full</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item className="mb-0">
                        <Button className='bg-blue-500 items-center flex' type="primary" htmlType="submit">
                            <SearchOutlined />Tìm kiếm
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
                {!isLoading && data?.data?.map((account: IAccount) => {
                    return (
                        <div key={account.id}>
                            <Card
                                hoverable
                                style={{ width: 250 }}
                                cover={<img alt="example" src={account?.image_url} />}
                                bodyStyle={{ padding: '10px' }}
                            >
                                {/* <Meta title="Europe Street beat" description="www.instagram.com" /> */}
                                <div className="flex gap-1 min-h-[66px]">
                                    <div>
                                        <p>Rank: <strong>{account.rank}</strong></p>
                                        <p>Trang phục: <strong>{account.costumes_num}</strong></p>
                                    </div>
                                    <div>
                                        <p>Tướng: <strong>{account.heroes_num}</strong></p>
                                        <p>Full ngọc: <strong>{account.is_full_gems ? (account.is_full_gems == true ? 'Đúng' : 'Không') : 'Không'}</strong></p>
                                    </div>
                                </div>
                                <Button
                                    className="flex justify-center text-center gap-2 items-center mx-auto"
                                    onClick={() => { handleBuy(account) }}
                                >
                                    <ShoppingCartOutlined />
                                    <p>Mua ngay</p>
                                </Button>
                            </Card>
                        </div>
                    )
                })}
            </div>
            <div className="text-center py-4">
                <Pagination
                    defaultCurrent={1}
                    total={50}
                    onChange={(page, pageSize) => handleChangePage(page, pageSize)}
                />
            </div>
            {isModalPurchaseOpen ? (
                <Modal
                    title="Xác nhận mua tài khoản liên quân"
                    open={isModalPurchaseOpen}
                    onCancel={() => setIsModalPurchaseOpen(false)}
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
                            <p className='py-1'>STK : <strong>19037597518015</strong></p>
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
                                loading={loadings[0]}
                                onClick={() => enterLoading(0)}
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

export default AccountsList