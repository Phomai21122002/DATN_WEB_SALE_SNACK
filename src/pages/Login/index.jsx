import { memo, useEffect, useState } from 'react';
import { Button, Divider, TextField, IconButton, InputAdornment } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import routes from '../../config/routes';
import { loginLogoList } from './constants/logo';
import { ConfirmEmail, SignIn } from '~/services/Auth';
import Loading from '~/components/Loading';
import { useStorage } from '~/Contexts';
import PopUpCode from '~/components/PopUpCode';
import { GetProfile } from '~/services/User';

const Login = memo(() => {
    const navigate = useNavigate();
    const { setIsLoggedIn, refetchProfile, setUserData } = useStorage();
    const [errorPass, setErrorPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showCodePopup, setShowCodePopup] = useState(false);
    const [loginEmail, setLoginEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { handleSubmit, control } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    useEffect(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        Cookies.remove('authToken');
    }, [setIsLoggedIn]);

    useEffect(() => {
        const handleMessage = async (event) => {
            const { token, refreshToken } = event.data || {};
            if (!token || !refreshToken) return;
            Cookies.set('authToken', token, { expires: 7 });
            Cookies.set('refreshToken', refreshToken, { expires: 7 });
            setIsLoggedIn(true);
            await refetchProfile();
            toast.success('Login successfully!');
            navigate(routes.home);
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
        // eslint-disable-next-line
    }, [navigate, setIsLoggedIn]);

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const onLogin = async (values) => {
        const { email, password } = values;
        setIsLoading(true);
        SignIn(email, password)
            .then(async (res) => {
                if (!res.isConfirmEmail) {
                    setLoginEmail(email);
                    setShowCodePopup(true);
                } else {
                    Cookies.set('authToken', res.token, {
                        expires: 7,
                        path: '/',
                    });
                    setIsLoggedIn(true);
                    toast.success('Login successfully');
                    navigate(routes.home);
                }
            })
            .catch(() => {
                setErrorPass('Thông tin người dùng nhập không chính xác. Vui lòng nhập lại!');
                toast.error('Login not successfully');
                setIsLoading(false);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleVerify = async (verifyCode) => {
        const code = verifyCode.join('');
        const res = await ConfirmEmail(loginEmail, code);
        setIsLoggedIn(true);
        Cookies.set('authToken', res.token, {
            expires: 7,
            path: '/',
        });
        const profile = await GetProfile();
        setUserData(profile);
        navigate(routes.home);
        toast.success('Login successfully');
    };

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
                    <div>
                        <div className="mb-4">
                            <div className="flex justify-center">
                                <div>PHÔ MAI SHOP</div>
                            </div>
                            <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">
                                Login to continue
                            </h5>
                        </div>

                        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        type="text"
                                        onChange={field.onChange}
                                        value={field.email}
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                padding: 1,
                                            },
                                        }}
                                        placeholder="Input your email"
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Input your password"
                                        sx={{
                                            '& .MuiOutlinedInput-root': {
                                                backgroundColor: '#e8f0fe',
                                            },
                                            '& .MuiInputBase-input': {
                                                padding: 1,
                                            },
                                        }}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton onClick={handleClickShowPassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                )}
                            />

                            <Button type="submit" variant="contained">
                                Continue
                            </Button>
                        </form>
                        {errorPass && <p className="mt-2 text-red-500 text-sm">{errorPass}</p>}

                        <div className="mt-6 text-[14px] font-bold text-slate-400">Others:</div>
                        {loginLogoList.map((item, index) => (
                            <div
                                onClick={item.handle || undefined}
                                key={index}
                                className="h-10 w-full flex justify-center items-center gap-2 border-[1px] border-[#8590A2] border-solid cursor-pointer hover:bg-slate-50 mb-4 rounded-sm"
                            >
                                {item.logo}
                                <span className="text-[14px] font-bold">{item.name}</span>
                            </div>
                        ))}
                        <div className="my-4">
                            <Divider />
                        </div>

                        <div className="flex">
                            <Link to={routes.reset} className="text-[#0c66e4] text-[14px] hover:underline">
                                Forgot password?
                            </Link>
                            <p className="text-[14px] text-[#42526E] mx-2">•</p>
                            <Link to={routes.signup} className="text-[#0c66e4] text-[14px] hover:underline">
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
            {showCodePopup && <PopUpCode email={loginEmail} onBack={setShowCodePopup(false)} onVerify={handleVerify} />}
        </div>
    );
});

export default Login;
