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
import { useNavigate } from 'react-router-dom';
import { dayOffRequestApi } from '../../../services/apis/DayOffRequestApi';

function TeacherNotification({ isOpen, anchorEl, countNotifications, setCountNotifications }) {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.getTeacherNotifications();
                setLeaveRequests(res);
            } catch (err) {
                console.error(err);
            }
        };
        if (isOpen) {
            fetchData();
        }
    }, [isOpen,countNotifications]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const unreadRequests = leaveRequests.filter(request => request.is_read === "0");
    const allRequests = leaveRequests.sort((a, b) => a.is_read - b.is_read);
    const displayedRequests = tabValue === 0 ? unreadRequests : allRequests;

    const handleRequestClick = (event, requestId, isRead) => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.changeIsReadRequest(requestId);
                if(isRead === "0") {
                    setCountNotifications(countNotifications - 1);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        navigate(`/request-day-off/${requestId}`);
    }

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
                                        <li key={request.id} style={{ marginBottom: '10px', backgroundColor: request.is_read === "1" ? '#e0e0e0' : '#ffffff', padding: '10px', borderRadius: '5px' }} onClick={(event) => handleRequestClick(event, request.id, request.is_read)}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ marginRight: '10px' }}>{request.student_name[0]}</Avatar>
                                                <div>
                                                    <Typography variant="body2">
                                                        <strong>{request.student_name}</strong> đã gửi yêu cầu xin nghỉ vào ngày {request.day}. <br />
                                                        Lý do: {request.reason}<br />
                                                        {request.elapsed_time}<br />
                                                    </Typography>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
                                            </div> */}
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

function StudentNotification({ isOpen, anchorEl, countNotifications, setCountNotifications  }) {
    const [leaveRequests, setLeaveRequests] = useState([]);
    const [tabValue, setTabValue] = useState(0);
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.getTeacherNotifications();
                setLeaveRequests(res);
            } catch (err) {
                console.error(err);
            }
        };
        if (isOpen) {
            fetchData();
        }
    }, [isOpen,countNotifications]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const unreadRequests = leaveRequests.filter(request => request.is_read === "0");
    const allRequests = leaveRequests.sort((a, b) => a.is_read - b.is_read);
    const displayedRequests = tabValue === 0 ? unreadRequests : allRequests;

    const handleRequestClick = (event, requestId, isRead) => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.changeIsReadRequest(requestId);
                if(isRead === "0") {
                    setCountNotifications(countNotifications - 1);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        navigate(`/request-day-off/${requestId}`);
    }

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
                                        <li key={request.id} style={{ marginBottom: '10px', backgroundColor: request.is_read === "1" ? '#e0e0e0' : '#ffffff', padding: '10px', borderRadius: '5px' }} onClick={(event) => handleRequestClick(event, request.id, request.is_read)}>
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <Avatar sx={{ marginRight: '10px' }}>{request.student_name[0]}</Avatar>
                                                <div>
                                                    <Typography variant="body2">
                                                        <strong>{request.student_name}</strong> đã gửi yêu cầu xin nghỉ vào ngày {request.day}. <br />
                                                        Lý do: {request.reason}<br />
                                                        {request.elapsed_time}<br />
                                                    </Typography>
                                                </div>
                                            </div>
                                            {/* <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
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
                                            </div> */}
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

function NotificationsPopper({ isOpen, anchorEl, countNotifications, setCountNotifications }) {
    const role = getLocalItem('role');

    return role === 'teacher' ? (
        <TeacherNotification isOpen={isOpen} anchorEl={anchorEl} countNotifications={countNotifications} setCountNotifications={setCountNotifications} />
    ) : (
        <StudentNotification isOpen={isOpen} anchorEl={anchorEl} />
    );
}

export default NotificationsPopper;
