import { useState, useMemo } from 'react';
import { useStorage } from '~/Contexts';
import { orderTabs } from './Constant';

function BoardOrder() {
    const { userData } = useStorage();
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [selectedStatus, setSelectedStatus] = useState(0);

    const handleTabClick = (statusValue) => {
        setSelectedStatus(statusValue);
        setSelectedOrder(null);
    };

    const currentTab = useMemo(() => {
        return orderTabs.find((tab) => tab.value === selectedStatus);
    }, [selectedStatus]);

    const commonProps = {
        selectedOrder,
        selectedStatus,
        setSelectedOrder,
        userId: userData?.id,
    };
    return (
        <div className="flex justify-center mt-24 pb-8 bg-white shadow-md rounded-lg overflow-hidden">
            <div className="max-w-[1100px] mx-auto py-8 w-full">
                <ul className="flex items-center mb-6 bg-gray-100">
                    {orderTabs.map((tab) => (
                        <li
                            key={tab.value}
                            onClick={() => handleTabClick(tab.value)}
                            className={`flex-1 text-center cursor-pointer px-8 py-4 text-lg font-medium transition ${
                                selectedStatus === tab.value
                                    ? 'bg-yellow-200 text-black'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {tab.label}
                        </li>
                    ))}
                </ul>

                {currentTab?.Component ? (
                    currentTab.Component(commonProps)
                ) : (
                    <div className="text-center py-10 text-gray-500 text-lg">Không có dữ liệu đơn hàng</div>
                )}
            </div>
        </div>
    );
}

export default BoardOrder;
