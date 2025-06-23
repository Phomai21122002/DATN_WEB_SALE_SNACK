import config from '~/config';
import { AdminLayout, AuthLayout } from '~/layouts';
import {
    BillDetail,
    BoardBillUser,
    BoardOrder,
    BoardOrderUser,
    BoardRevenue,
    BoardUser,
    Cart,
    Category,
    CategoryDetail,
    ChangePassAdmin,
    ChangePassUser,
    CheckOutPayment,
    CreateCategory,
    CreateProduct,
    FeedBackProduct,
    FindProduct,
    Home,
    Login,
    Order,
    Product,
    ProductDetail,
    ProfileAdmin,
    ProfileUser,
    SignUp,
    UpdateCategory,
    UpdateOrder,
    UpdateProduct,
    UpdateUser,
} from '~/pages';
import BoardBill from '~/pages/Admin/BoardBill';
import BoardCancelOrder from '~/pages/Admin/BoardCancelOrder';
import BoardConfirmOrder from '~/pages/Admin/BoardConfirmOrder';
import ForgotPassword from '~/pages/ForgotPassword';
import VerifiEmail from '~/pages/VerifiEmail';

const publicRoutes = [
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.signup, component: SignUp, layout: AuthLayout },
    { path: config.routes.home, component: Home },
    { path: config.routes.cart, component: Cart },
    { path: config.routes.order, component: Order },
    { path: config.routes.product, component: ProductDetail },
    { path: config.routes.categoryDetail, component: CategoryDetail },
    { path: config.routes.reset, component: ForgotPassword, layout: AuthLayout },
    { path: config.routes.verifyEmail, component: VerifiEmail, layout: AuthLayout },
    { path: config.routes.find, component: FindProduct },
];

const adminRoutes = [
    { path: config.routes.admin, component: BoardOrder, layout: AdminLayout },
    { path: config.routes.adminProduct, component: CreateProduct, layout: AdminLayout },
    { path: config.routes.adminUpdateProduct, component: UpdateProduct, layout: AdminLayout },
    { path: config.routes.adminListProduct, component: Product, layout: AdminLayout },
    { path: config.routes.adminCategory, component: CreateCategory, layout: AdminLayout },
    { path: config.routes.adminUpdateCategory, component: UpdateCategory, layout: AdminLayout },
    { path: config.routes.adminListCategory, component: Category, layout: AdminLayout },
    { path: config.routes.adminListConfirmOrder, component: BoardConfirmOrder, layout: AdminLayout },
    { path: config.routes.adminListCancelOrder, component: BoardCancelOrder, layout: AdminLayout },
    { path: config.routes.adminListBill, component: BoardBill, layout: AdminLayout },
    { path: config.routes.adminProfile, component: ProfileAdmin, layout: AdminLayout },
    { path: config.routes.adminChangePass, component: ChangePassAdmin, layout: AdminLayout },
    { path: config.routes.adminRevenue, component: BoardRevenue, layout: AdminLayout },
    { path: config.routes.adminListUser, component: BoardUser, layout: AdminLayout },
    { path: config.routes.adminUpdateUser, component: UpdateUser, layout: AdminLayout },
    { path: config.routes.adminUpdateOrder, component: UpdateOrder, layout: AdminLayout },
    { path: config.routes.adminFeedBackProduct, component: FeedBackProduct, layout: AdminLayout },
];

const userRoutes = [
    { path: config.routes.userListBill, component: BoardBillUser },
    { path: config.routes.userBillDetail, component: BillDetail },
    { path: config.routes.userListOrder, component: BoardOrderUser },
    { path: config.routes.userProfile, component: ProfileUser },
    { path: config.routes.userChangePass, component: ChangePassUser },
    { path: config.routes.userCheckOutPayment, component: CheckOutPayment },
];

export { publicRoutes, adminRoutes, userRoutes };
