import AdminPage from '../components/AdminPageComponent/AdminPage';

import AddProduct from '../pages/AddProduct/AddProduct';
import SignIn from '../pages/SignInPage/SignInPage';
import SignUp from '../pages/SignUpPage/SignUpPage';
const routes = [
    {
        path: '/',
        page: AdminPage,
        isShowHeader: true,
    },
    {
        path: 'add_product',
        page: AddProduct,
        isPrivate: true,
    },

    {
        path: 'sign-in',
        page: SignIn,
    },
    {
        path: 'sign-up',
        page: SignUp,
    },
];
export default routes;
