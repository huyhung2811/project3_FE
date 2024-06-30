import { ImProfile } from "react-icons/im";
import { TbPasswordUser } from "react-icons/tb";
import { IoCalendar } from "react-icons/io5";
import { MdOutlineClass } from "react-icons/md";
import { FaRegListAlt } from "react-icons/fa";
import { SlNote } from "react-icons/sl";
import { MdOutlineDeviceUnknown } from "react-icons/md";
import Profile from "../../pages/User/Profile/Profile";
import EditProfile from "../../pages/User/Profile/EditProfile";
import {
  CourseClassDetails,
  CourseClassDetailsDay,
} from "../../pages/User/CourseClass/DetailsDay";
import Search from "../../pages/User/Search/Search";
import { FaSearch } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import StudentClass from "../../pages/User/StudentClass/StudentClass";
import StudentCourseClasses from "../../pages/User/CourseClass/StudentCourseClasses";
import StudentRequestDayOff from "../../pages/User/DayOff/StudentRequestDayOff";
import RequestDayOffList from "../../pages/User/DayOff/RequestDayOffList";
import DayOffDetail from "../../pages/User/DayOff/DayOffDetails";
import TeacherCourseClasses from "../../pages/User/CourseClass/TeacherCourseClasses";
import DeviceList from "../../pages/Admin/Device/DeviceList";
import UserManager from "../../pages/Admin/UserManager/UserManager";
import { FaUserCog } from "react-icons/fa";

export const items = [
  {
    path: "/",
    name: "Thời khóa biểu",
    icon: <IoCalendar className="sidebar-icon" />,
    type: "sidebar",
    role: "",
  },
  {
    path: "/search",
    name: "Tìm kiếm",
    icon: <FaSearch className="sidebar-icon" />,
    type: "sidebar",
    element: <Search />,
    role: "",
  },
  {
    path: "/profile",
    name: "Thông tin cá nhân",
    icon: <ImProfile className="header-icon" />,
    type: "header",
    element: <Profile />,
    role: "",
  },
  {
    path: "/profile/edit",
    name: "Chỉnh sửa thông tin cá nhân",
    icon: "",
    type: "",
    element: <EditProfile />,
    role: "",
  },
  {
    path: "/change_password",
    name: "Đổi mật khẩu",
    icon: <TbPasswordUser className="header-icon" />,
    type: "header",
    // element: <LoginHistories/>,
    role: "",
  },
  {
    path: "/course-class/:classCode",
    name: "Chi tiết lớp học",
    icon: <MdOutlineClass className="sidebar-icon" />,
    type: "",
    element: <CourseClassDetails />,
    role: "",
  },
  {
    path: "/course-class/:classCode/:date",
    name: "Chi tiết lớp học",
    icon: <MdOutlineClass className="sidebar-icon" />,
    type: "",
    element: <CourseClassDetailsDay />,
    role: "",
  },
  {
    path: "/student/class",
    name: "Lớp sinh viên",
    icon: <SiGoogleclassroom className="sidebar-icon" />,
    type: "sidebar",
    element: <StudentClass />,
    role: "student",
  },
  {
    path: "/student/course-class",
    name: "Lớp học phần",
    icon: <MdOutlineClass className="sidebar-icon" />,
    type: "sidebar",
    element: <StudentCourseClasses />,
    role: "student",
  },
  {
    path: "/teacher/course-class",
    name: "Lớp học phần",
    icon: <MdOutlineClass className="sidebar-icon" />,
    type: "sidebar",
    element: <TeacherCourseClasses />,
    role: "teacher",
  },
  {
    path: "/student/request-day-off",
    name: "Xin nghỉ học",
    icon: <SlNote className="sidebar-icon" />,
    type: "sidebar",
    element: <StudentRequestDayOff />,
    role: "student",
  },
  {
    path: "/request-day-off/list",
    name: "Danh sách yêu cầu",
    icon: <FaRegListAlt className="sidebar-icon" />,
    type: "sidebar",
    element: <RequestDayOffList />,
    role: "teacher",
  },
  {
    path: "/request-day-off/:id",
    name: "Chi tiết yêu cầu",
    icon: <SlNote className="sidebar-icon" />,
    type: "",
    element: <DayOffDetail />,
    role: "",
  },
  {
    path: "/users",
    name: "Quản lý người dùng",
    icon: <FaUserCog className="sidebar-icon" />,
    type: "sidebar",
    element: <UserManager />,
    role: "admin",
  },
  {
    path: "/device",
    name: "Quản lý thiết bị",
    icon: <MdOutlineDeviceUnknown className="sidebar-icon" />,
    type: "sidebar",
    element: <DeviceList />,
    role: "admin",
  },
];
