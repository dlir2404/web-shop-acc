'use client'
import SellForm from "../components/SellForm"
import SellHistory from "../components/SellHistory"
import { Tabs } from 'antd';
import type { TabsProps } from 'antd';

const Sell = () => {

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Đăng ký bán acc',
            children: <SellForm></SellForm>,
        },
        {
            key: '2',
            label: 'Lịch sử yêu cầu bán',
            children: <SellHistory></SellHistory>,
        },
    ];

    return (
        <>
            <div >
                <Tabs className="" defaultActiveKey="1" items={items} />
            </div>
        </>
    )
}

export default Sell