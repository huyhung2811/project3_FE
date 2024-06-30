import React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { FaChevronLeft } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";
import { Box, Typography } from '@mui/material';
import { Logo } from '../../assets';
import { Item } from '../LayoutItem/Item';
import { useRedirect } from '../../stores/Context/RedirectContext';
import { items } from '../../stores/ItemPath/ItemPath';
import { getLocalItem } from '../../stores/LocalStorage';
import './SideBar.css';
const drawerWidth = 300;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function NewSidebar({ open, handleDrawerClose }) {
    const handleRedirect = useRedirect().handleRedirect;
    let sideBarItems = [];
    sideBarItems = sideBarItems.concat(items.filter(item =>
        item.type === 'sidebar' 
    ));
    if (getLocalItem('role') === "student") {
        sideBarItems = sideBarItems.filter(item => item.role === "student" || item.role === "");
    }
    if (getLocalItem('role') === "teacher") {
        sideBarItems = sideBarItems.filter(item => item.role === "teacher" || item.role === "");
    }
    if (getLocalItem('role') === "admin") {
        sideBarItems = sideBarItems.filter(item => item.role === "admin");
    }
    const theme = useTheme();

    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    padding: '10px',
                    backgroundColor: '#001529',
                    overflowY: 'auto',
                },

            }}
            variant="persistent"
            anchor="left"
            open={open}
        >
            <DrawerHeader>
                <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="h6" component="div">
                        <img src={Logo} alt="Logo" style={{ right: '10px', height: '70px', border: '1px solid #707070', borderRadius: '50%' }} />
                    </Typography>
                </Box>
                <IconButton onClick={handleDrawerClose}>
                    {theme.direction === 'ltr' ? <FaChevronLeft style={{ color: "#fff" }} /> : <FaChevronRight style={{ color: "#fff" }} />}
                </IconButton>
            </DrawerHeader>
            <Divider sx={{ borderColor: '#fff' }} />
            <List>
                {sideBarItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <Item key={item.path} item={item} action={() => handleRedirect(item.path)} />
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}
