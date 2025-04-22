import request from '../request';

export const SignIn = async (username, password) => {
    const res = await request.post('/account/login', {
        username: username,
        password: password,
    });
    return res.data;
};

export const SignUp = async (username, email, password) => {
    try {
        const res = await request.post('/account/register', {
            username: username,
            email: email,
            password: password,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
