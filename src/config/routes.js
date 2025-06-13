export const routesAdmin = Object.fromEntries(
    Object.entries({
        admin: '',
        adminProduct: 'product',
        adminUpdateProduct: 'product/:slug',
        adminListProduct: 'listproduct',
        adminCategory: 'category',
        adminUpdateCategory: 'category/:id',
        adminListCategory: 'listcategory',
        adminListConfirmOrder: 'confirmorder',
        adminListCancelOrder: 'cancelorder',
        adminListBill: 'bill',
        adminListUser: 'user',
        adminUpdateUser: 'user/:id',
        adminRevenue: 'revenue',
        adminProfile: 'profile',
        adminChangePass: 'changepass',
        adminUpdateOrder: 'updateorder/:id',
    }).map(([key, value]) => [key, `/admin/${value}`]),
);

export const routesUser = Object.fromEntries(
    Object.entries({
        userListBill: 'bill',
        userBillDetail: 'bill/:id',
        userListOrder: 'order',
        userProfile: 'profile',
        userChangePass: 'changepass',
        userCheckOutPayment: 'checkoutpayment',
    }).map(([key, value]) => [key, `/user/${value}`]),
);

const routes = {
    home: '/',
    product: '/product/:slug',
    cart: '/cart',
    order: '/order',
    categoryDetail: '/category/:id',
    login: '/login',
    signup: '/signup',
    reset: '/reset',
    verifyEmail: '/verify/email',
    ...routesAdmin,
    ...routesUser,
};

export default routes;
