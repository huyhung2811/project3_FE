import { IoHome } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendar } from "react-icons/io5";
import { SiGoogleclassroom } from "react-icons/si";
import { MdVerifiedUser } from "react-icons/md";
import Profile from "../../pages/Profile/Profile";
import EditProfile from "../../pages/Profile/EditProfile";
// import UserList from '../pages/auth/UserManager/UserList';
// import UserDetails from '../pages/auth/UserManager/UserDetails/UserDetails';
// import UserDetailsEdit from '../pages/auth/UserManager/UserDetails/UserDetailsEdit';
// import UserCreate from '../pages/auth/UserManager/UserCreate';
// import LoginHistories from "../pages/auth/Profile/LoginHistories";
// import UserPermission from "../pages/auth/UserManager/UserPermission/Show";
// import UserPermissionEdit from "../pages/auth/UserManager/UserPermission/Edit";

export const items = [
    {
        path: '/',
        name: 'Trang chủ',
        icon: <IoHome className = 'sidebar-icon'/>,
        type: 'sidebar', 
        role: 'student',
    },
    {
        path: '/profile',
        name: 'Thông tin cá nhân',
        icon: <ImProfile className = 'header-icon'/>,
        type: 'header',
        element: <Profile/>,
        role: ''
    },
    {
        path: '/profile/edit',
        name: 'Chỉnh sửa thông tin cá nhân',
        icon: '',
        type: '',
        element: <EditProfile/>,
        role: ''
    },
    {
        path: '/change_password',
        name: 'Đổi mật khẩu',
        icon: <TbPasswordUser className = 'header-icon'/>,
        type: 'header',
        // element: <LoginHistories/>,
        role: '',
    },
    {
        path: '/student/schedule',
        name: 'Thời khóa biểu',
        icon: <IoCalendar className = 'sidebar-icon'/>,
        type: 'sidebar',
        // element: <UserList />,
        role: "student"
    },
    {
        path: '/student/class',
        name: 'Lớp sinh viên',
        icon: <SiGoogleclassroom className = 'sidebar-icon'/>,
        type: 'sidebar',
        // element: <UserCreate />,
        role: "student",
    },
    {
        path: '/student/course-class',
        name: 'Lớp học phần',
        icon: '',
        type: '',
        // element: <UserDetails />,
        role: "student",
    },
    {
        path: '/users/:id/edit',
        name: 'Chỉnh sửa người dùng',
        icon: '',
        type: '',
        // element: <UserDetailsEdit/>,
        permission: 4,
    },
    {
        path: '/permissions',
        name: 'Quyền người dùng',
        icon: <MdVerifiedUser className = 'sidebar-icon'/>,
        type: 'sidebar',
        // element: <UserPermission/>,
        permission: 7,
    },
    {
        path: '/permissions/edit',
        name: 'Sửa quyền người dùng',
        icon: '',
        type: '',
        // element: <UserPermissionEdit/>,
        permission: 8,
    },
];