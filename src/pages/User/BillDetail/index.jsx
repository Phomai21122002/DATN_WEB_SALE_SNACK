import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { GetBill } from '~/services/Bill';

function BillDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [bill, setBill] = useState({});
    const { userData } = useStorage();

    useEffect(() => {
        const getBillDetail = async () => {
            const res = await GetBill({ userId: userData?.id, billId: id });
            setBill(res);
        };
        getBillDetail();
    }, [userData, id]);

    const userFullName = `${bill?.user?.lastName || ''} ${bill?.user?.firstName || ''}`.trim();

    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-10">
            <div className="max-w-[700px] mx-auto py-6 px-4 mt-[64px] bg-white border border-gray-300 rounded-md font-mono text-[15px]">
                <div className="text-center mb-6 border-b border-dashed pb-2">
                    <h2 className="text-2xl font-bold">HÓA ĐƠN MUA HÀNG</h2>
                    <p className="text-sm text-gray-500">#{bill?.nameOrder || bill?.id}</p>
                </div>

                <div className="mb-4 space-y-1">
                    <div className="flex justify-between">
                        <span>Tên người đặt:</span>
                        <span className="font-semibold">{bill?.nameOrder || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Phương thức thanh toán:</span>
                        <span className="font-semibold">{bill?.paymentMethod || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Ngày tạo:</span>
                        <span className="font-semibold">
                            {bill?.createdAt ? new Date(bill.createdAt).toLocaleString() : 'Không xác định'}
                        </span>
                    </div>
                </div>

                <div className="mb-6 border-y border-dashed py-2">
                    <h3 className="font-semibold text-center mb-2">Danh sách sản phẩm</h3>
                    <table className="w-full">
                        <thead className="border-b border-gray-400">
                            <tr className="text-left">
                                <th className="py-1">Tên SP</th>
                                <th className="py-1 text-right">Giá</th>
                                <th className="py-1 text-right">SL</th>
                                <th className="py-1 text-right">Tổng</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bill?.billDetails?.length > 0 ? (
                                bill.billDetails.map((item) => (
                                    <tr key={item.id} className="border-b border-dashed last:border-none">
                                        <td className="py-1">{item.name}</td>
                                        <td className="py-1 text-right">{item.price.toLocaleString()} đ</td>
                                        <td className="py-1 text-right">{item.quantity}</td>
                                        <td className="py-1 text-right">
                                            {(item.price * item.quantity).toLocaleString()} đ
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="text-center py-2 text-gray-500 italic">
                                        Không có sản phẩm nào.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                <div className="mb-4 space-y-1">
                    <div className="flex justify-between font-semibold">
                        <span>Tổng sản phẩm:</span>
                        <span>{bill?.total || 0}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                        <span>Tổng tiền:</span>
                        <span>{bill?.totalPrice?.toLocaleString()} đ</span>
                    </div>
                </div>

                {bill?.user && (
                    <div className="border-t border-dashed pt-2 text-sm mt-4">
                        <p>
                            <span className="font-semibold">Khách hàng:</span> {userFullName}
                        </p>
                        <p>
                            <span className="font-semibold">Email:</span> {bill.user.email}
                        </p>
                        <p>
                            <span className="font-semibold">SĐT:</span> {bill.user.phone}
                        </p>
                        {bill.user.addresses?.length > 0 && (
                            <p>
                                <span className="font-semibold">Địa chỉ:</span>{' '}
                                {bill.user.addresses.find((addr) => addr.isDefault)?.name ||
                                    'Không có địa chỉ mặc định'}
                            </p>
                        )}
                    </div>
                )}

                <div className="mt-6 flex justify-center">
                    <button
                        onClick={() => navigate(routes.userListBill)}
                        className="text-blue-600 text-sm hover:underline flex items-center"
                    >
                        <ArrowBackIcon fontSize="small" className="mr-1" />
                        Quay lại danh sách hóa đơn
                    </button>
                </div>
            </div>
        </div>
    );
}

export default BillDetail;
