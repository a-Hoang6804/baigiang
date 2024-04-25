import { Routes, Route, } from 'react-router-dom';
import App from './App';
import Admin from './component/Admin/Admin';
import User from './component/User/User';
import HomePage from './component/Home/HomePage';
import ManageUser from './component/Admin/Content/ManageUser';
import Dashboard from './component/Admin/Content/DashBoard';
import Login from './component/Auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './component/Auth/Register';

const Layout = (props) => {
    return (
        <>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="users" element={<User />} />
                </Route>
                <Route path="/admins" element={<Admin />} >
                    <Route index element={<Dashboard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressbar={false}
                closeOnClick
                rtl={false}
                pauseonFocusLoss
                draggable
                pauseOnHover
            />

        </>
    )
}
export default Layout;