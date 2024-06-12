import React, { useState } from 'react';
import Popper from '@mui/material/Popper';
import Fade from '@mui/material/Fade';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { useSnackbar } from "notistack";
import { getLocalItem } from '../../../stores/LocalStorage';

const initialLeaveRequests = [
    { id: 1, studentName: 'John Doe', reason: 'Medical Leave', date: '2024-06-10', mutualFriends: 3, hoursAgo: 15, read: false },
    { id: 2, studentName: 'Jane Smith', reason: 'Family Event', date: '2024-06-12', mutualFriends: 2, hoursAgo: 20, read: false },
    { id: 3, studentName: 'Emily Johnson', reason: 'Personal Leave', date: '2024-06-11', mutualFriends: 1, hoursAgo: 10, read: false },
    { id: 4, studentName: 'Michael Brown', reason: 'School Event', date: '2024-06-12', mutualFriends: 5, hoursAgo: 8, read: false },
    { id: 5, studentName: 'Sarah Davis', reason: 'Family Trip', date: '2024-06-09', mutualFriends: 4, hoursAgo: 25, read: false },
    { id: 6, studentName: 'James Wilson', reason: 'Health Issue', date: '2024-06-08', mutualFriends: 3, hoursAgo: 30, read: false },
    { id: 7, studentName: 'James Wilson', reason: 'Health Issue', date: '2024-06-08', mutualFriends: 3, hoursAgo: 30, read: true },
];

function TeacherNotification({ isOpen, anchorEl }) {
    const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
    const [tabValue, setTabValue] = useState(0);
    const { enqueueSnackbar } = useSnackbar();

    const handleAccept = (id) => {
        setLeaveRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === id ? { ...request, read: true } : request
            )
        );
        enqueueSnackbar('Leave request accepted', { variant: 'success' });
    };

    const handleReject = (id) => {
        setLeaveRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === id ? { ...request, read: true } : request
            )
        );
        enqueueSnackbar('Leave request rejected', { variant: 'error' });
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const unreadRequests = leaveRequests.filter(request => !request.read);
    const displayedRequests = tabValue === 0 ? unreadRequests : leaveRequests;

    const handleClickInside = (event) => {
        event.stopPropagation();
    };

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
                    <Paper sx={{ width: 360, backgroundColor: '#f8f8f8', padding: '10px' }} onClick={handleClickInside}>
                        <Typography variant="h6" gutterBottom>
                            Thông báo
                        </Typography>
                        <Tabs value={tabValue} onChange={handleTabChange} aria-label="notification tabs">
                            <Tab label="Chưa đọc" />
                            <Tab label="Tất cả" />
                        </Tabs>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {displayedRequests.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {displayedRequests.map((request) => (
                                        <li key={request.id} style={{ marginBottom: '10px', backgroundColor: request.read ? '#e0e0e0' : '#ffffff', padding: '10px', borderRadius: '5px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ marginRight: '10px' }}>{request.studentName[0]}</Avatar>
                                                <div>
                                                    <Typography variant="body2">
                                                        <strong>{request.studentName}</strong> đã gửi cho bạn yêu cầu nghỉ phép. <br />
                                                        {request.hoursAgo} giờ trước<br />
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                                                <Button 
                                                    onClick={() => handleAccept(request.id)}
                                                    variant="contained"
                                                    sx={{marginRight: 1, backgroundColor: '#2c98f0', width: '200px'}}
                                                >
                                                    Xác nhận
                                                </Button>
                                                <Button 
                                                    onClick={() => handleReject(request.id)}
                                                    variant="contained"
                                                    color='error'
                                                    sx={{width: '200px', backgroundColor: '#bdbdbd'}}
                                                >
                                                    Xóa
                                                </Button>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="body2" align="center">Không có thông báo</Typography>
                            )}
                        </div>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}

function StudentNotification({ isOpen, anchorEl }) {
    const [leaveRequests, setLeaveRequests] = useState(initialLeaveRequests);
    const { enqueueSnackbar } = useSnackbar();

    const displayedRequests = leaveRequests.filter(request => request.read).sort((a, b) => new Date(b.date) - new Date(a.date));
    
    const handleClickInside = (event) => {
        event.stopPropagation();
    };

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
                    <Paper sx={{ width: 360, backgroundColor: '#f8f8f8', padding: '10px' }} onClick={handleClickInside}>
                        <Typography variant="h6" gutterBottom>
                            Thông báo
                        </Typography>
                        <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                            {displayedRequests.length > 0 ? (
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {displayedRequests.map((request) => (
                                        <li key={request.id} style={{ marginBottom: '10px', backgroundColor: '#e0e0e0', padding: '10px', borderRadius: '5px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ marginRight: '10px' }}>{request.teacherName[0]}</Avatar>
                                                <div>
                                                    <Typography variant="body2">
                                                        Giáo viên <strong>{request.teacherName}</strong> đã {request.action.toLowerCase()} yêu cầu xin nghỉ của bạn.<br />
                                                        Lý do: {request.reason}<br />
                                                        Thời gian: {request.hoursAgo} giờ trước
                                                    </Typography>
                                                </div>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <Typography variant="body2" align="center">Không có thông báo</Typography>
                            )}
                        </div>
                    </Paper>
                </Fade>
            )}
        </Popper>
    );
}

function NotificationsPopper({ isOpen, anchorEl }) {
    const role = getLocalItem('role');

    return role === 'teacher' ? (
        <TeacherNotification isOpen={isOpen} anchorEl={anchorEl} />
    ) : (
        <StudentNotification isOpen={isOpen} anchorEl={anchorEl} />
    );
}

export default NotificationsPopper;
