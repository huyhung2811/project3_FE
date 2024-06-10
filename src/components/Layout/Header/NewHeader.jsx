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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const value = useProfile();
    const anchorRef = React.useRef(null);

    const handleDrawerOpen = (e) => {
        e.preventDefault();
        setShowSidebar(!showSidebar);   
    };

    const handleOpen = (e) => {
        e.preventDefault();
        setIsOpen(prev => !prev);
        setAnchorEl(e.currentTarget);
    };

    React.useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorRef.current && !anchorRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [anchorRef]);

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
                <div className="header-right">
                    <HeaderPopper anchorRef={anchorRef} isOpen={isOpen} anchorEl={anchorEl} setIsOpen={setIsOpen} />
                    {value.profile && <img ref={anchorRef} src={value.profile.avatar ? value.profile.avatar : DefaultAvatar} alt="logo" style={{ marginRight: '10px', width: "60px", height: "60px", borderRadius: '50%', marginTop: '10px' }} onClick={handleOpen} />}
                </div>
            </>
        </AppBar>
    );
}
