import { FaceBookColor, GoogleColor } from '~/components/Icons';

const LOGO_SIZE = 24;

export const loginLogoList = [
    {
        name: 'Google',
        handle: () => {
            window.open(
                'https://localhost:7239/api/auth/google-login?returnUrl=https://phomai-shop.onrender.com',
                '_blank',
                'width=500,height=600',
            );
        },
        logo: <GoogleColor width={LOGO_SIZE} height={LOGO_SIZE} />,
    },
    {
        name: 'Facebook',
        handle: () => {
            window.open(
                'https://localhost:7239/api/auth/facebook-login?returnUrl=https://phomai-shop.onrender.com',
                '_blank',
                'width=500,height=600',
            );
        },
        logo: <FaceBookColor width={LOGO_SIZE} height={LOGO_SIZE} />,
    },
];

export const role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
