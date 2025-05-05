import Cookies from 'js-cookie';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { ConfirmEmail } from '~/services/Auth';
import { GetProfile } from '~/services/User';

function PopUpCode({ email, setShowCodePopup }) {
    const navigate = useNavigate();
    const { setUserData, setIsLoggedIn } = useStorage();
    const [verifyCode, setVerifyCode] = useState('');
    const [errorCode, setErrorCode] = useState('');
    const handleVerify = async () => {
        try {
            var res = await ConfirmEmail(email, verifyCode);
            console.log(res);
            setShowCodePopup(false);
            setIsLoggedIn(true);
            Cookies.set('authToken', res.token, {
                expires: 7,
                path: '/',
            });
            const profile = await GetProfile();
            setUserData(profile);
            toast.success('Login successfully');
            navigate(routes.home);
        } catch (error) {
            setErrorCode('Mã xác nhận không đúng. Vui lòng thử lại.');
        }
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-xl font-bold mb-4 text-center">Xác nhận Email</h2>
                <p className="mb-4 text-center text-gray-600">Nhập mã xác nhận đã được gửi vào email của bạn.</p>
                <input
                    type="text"
                    value={verifyCode}
                    onChange={(e) => setVerifyCode(e.target.value)}
                    placeholder="Nhập mã xác nhận"
                    className="w-full px-3 py-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errorCode && <p className="text-sm text-red-500 mb-2 text-center">{errorCode}</p>}
                <button
                    onClick={handleVerify}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default PopUpCode;
