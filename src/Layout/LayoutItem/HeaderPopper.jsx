import React from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { Item } from './Item.jsx';
import { useRedirect } from '../../stores/Context/RedirectContext.js';
import { useNavigate } from 'react-router-dom';
import { AuthAPI } from '../../services/apis/AuthApi.js';
import { IoLogOutOutline } from "react-icons/io5";
import { items } from '../../stores/ItemPath/ItemPath.js';
import { useSnackbar } from "notistack";

function HeaderPopper({ isOpen, anchorEl}) {
    const headerItems = items.filter(item => item.type === 'header');
    const handleRedirect = useRedirect().handleRedirect;
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const handleLogout = () => {
        AuthAPI.logout()
            .then(res => {
                console.log(res);
                enqueueSnackbar('Đăng xuất thành công!', { variant : "success",preventDuplicate: true });
                navigate("/login");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <Popper
            sx={{ zIndex: 1200 }}
            open={isOpen}
            anchorEl={anchorEl}
            placement="bottom-end"
            transition
        >
            {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                    <Paper sx={{ backgroundColor: '#001529', padding: '5px 10px' }}>    
                        <ul>
                            {headerItems.map((item) => {
                                return (
                                    <Item key={item.path} item={item} action={() => handleRedirect(item.path)} />
                                )
                            })
                            }
                        </ul>
                        <li className='wrapper-header-item' onClick={handleLogout}>
                            <IoLogOutOutline />
                            <p>Đăng xuất</p>
                        </li>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}

export default HeaderPopper;