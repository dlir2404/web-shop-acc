import { useQuery } from "@tanstack/react-query"
import { EditOutlined, EllipsisOutlined, SettingOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton, Switch, Button } from 'antd';
const { Meta } = Card;
import { IAccount, IAccounts } from '../shared/type/account.type';
import http from '../utils/http'
const AccountsList = () => {

    let { data, isLoading, isError } = useQuery({
        queryKey: ['accounts'],
        queryFn: async () => {
            try {
                const response = await http.get<IAccounts>('/api/accounts');
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
        console.log(id)
    }



    return (
        <>
            <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 ">
                {!isLoading && data?.map((account: IAccount) => {
                    return (
                        <>
                            <Card
                                key={account.id}
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
                        </>
                    )
                })}
            </div>
        </>
    )
}

export default AccountsList