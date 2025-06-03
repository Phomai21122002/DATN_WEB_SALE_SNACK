import { memo, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Cookies from 'js-cookie';
import routes from '~/config/routes';
import { SendCodeForEmail } from '~/services/Auth';
import { ResetPassword } from '~/services/User';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [tokenValue, setTokenValue] = useState('');
    const [submitError, setSubmitError] = useState('');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const GetTokenReset = async () => {
            const token = await Cookies.get('resetPasswordToken');
            if (token) setTokenValue(token);
        };
        GetTokenReset();
    }, []);

    const handleBackToLogin = () => {
        navigate(routes.login);
    };

    const handleBackToVerify = () => {
        navigate(routes.verifyEmail);
    };

    const onSubmitEmail = async ({ email }) => {
        try {
            await SendCodeForEmail(email);
            navigate(`${routes.verifyEmail}?email=${encodeURIComponent(email)}`);
        } catch (error) {
            setSubmitError('Email không đúng. Vui lòng thử lại.');
        }
    };

    const onSubmitPassword = async ({ newPassword }) => {
        try {
            await ResetPassword({
                token: tokenValue,
                newPassword,
            });
            await Cookies.remove('resetPasswordToken');
            navigate(routes.login);
        } catch (error) {
            setSubmitError('Thay đổi mật khẩu lỗi. Vui lòng thử lại.');
        }
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen bg-gray-50 font-sans">
            <div className="bg-white shadow-lg w-full max-w-lg p-12 rounded-2xl">
                <div className="relative mb-6 flex items-center">
                    <ArrowBackIcon
                        onClick={tokenValue ? handleBackToVerify : handleBackToLogin}
                        fontSize="medium"
                        className="absolute left-0 cursor-pointer text-gray-600 hover:text-gray-800"
                    />
                    <h2 className="w-full text-center text-3xl text-gray-800">
                        {tokenValue ? 'Thiết Lập Mật Khẩu' : 'Đặt Lại Mật Khẩu'}
                    </h2>
                </div>

                {tokenValue ? (
                    <form onSubmit={handleSubmit(onSubmitPassword)} className="flex flex-col gap-5 py-6">
                        <p className="text-center text-xl text-gray-800">Tạo mật khẩu mới</p>

                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Mật khẩu mới</label>
                            <input
                                type="password"
                                placeholder="Nhập mật khẩu"
                                {...register('newPassword', {
                                    required: 'Vui lòng nhập mật khẩu',
                                    minLength: {
                                        value: 6,
                                        message: 'Mật khẩu phải có ít nhất 6 ký tự',
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.newPassword && (
                                <p className="text-sm text-red-500 mt-1">{errors.newPassword.message}</p>
                            )}
                        </div>

                        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                        <button
                            type="submit"
                            className="w-full bg-red-400 uppercase text-white text-lg font-medium py-2.5 rounded-lg hover:bg-red-600 transition"
                        >
                            Tiếp theo
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleSubmit(onSubmitEmail)} className="flex flex-col gap-5">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                placeholder="Nhập email của bạn"
                                {...register('email', {
                                    required: 'Vui lòng nhập email',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Email không hợp lệ',
                                    },
                                })}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                        </div>

                        {submitError && <p className="text-sm text-red-500">{submitError}</p>}

                        <button
                            type="submit"
                            className="w-full bg-red-400 text-white text-lg font-medium py-2.5 rounded-lg hover:bg-red-600 transition"
                        >
                            Gửi mã xác nhận
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default memo(ForgotPassword);
