import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';

import BackgroundCart from '~/components/BackgroundCart';
import ProductOrder from '~/components/ProductOrder';

function Order() {
    return (
        <div className="max-w-[1100px] mx-auto py-8 mt-[64px]">
            <BackgroundCart className="flex-col justify-end">
                <div className="text-red-500">
                    <AddLocationAltIcon style={{ fontSize: 20, marginRight: 8 }} />
                    <span className="text-[20px] font-medium">Địa Chỉ Nhận Hàng</span>
                </div>
                <div className="flex items-center text-black-400 space-x-4">
                    <div className="flex items-center font-bold">
                        <span className="text-[16px]">Username</span>
                        <span className="text-[16px]">Phone</span>
                    </div>
                    <div className="text-[16px] font-medium">Address</div>
                    <div className="text-[12px] text-red-400 font-sm ring-1 ring-red-400 p-[2px]">Mặc Định</div>
                    <div className="text-[16px] text-blue-400 font-sm cursor-pointer">Thay đổi</div>
                </div>
            </BackgroundCart>
            <BackgroundCart className={'items-center'}>
                <div className="flex-grow text-sm text-gray-900 font-medium">Sản phẩm</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Đơn giá</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số lượng</div>
                <div className="w-32 text-center text-sm text-gray-500 font-medium">Số tiền</div>
            </BackgroundCart>
            <div className="flex flex-col items-center bg-white">
                <BackgroundCart className="w-full justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <span className="text-[16px] font-medium">Loại sản phẩm</span>
                    </div>
                </BackgroundCart>
                {[{ id: 1 }, { id: 2 }].map((item, index) => (
                    <BackgroundCart key={index} className="w-full items-center">
                        <ProductOrder product={item} />
                    </BackgroundCart>
                ))}
            </div>
            <BackgroundCart className="flex flex-col w-full items-end mt-8 mb-12">
                <div className="text-[16px] font-medium w-full max-w-md">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng tiền hàng (0 sản phẩm):</span>
                        <span className="text-black-500 font-semibold">200.000đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Phí vận chuyển:</span>
                        <span className="text-black-500 font-semibold">30.000đ</span>
                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-gray-700">Tổng thành tiền:</span>
                        <span className="text-red-500 font-semibold">230.000đ</span>
                    </div>
                    <button className="w-full py-2 bg-yellow-400 text-white text-sm font-bold rounded hover:bg-yellow-500">
                        Mua hàng
                    </button>
                </div>
            </BackgroundCart>
        </div>
    );
}

export default Order;
