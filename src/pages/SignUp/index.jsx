import React, { memo, useState } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { ConfirmEmail, SignUp as Register } from '~/services/Auth';
import { joiResolver } from '@hookform/resolvers/joi';
import validation from './validation';
import { toast } from 'react-toastify';
import PopUpCode from '~/components/PopUpCode';
import { loginLogoList } from '../Login/constants/logo';
import Cookies from 'js-cookie';
import { useStorage } from '~/Contexts';
import routes from '~/config/routes';
import Loading from '~/components/Loading';

function SignUp() {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: joiResolver(validation),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });
    const { setIsLoggedIn } = useStorage();
    const [showCodePopup, setShowCodePopup] = useState(false);
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (values) => {
        const { email, password, firstName, lastName } = values;
        setIsLoading(true);
        Register(firstName, lastName, email, password)
            .then(() => {
                setRegisteredEmail(email);
                setShowCodePopup(true);
                setIsLoading(false);
            })
            .catch((err) => {
                console.error(err);
                toast.error('Đăng ký không thành công');
                setIsLoading(false);
            });
    };

    const handleVerify = async (verifyCode) => {
        const code = verifyCode.join('');
        const res = await ConfirmEmail(registeredEmail, code);
        setIsLoggedIn(true);
        Cookies.set('authToken', res.token, {
            expires: 7,
            path: '/',
        });
        navigate(routes.home);
        toast.success('Đăng ký thành công');
    };

    return (
        <div className="mt-[50px] w-full flex justify-center items-center h-full">
            <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
                <div>
                    <div className="mb-4">
                        <div className="flex justify-center">
                            <div>PHÔ MAI SHOP</div>
                        </div>
                        <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">
                            Register to continue
                        </h5>
                    </div>

                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
                        <Controller
                            name="firstName"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="text"
                                    value={field.firstName}
                                    onChange={field.onChange}
                                    error={Boolean(error)} // Hiển thị lỗi nếu có
                                    helperText={error ? error.message : ''} // Hiển thị thông báo lỗi
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="First Name"
                                />
                            )}
                        />
                        <Controller
                            name="lastName"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="text"
                                    value={field.lastName}
                                    onChange={field.onChange}
                                    error={Boolean(error)}
                                    helperText={error ? error.message : ''}
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="Last Name"
                                />
                            )}
                        />

                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    error={Boolean(error)}
                                    helperText={error ? error.message : ''}
                                    value={field.email}
                                    onChange={field.onChange}
                                    type="email"
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="Email"
                                />
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    error={Boolean(error)}
                                    helperText={error ? error.message : ''}
                                    value={field.password}
                                    onChange={field.onChange}
                                    type="password"
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="Password"
                                />
                            )}
                        />
                        <Controller
                            name="confirmPassword"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    error={Boolean(error)}
                                    helperText={error && error.message}
                                    value={field.confirmPassword}
                                    onChange={field.onChange}
                                    type="password"
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="Confirm Password"
                                />
                            )}
                        />

                        <Button type="submit" variant="contained">
                            Continue
                        </Button>
                    </form>
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
                        <Divider component="div" />
                    </div>
                    <div className="flex">
                        <Link to={'/login'} className="text-[#0c66e4] text-[14px] hover:underline">
                            Have an account? Log in.
                        </Link>
                    </div>
                </div>
            </div>
            {isLoading && <Loading />}
            {showCodePopup && (
                <PopUpCode email={registeredEmail} onBack={() => setShowCodePopup(false)} onVerify={handleVerify} />
            )}
        </div>
    );
}

SignUp.propTypes = {};

export default memo(SignUp);
