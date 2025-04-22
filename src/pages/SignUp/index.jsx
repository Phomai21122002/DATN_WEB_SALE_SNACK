import React, { memo } from 'react';
import { Button, Divider, TextField } from '@mui/material';
import { Apple, FaceBookColor, GoogleColor } from '~/components/Icons';
import { Link, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { SignUp as Register } from '~/services/Auth';
import { joiResolver } from '@hookform/resolvers/joi';
import validation from './validation';
import { toast } from 'react-toastify';

const borderStyle = 'border-[1px] border-[#8590A2] border-solid';

function SignUp() {
    const navigate = useNavigate();
    const form = useForm({
        defaultValues: {
            userName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        resolver: joiResolver(validation),
        mode: 'onSubmit',
        reValidateMode: 'onBlur',
    });

    const handleSubmit = (values) => {
        const { email, password, userName } = values;
        Register(userName, email, password)
            .then(() => {
                toast.success('Register account successfully');
                navigate('/login');
            })
            .catch((err) => {
                console.error(err);
                toast.error('Register account fail');
            });
    };

    return (
        <div className="mt-[50px] w-full flex justify-center items-center h-full">
            <div className="px-[40px] py-[32px] w-[400px] shadow-lg shadow-gray-300/50">
                <div>
                    <div className="mb-4">
                        <div className="flex justify-center">
                            <div>WEB SALES</div>
                        </div>
                        <h5 className="text-[16px] font-medium pt-6 text-center text-[var(--text-color)]">
                            Register to continue
                        </h5>
                    </div>

                    <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col">
                        <Controller
                            name="userName"
                            control={form.control}
                            render={({ field, fieldState: { error } }) => (
                                <TextField
                                    type="text"
                                    value={field.userName}
                                    onChange={field.onChange}
                                    error={Boolean(error)} // Hiển thị lỗi nếu có
                                    helperText={error ? error.message : ''} // Hiển thị thông báo lỗi
                                    sx={{
                                        marginBottom: 2,
                                        '& .MuiInputBase-input': {
                                            padding: 1,
                                        },
                                    }}
                                    placeholder="User Name"
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
                    <div className="mt-6">
                        <span className="mb-4 text-[14px] font-bold text-slate-400">Others:</span>
                    </div>

                    <div>
                        <div
                            className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
                        >
                            <GoogleColor width={24} height={24} />
                            <span className="text-[14px] font-bold">Google</span>
                        </div>
                        <div
                            className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
                        >
                            <FaceBookColor width={24} height={24} />
                            <span className="text-[14px] font-bold">Facebook</span>
                        </div>

                        <div
                            className={`h-10 w-full flex justify-center items-center gap-2 ${borderStyle} cursor-pointer hover:bg-slate-50 mb-4 rounded-sm`}
                        >
                            <Apple width={24} height={24} />
                            <span className="text-[14px] font-bold">Apple</span>
                        </div>
                    </div>
                    <div className="my-4">
                        <Divider component="div" />
                    </div>
                    <div className="flex">
                        <Link to={'/login'} className="text-[#0c66e4] text-[14px] hover:underline">
                            Already have an Atlassian account? Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

SignUp.propTypes = {};

export default memo(SignUp);
