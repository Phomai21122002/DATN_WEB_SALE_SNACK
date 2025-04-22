import React from 'react';
import { useStorage } from '~/Contexts';

const BodyTabel = ({ index, item = {}, onEdit, onDel, status = false }) => {
    const { userData } = useStorage();
    return (
        <tr key={item.id} className="border-b hover:bg-gray-50 cursor-pointer">
            <td className="py-3 px-6">{index + 1}</td>
            <td className="py-3 px-6">{item.name}</td>
            <td className="py-3 px-6 min-w-[120px]">{item.orderProduct?.length}</td>
            <td className="py-3 px-6">{item.total?.toLocaleString()} VND</td>
            <td className="py-3 px-6">
                <span
                    className={`px-3 py-1 rounded-full text-xs ${
                        item.status === 'Completed'
                            ? 'bg-green-200 text-green-800'
                            : item.status === 'Pending'
                            ? 'bg-yellow-200 text-yellow-800'
                            : 'bg-red-200 text-red-800'
                    }`}
                >
                    {item.status}
                </span>
            </td>
            {userData && userData.role === 'Admin' && !status && (
                <td className="py-3 px-6 min-w-[120px]">
                    <button
                        className="text-blue-600 hover:underline mr-2"
                        onClick={() => onEdit(item.id, item?.userId)}
                    >
                        Xác nhận
                    </button>
                    <button className="text-red-600 hover:underline" onClick={() => onDel(item.id, item?.userId)}>
                        Xóa
                    </button>
                </td>
            )}
        </tr>
    );
};

export default BodyTabel;
