import { Apple, FaceBookColor, GoogleColor } from '~/components/Icons';

const LOGO_SIZE = 24;

export const loginLogoList = [
    {
        name: 'Google',
        handle: () => {
            const popup = window.open(
                'https://localhost:7239/api/auth/google-login',
                'googleLogin',
                'width=500,height=600',
            );

            window.addEventListener('message', (event) => {
                if (event.data.token) {
                    console.log('JWT token from Google:', event.data.token);
                    localStorage.setItem('token', event.data.token);
                }
            });
        },
        logo: <GoogleColor width={LOGO_SIZE} height={LOGO_SIZE} />,
    },
    {
        name: 'Facebook',
        logo: <FaceBookColor width={LOGO_SIZE} height={LOGO_SIZE} />,
    },
    {
        name: 'Apple',
        logo: <Apple width={LOGO_SIZE} height={LOGO_SIZE} />,
    },
];

export const role = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
