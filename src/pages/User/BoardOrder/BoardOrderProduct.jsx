import { useEffect, useState } from 'react';
import { GetOrderProductInOrder } from '~/services/Order'; // Giả sử API này đã được định nghĩa trong ~/services/Order
import Purchase from '~/components/Purchase';

function BoardOrderProduct({ selectedStatus, selectedOrder, expandedOrderId, userId }) {
    const [orderProducts, setOrderProducts] = useState([]);
    useEffect(() => {
        const fetchOrderProducts = async () => {
            if (selectedStatus != null && userId != null) {
                const res = await GetOrderProductInOrder({ userId, Status: selectedStatus });
                console.log(res);
                setOrderProducts(res);
            }
        };
        fetchOrderProducts();
    }, [selectedStatus, userId]);

    return (
        <div className="flex flex-col justify-center overflow-hidden">
            {orderProducts?.map((product, index) => (
                <Purchase key={index} product={product} date={product?.createOrder || ''} />
            ))}
        </div>
    );
}

export default BoardOrderProduct;
