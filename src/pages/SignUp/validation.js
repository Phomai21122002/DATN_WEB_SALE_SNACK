import Joi from 'joi';
const validation = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .label('email'),
    password: Joi.string()
        .min(6)
        .pattern(new RegExp('(?=.*[a-z])')) // Chữ cái thường
        .pattern(new RegExp('(?=.*[A-Z])')) // Chữ cái hoa
        .pattern(new RegExp('(?=.*\\d)')) // Số
        .pattern(new RegExp('(?=.*[!@#$%^&*])')) // Ký tự đặc biệt
        .required()
        .label('password')
        .messages({
            'string.pattern.base':
                'Password must include at least one lowercase letter, one uppercase letter, one number, and one special character.',
        }),
    confirmPassword: Joi.any()
        .equal(Joi.ref('password'))
        .required()
        .label('confirm password')
        .messages({ 'any.only': 'Password and confirm password must match' }),
    userName: Joi.string().min(5).max(10).required().label('user name'),
});

export default validation;
