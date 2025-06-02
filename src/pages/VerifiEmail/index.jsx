import PopUpCode from '~/components/PopUpCode';
import { useLocation, useNavigate } from 'react-router-dom';
import routes from '~/config/routes';

const VerifiEmail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get('email');

    const handleBack = () => {
        console.log('handleback');
        navigate(routes.reset);
    };

    return <PopUpCode email={email} onBack={handleBack} />;
};

export default VerifiEmail;
