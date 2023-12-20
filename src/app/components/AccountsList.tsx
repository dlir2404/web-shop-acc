import { useQuery } from "@tanstack/react-query"
import { ShoppingCartOutlined, SearchOutlined } from '@ant-design/icons';
import { Card, Skeleton, Button, Select, Pagination, Form, Modal } from 'antd';
const { Meta } = Card;
const { Option } = Select;
import { IAccount, IAccounts } from '../shared/type/account.type';
import http from '../utils/http'
import { useState } from "react";
import { IChoices } from "../shared/type/auth.type";

const AccountsList = () => {
    const [page, setPage] = useState<any>(1)
    const [criteria, setCriteria] = useState<string>('')
    const [choices, setChoices] = useState<IChoices | null>()
    const [isModalPurchaseOpen, setIsModalPurchaseOpen] = useState(false)
    const [accountToBuy, setAccountToBuy] = useState(null)

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

    const handleBuy = (id: any) => {
        setAccountToBuy(id)
        setIsModalPurchaseOpen(true)
    }
    console.log(isModalPurchaseOpen)

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
                                    onClick={() => { handleBuy(account.id) }}
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
                    <div className="flex">
                        <div className="flex-1">
                            <h3>Có phải bạn muốn mua tài khoản có ID là: {accountToBuy}</h3>
                            <p>Vui lòng chuyển khoản tới số tài khoản sau:</p>
                            <p>STK : 19037597518015</p>
                            <p>Ngân hàng: Techcombank</p>
                            <p>Nội dung chuyển khoản: DLSHOP + Id tài khoản muốn mua</p>
                        </div>
                        <div className="flex-1">
                            <img className="w-full" src="/qrcode.jpg" alt="" />
                        </div>
                    </div>
                </Modal>
            ) : ''}
        </>
    )
}

export default AccountsList