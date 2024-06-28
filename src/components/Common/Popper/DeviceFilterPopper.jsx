import React, { useState, useEffect } from 'react';
import { useLocation, useQueryParams } from 'react-router-dom';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import { TextField, MenuItem, Select, InputLabel, FormControl, Typography, Button } from '@mui/material';
import Popover from '@mui/material/Popover';

function DeviceFilterPopover({ anchorEl, handleClosePopover, id, open, setSearchParams }) {
    const location = useLocation();
    const [buildingInput, setBuildingInput] = useState('');
    const [roomInput, setRoomInput] = useState('');
    const [statusInput, setStatusInput] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const building = searchParams.get('building') || '';
        const room = searchParams.get('room') || '';
        const status = searchParams.get('status') || '';

        setBuildingInput(building);
        setRoomInput(room);
        setStatusInput(status);
    }, [location.search]);

    const handleBuildingChange = (event) => {
        setBuildingInput(event.target.value);
    };

    const handleRoomChange = (event) => {
        setRoomInput(event.target.value);
    };

    const handleStatusChange = (event) => {
        setStatusInput(event.target.value);
    };

    const handleFilterClick = () => {
        const queryParams = new URLSearchParams();
        buildingInput && queryParams.set('building', buildingInput);
        roomInput && queryParams.set('room', roomInput);
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
            <Paper sx={{ backgroundColor: '#fff', padding: '10px 10px', height: 340, width: 240, display: 'flex', flexDirection: 'column' }}>
                <Typography variant="h6" sx={{ marginBottom: 2 }}>Bộ lọc</Typography>
                <TextField
                    id="outlined-building-input"
                    label="Tòa nhà"
                    type="text"
                    sx={{ marginBottom: 2 }}
                    value={buildingInput}
                    onChange={handleBuildingChange}
                />
                <TextField
                    id="outlined-room-input"
                    label="Phòng"
                    type="text"
                    sx={{ marginBottom: 2 }}
                    value={roomInput}
                    onChange={handleRoomChange}
                />
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

export default DeviceFilterPopover;
