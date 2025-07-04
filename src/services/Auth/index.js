import request from '../request';

export const SignIn = async (email, password) => {
    const res = await request.post('/Auth/login', {
        email: email,
        password: password,
    });
    return res.data;
};

export const Roles = async () => {
    const res = await request.get('/role/roles');
    return res.data;
};

export const SignUp = async (firstName, lastName, email, password) => {
    const res = await request.post(
        '/Auth/register',
        {
            email,
            firstName,
            lastName,
            phone: '0905834767',
            url: '',
            password,
        },
        {
            params: {
                idRole: 2,
            },
        },
    );
    return res.data;
};

export const ConfirmEmail = async (email, code) => {
    const res = await request.post('/Auth/confirmEmail', null, {
        params: {
            email,
            code,
        },
    });
    return res.data;
};

export const LoginByGoogle = async () => {
    const res = await request.post('/Auth/google-login');
    return res.data;
};

export const SendCodeForEmail = async (email) => {
    const res = await request.post('/Auth/SendCode', null, {
        params: {
            email,
        },
    });
    return res.data;
};

export const ConfirmResetPassword = async (email, code) => {
    const res = await request.post('/Auth/confirmCodeResetPassword', null, {
        params: {
            email: email,
            code: code,
        },
    });
    return res.data;
};
