import PopUpCode from '~/components/PopUpCode';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';
import { ConfirmResetPassword } from '~/services/Auth';
import Cookies from 'js-cookie';

const VerifiEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handleBack = () => {
        console.log('handleback');
        navigate(routes.reset);
    };

    const handleVerify = async (verifyCode) => {
        const code = verifyCode.join('');
        const res = await ConfirmResetPassword(email, Number(code));
        Cookies.set('resetPasswordToken', res.token, {
            expires: 1 / 288,
            path: '/',
        });
        // navigate(routes.reset);
    };

    return <PopUpCode email={email} onBack={handleBack} onVerify={handleVerify} />;
};

export default VerifiEmail;
