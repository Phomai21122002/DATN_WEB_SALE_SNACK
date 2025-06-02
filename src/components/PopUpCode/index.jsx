import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import routes from '~/config/routes';
import { useStorage } from '~/Contexts';
import { ConfirmEmail } from '~/services/Auth';
import { GetProfile } from '~/services/User';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function PopUpCode({ email, onBack }) {
    const navigate = useNavigate();
    const { setUserData, setIsLoggedIn } = useStorage();
    const [verifyCode, setVerifyCode] = useState(['', '', '', '', '', '']);
    const [errorCode, setErrorCode] = useState('');
    const [resendTimer, setResendTimer] = useState(60);
    useEffect(() => {
        if (resendTimer === 0) return;
        const interval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleResendCode = () => {
        // TODO: gọi API gửi lại mã xác thực nếu cần
        setResendTimer(60);
        toast.info('Mã xác nhận đã được gửi lại');
    };

    const handleChange = (index, value) => {
        if (!/^[0-9]?$/.test(value)) return;
        const newCode = [...verifyCode];
        newCode[index] = value;
        setVerifyCode(newCode);
        if (value && index < 5) {
            const nextInput = document.getElementById(`code-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !verifyCode[index]) {
            const prevInput = document.getElementById(`code-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handleVerify = async () => {
        try {
            const code = verifyCode.join('');
            const res = await ConfirmEmail(email, code);
            onBack();
            setIsLoggedIn(true);
            Cookies.set('authToken', res.token, {
                expires: 7,
                path: '/',
            });
            const profile = await GetProfile();
            setUserData(profile);
            navigate(routes.home);
            toast.success('Login successfully');
        } catch (error) {
            setErrorCode('Mã xác nhận không đúng. Vui lòng thử lại.');
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
                <div className="flex items-center justify-start mb-4">
                    <button
                        onClick={() => {
                            console.log('ONbACK');
                            onBack();
                        }}
                        className="text-red-500 hover:opacity-70"
                    >
                        <ArrowBackIcon />
                    </button>
                    <h2 className="flex-1 text-2xl font-semibold text-center mr-6">Nhập mã xác nhận</h2>
                </div>
                <p className="text-gray-600 text-xl mb-2">Mã xác thực sẽ được gửi qua Email đến</p>
                <p className="font-medium text-base text-blue-600 mb-4">{email}</p>

                <div className="flex justify-center gap-2 mb-4">
                    {verifyCode.map((digit, index) => (
                        <input
                            key={index}
                            id={`code-${index}`}
                            type="text"
                            value={digit}
                            maxLength="1"
                            onChange={(e) => handleChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            className="w-10 h-12 text-center border-solid border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-lg"
                        />
                    ))}
                </div>

                {errorCode && <p className="text-sm text-red-500 mb-3">{errorCode}</p>}
                {resendTimer > 0 ? (
                    <p className="text-sm text-gray-500 mb-4">Vui lòng chờ {resendTimer} giây để gửi lại.</p>
                ) : (
                    <button onClick={handleResendCode} className="text-blue-500 text-sm mb-4 hover:underline">
                        Gửi lại mã
                    </button>
                )}
                <button
                    onClick={handleVerify}
                    className="w-full bg-red-400 text-white py-2 rounded hover:bg-red-500 transition"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
}

export default PopUpCode;
