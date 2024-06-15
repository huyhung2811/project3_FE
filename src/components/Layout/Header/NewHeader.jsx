import React from 'react';
import { styled } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { TfiMenu } from "react-icons/tfi";
import { useProfile } from '../../../stores/Context/ProfileContext';
import { useLayout } from '../../../stores/Context/LayoutContext';
import { DefaultAvatar } from '../../../assets';
import HeaderPopper from '../../Common/Popper/HeaderPopper';
import { FaRegBell } from "react-icons/fa";
import { Badge } from '@mui/material';
import NotificationsPopper from '../../Common/Popper/NotificationPopper';
import Pusher from 'pusher-js';

const drawerWidth = 300;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'showSidebar',
})(({ theme, showSidebar }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    color: '#000',
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(showSidebar && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

export default function Header({ pageName }) {
    const { showSidebar, setShowSidebar } = useLayout();
    const [isOpen, setIsOpen] = React.useState(false);
    const [isShowNotifications, setIsShowNotifications] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [notifyEl, setNotifyEl] = React.useState(null);
    const value = useProfile();
    const anchorPopperRef = React.useRef(null);
    const anchorNotificationRef = React.useRef(null);

    React.useEffect(() => {
        const pusher = new Pusher('ac339023c6f200c43c03', {
            cluster: 'ap1',
        });

        const channel = pusher.subscribe('day-off-request');
        channel.bind('request', function (data) {
            value.setIsHasNotifications((prev) => !prev)
        });
    },[]);

    const handleDrawerOpen = (e) => {
        e.preventDefault();
        setShowSidebar(!showSidebar);
    };

    const handlePopperOpen = (e) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setAnchorEl(e.currentTarget);
    };

    const handleNotificationsShow = (e) => {
        e.preventDefault();
        setIsShowNotifications(prev => !prev);
        setNotifyEl(e.currentTarget);
    }

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            const isClickOutsideAvatar = anchorPopperRef.current && !anchorPopperRef.current.contains(event.target);
            const isClickOutsideNotification = anchorNotificationRef.current && !anchorNotificationRef.current.contains(event.target);
            if (isClickOutsideAvatar) {
                setIsOpen(false);
            }
            if (isClickOutsideNotification) {
                setIsShowNotifications(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [anchorPopperRef, anchorNotificationRef]);

    return (
        <AppBar position="fixed" showSidebar={showSidebar}>
            <Toolbar sx={{ display: 'flex', justifyContent: 'flex-start', width: '-webkit-fill-available' }}>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    sx={{ mr: 2, ...(showSidebar && { display: 'none' }) }}
                >
                    <TfiMenu />
                </IconButton>
                <Typography variant="h6" noWrap component="div">
                    {pageName}
                </Typography>
            </Toolbar>
            <>
                <div className="header-right" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <div className="notification-bell" style={{ marginRight: '10px', marginTop: '5px', fontSize: "24px" }}>
                        <Badge badgeContent={value.countNotifications} color="error" ref={anchorNotificationRef} onClick={handleNotificationsShow}>
                            < FaRegBell />
                        </Badge>
                        <NotificationsPopper isOpen={isShowNotifications} anchorEl={notifyEl} countNotifications={value.countNotifications} setCountNotifications={value.setCountNotifications} />
                    </div>
                    <HeaderPopper anchorRef={anchorPopperRef} isOpen={isOpen} anchorEl={anchorEl} setIsOpen={setIsOpen} />
                    {value.profile && <img ref={anchorPopperRef} src={value.profile.avatar ? value.profile.avatar : DefaultAvatar} alt="logo" style={{ marginRight: '10px', width: "60px", height: "60px", borderRadius: '50%', }} onClick={handlePopperOpen} />}
                </div>
            </>
        </AppBar>
    );
}
