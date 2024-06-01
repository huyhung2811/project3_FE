import { IoHome } from "react-icons/io5";
import { ImProfile } from "react-icons/im";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import Profile from "../../pages/Profile/Profile";
import EditProfile from "../../pages/Profile/EditProfile";
import CourseClassDetails from "../../pages/student/CourseClass/Details";

export const items = [
    {
        path: '/',
        name: 'Thời khóa biểu',
        icon: <IoCalendar className = 'sidebar-icon'/>,
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
        path: '/course-class/:classCode',
        name: 'Chi tiết lớp học',
        icon: <MdOutlineClass className = 'sidebar-icon'/>,
        type: '',
        element: <CourseClassDetails/>,
        role: ''
    },
    // {
    //     path: '/student/class',
    //     name: 'Lớp sinh viên',
    //     icon: <SiGoogleclassroom className = 'sidebar-icon'/>,
    //     type: 'sidebar',
    //     // element: <UserCreate />,
    //     role: "student",
    // },
    // {
    //     path: '/student/course-class',
    //     name: 'Lớp học phần',
    //     icon: '',
    //     type: '',
    //     // element: <UserDetails />,
    //     role: "student",
    // },
    // {
    //     path: '/users/:id/edit',
    //     name: 'Chỉnh sửa người dùng',
    //     icon: '',
    //     type: '',
    //     // element: <UserDetailsEdit/>,
    //     permission: 4,
    // },
];