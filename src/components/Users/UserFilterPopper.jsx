import React, { useState, useEffect } from 'react';
import { useLocation, useQueryParams } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { MenuItem, Select, InputLabel, FormControl, Typography, Button } from '@mui/material';
import Popover from '@mui/material/Popover';

function UserFilterPopover({ anchorEl, handleClosePopover, id, open, setSearchParams }) {
    const location = useLocation();
    const [roleInput, setRoleInput] = useState('');
    const [statusInput, setStatusInput] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);  
        const role = searchParams.get('role') || '';
        const status = searchParams.get('status') || '';

        setRoleInput(role);
        setStatusInput(status);
    }, [location.search]);

    const handleRoleChange = (event) => {
        setRoleInput(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatusInput(event.target.value);
    };

    const handleFilterClick = () => {
        const queryParams = new URLSearchParams();
        roleInput && queryParams.set('role', roleInput);
        statusInput && queryParams.set('status', statusInput);
        setSearchParams(queryParams);
        handleClosePopover();
    };

    return (
        <Popover
            sx={{ zIndex: 1200 }}
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClosePopover}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            TransitionComponent={Fade}
            transitionDuration={350}
        >
            <Paper sx={{ backgroundColor: '#fff', padding: '10px 10px', height: 260, width: 240, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Bộ lọc</Typography>
                <FormControl sx={{ marginBottom: 2 }}>
                    <InputLabel id="role-select-label">Quyền</InputLabel>
                    <Select
                        labelId="role-select-label"
                        id="role-select"
                        label="Quyền"
                        value={roleInput}
                        onChange={handleRoleChange}
                    >
                        <MenuItem value="">Chọn quyền</MenuItem>
                        <MenuItem value="admin">Quản trị viên</MenuItem>
                        <MenuItem value="teacher">Giáo viên</MenuItem>
                        <MenuItem value="student">Sinh viên</MenuItem>
                    </Select>
                </FormControl>
                <FormControl sx={{ marginBottom: 2 }}>
                    <InputLabel id="status-select-label">Trạng thái</InputLabel>
                    <Select
                        labelId="status-select-label"
                        id="status-select"
                        label="Trạng thái"
                        value={statusInput}
                        onChange={handleStatusChange}
                    >
                        <MenuItem value="">Chọn trạng thái</MenuItem>
                        <MenuItem value="active">Hoạt động</MenuItem>
                        <MenuItem value="inactive">Không hoạt động</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="contained" color="primary" onClick={handleFilterClick}>Lọc</Button>
            </Paper>
        </Popover>
    );
}

export default UserFilterPopover;
