import { memo, useState } from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PopUpCode from '~/components/PopUpCode';
import { useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

const ForgotPassword = memo(() => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleOkClick = () => {
        console.log('Email:', email);
        // Xử lý logic gửi email ở đây
        navigate(`${routes.verifyEmail}?email=${encodeURIComponent(email)}`);
    };

    const handleBack = () => {
        navigate(routes.login);
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50 font-sans">
            <div className="bg-white shadow-lg w-full max-w-lg p-12 rounded-2xl">
                <div className="relative mb-6 flex items-center">
                    <ArrowBackIcon
                        onClick={handleBack}
                        fontSize="medium"
                        className="absolute left-0 cursor-pointer text-gray-600 hover:text-gray-800"
                    />
                    <h2 className="w-full text-center text-3xl font-semibold text-gray-800">Đặt lại mật khẩu</h2>
                </div>

                <div className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Nhập email của bạn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    <button
                        onClick={handleOkClick}
                        className="w-full bg-red-400 text-white text-lg font-medium py-2.5 rounded-lg hover:bg-red-600 transition"
                    >
                        Gửi mã xác nhận
                    </button>
                </div>
            </div>

            {/* {showCodePopup && <PopUpCode email={email} setShowCodePopup={setShowCodePopup} />} */}
        </div>
    );
});

export default ForgotPassword;
