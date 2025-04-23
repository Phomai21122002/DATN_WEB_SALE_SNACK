import request from '../request';

export const SignIn = async (email, password) => {
    const res = await request.post('/Auth/login', {
        email: email,
        password: password,
    });
    console.log(res.data);
    return res.data;
};

export const Roles = async () => {
    const res = await request.get('/role/roles');
    console.log(res.data);
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
