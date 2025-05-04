import React from 'react';
import { useStorage } from '~/Contexts';
import { getOrderStatusStyle, getOrderStatusText } from './Constant';

const BodyTabel = ({ index, item = {}, onEdit, onDel, status = false }) => {
    const { userData } = useStorage();
    console.log(item);
    return (
        <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">{item.name}</td>
            <td className="py-3 px-6 min-w-[120px]">{item?.countProduct}</td>
            <td className="py-3 px-6">{item.total?.toLocaleString()} VND</td>
            <td className="py-3 px-6">
                <span className={`px-3 py-1 rounded-full text-xs ${getOrderStatusStyle(item.status)}`}>
                    {getOrderStatusText(item.status)}
                </span>
            </td>
            {userData && userData.role?.name === 'Admin' && !status && (
                <td className="py-3 px-6 min-w-[120px]">
                    <button className="text-blue-600 hover:underline mr-2" onClick={() => onEdit(item.id)}>
                        Xác nhận
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => onDel(item.id)}>
                        Xóa
                    </button>
                </td>
            )}
        </tr>
    );
};

export default BodyTabel;
