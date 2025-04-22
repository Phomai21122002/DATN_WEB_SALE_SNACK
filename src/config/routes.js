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
        adminUpdateOrder: 'updateorder',
    }).map(([key, value]) => [key, `/admin/${value}`]),
);

export const routesUser = Object.fromEntries(
    Object.entries({
        userListBill: 'bill',
        userListOrder: 'order',
        userProfile: 'profile',
        userChangePass: 'changepass',
    }).map(([key, value]) => [key, `/user/${value}`]),
);

const routes = {
    home: '/',
    product: '/product/:slug',
    cart: '/cart',
    order: '/order',
    search: '/search/:id',
    login: '/login',
    signup: '/signup',
    ...routesAdmin,
    ...routesUser,
};

export default routes;
