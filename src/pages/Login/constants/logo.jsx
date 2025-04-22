import { Apple, FaceBookColor, GoogleColor } from '~/components/Icons';

const LOGO_SIZE = 24;

export const loginLogoList = [
    {
        name: 'Google',
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
