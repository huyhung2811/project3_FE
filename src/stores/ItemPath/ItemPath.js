import { ImProfile } from "react-icons/im";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { SlNote } from "react-icons/sl";
import Profile from "../../pages/Profile/Profile";
import EditProfile from "../../pages/Profile/EditProfile";
import {CourseClassDetails, CourseClassDetailsDay} from "../../pages/student/CourseClass/DetailsDay";
import Search from "../../pages/Search/Search";
import { FaSearch } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import StudentClass from "../../pages/student/StudentClass";
import StudentCourseClasses from "../../pages/student/CourseClass/StudentCourseClasses";
import RequestDayOff from "../../pages/DayOff/RequestDayOff";

export const items = [
    {
        path: '/',
        name: 'Thời khóa biểu',
        icon: <IoCalendar className = 'sidebar-icon'/>,
        type: 'sidebar', 
        role: '',
    },
    {
        path: '/search',
        name: 'Tìm kiếm',
        icon: <FaSearch className="sidebar-icon"/>,
        type: 'sidebar',
        element: <Search/>,
        role: '',
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
        icon: <MdOutlineClass className='sidebar-icon' />,
        type: '',
        element: <CourseClassDetails />,
        role: ''
    },
    {
        path: '/course-class/:classCode/:date',
        name: 'Chi tiết lớp học',
        icon: <MdOutlineClass className='sidebar-icon' />,
        type: '',
        element: <CourseClassDetailsDay />,
        role: ''
    },
    {
        path: '/student/class',
        name: 'Lớp sinh viên',
        icon: <SiGoogleclassroom className = 'sidebar-icon'/>,
        type: 'sidebar',
        element: <StudentClass/>,
        role: "student",
    },
    {
        path: '/student/course-class',
        name: 'Lớp học phần',
        icon: <MdOutlineClass className = 'sidebar-icon'/>,
        type: 'sidebar',
        element: <StudentCourseClasses />,
        role: "",
    },
    {
        path: '/request-day-off',
        name: 'Xin nghỉ học',
        icon: <SlNote className = 'sidebar-icon'/>,
        type: 'sidebar',
        element: <RequestDayOff />,
        role: "",
    },
];