import React from 'react';

const BodyTabelBill = ({ index, item = {}, onShow }) => {
    return (
        <tr onClick={() => onShow(item)} key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">{item?.nameOrder}</td>
            <td className="py-3 px-6 min-w-[120px]">{item?.quantityProduct}</td>
            <td className="py-3 px-6 min-w-[120px]">{item?.total}</td>
            <td className="py-3 px-6">{item?.paymentMethod}</td>
            <td className="py-3 px-6">{item.totalPrice?.toLocaleString()} VND</td>
            <td className="py-3 px-6 min-w-[120px]">
                <span
                    className={`px-3 py-1 rounded-full text-xs ${
                        item?.isCompleted ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
                    }`}
                >
                    {item?.isCompleted ? 'Hoàn tất' : 'Chưa hoàn tất'}
                </span>
            </td>
        </tr>
    );
};

export default BodyTabelBill;
