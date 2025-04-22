import { memo, useEffect, useState } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { jwtDecode } from 'jwt-decode';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

import routes from '../../config/routes';
import { loginLogoList, role } from './constants/logo';
import { SignIn } from '~/services/Auth';
import Loading from '~/components/Loading';
import { useStorage } from '~/Contexts';

const Login = memo(() => {
    const navigate = useNavigate();
    const { setUserData, setIsLoggedIn } = useStorage();
    const [errorPass, setErrorPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit, control } = useForm({
        defaultValues: {
            username: '',
            password: '',
        },
    });

    useEffect(() => {
        setIsLoggedIn(false);
        localStorage.clear();
        Cookies.remove('authToken');
    }, [setIsLoggedIn]);

    const onLogin = async (values) => {
        const { username, password } = values;
        setIsLoading(true);
        SignIn(username, password)
            .then((res) => {
                const decoded = jwtDecode(res.token);
                decoded.role = decoded[role];
                delete decoded[role];
                setUserData(decoded);
                setIsLoggedIn(true);
                Cookies.set('authToken', res.token, {
                    expires: 7,
                    path: '/',
                });
                toast.success('Login successfully');
                navigate(routes.home);
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

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex items-center justify-center w-screen h-screen">
                <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
                    <div>
                        <div className="mb-4">
                            <div className="flex justify-center">
                                <div>WEB SALES</div>
                            </div>
                            <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">
                                Login to continue
                            </h5>
                        </div>

                        <form onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
                            <Controller
                                name="username"
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
                                        placeholder="Input your username"
                                    />
                                )}
                            />
                            <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <TextField
                                        onChange={field.onChange}
                                        value={field.password}
                                        type="password"
                                        sx={{
                                            '& .MuiInputBase-input': {
                                                padding: 1,
                                            },
                                        }}
                                        placeholder="Input your password"
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
                            <Link className="text-[#0c66e4] text-[14px] hover:underline">You can't login ?</Link>
                            <p className="text-[14px] text-[#42526E] mx-2">•</p>
                            <Link to={routes.signup} className="text-[#0c66e4] text-[14px] hover:underline">
                                Create account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
        </div>
    );
});

export default Login;
