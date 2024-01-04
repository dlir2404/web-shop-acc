import { ShoppingCartOutlined } from '@ant-design/icons';
import { Card, Button, Skeleton, Empty } from 'antd';
import localStorageService from "../services/localStorage.service";
import { IAccount, IAccounts } from '../shared/type/account.type';


const AccountsList = ({
    isLoading,
    setAccountToBuy,
    data,
    setIsModalPurchaseOpen,
    notLogin,
    params
}: {
    isLoading: boolean,
    data: any,
    setAccountToBuy: any,
    setIsModalPurchaseOpen: any,
    notLogin: any,
    params: any
}) => {




    const handleBuy = (account: any) => {
        const user = localStorageService.getValue('DINH_LINH_SHOP_TOKEN')
        if (!user) {
            notLogin()
        } else {
            setAccountToBuy(account)
            setIsModalPurchaseOpen(true)
        }
    }

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

    if (!(data?.count > 0)) {
        return (
            <div className="bg-white rounded-md p-10 ">
                <Empty></Empty>
            </div>
        )
    }

    return (
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
                            <div className="flex gap-1 min-h-[66px]">
                                <div>
                                    <p>Rank: <strong>{account.rank}</strong></p>
                                    <p>Trang phục: <strong>{account.costumes_num}</strong></p>
                                    <p>Giá: <strong>{account.price}{' đ'}</strong></p>
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
    )
}

export default AccountsList