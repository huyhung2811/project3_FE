import React, { useState } from 'react';
import { styled } from '@mui/system';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import { attendanceApi } from '../../services/apis/AttendanceApi';
import { useSnackbar } from "notistack";

const StyledSelect = styled(Select)(({ theme, value }) => ({
    minWidth: '120px',
    fontSize: '0.875rem',
    borderRadius: '10px',
    backgroundColor: value === 'Vắng' ? '#f8d7da' : value === 'Đi muộn' ? '#fff3cd' : '#d4edda',
    '& .MuiSelect-select': {
        padding: '5px',
        paddingRight: '20px',
        backgroundColor: 'transparent',
    },
    '& .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&:hover .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        border: 'none',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    fontSize: '0.875rem',
    padding: '5px 10px',
}));

export default function ClassAttendanceByDayTable({ attendances }) {
    const [attendanceStatus, setAttendanceStatus] = useState(
        attendances.reduce((acc, attendance) => {
            acc[attendance.class_attendance.id] = attendance.class_attendance.status;
            return acc;
        }, {})
    );
    const [open, setOpen] = useState(false);
    const [selectedAttendanceId, setSelectedAttendanceId] = useState(null);
    const [selectedValue, setSelectedValue] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleChange = (event, attendanceId) => {
        setSelectedAttendanceId(attendanceId);
        setSelectedValue(event.target.value);
        setOpen(true);
    };

    const handleConfirm = () => {
        setAttendanceStatus({
            ...attendanceStatus,
            [selectedAttendanceId]: selectedValue
        });
        const fetchData = async () => {
            try {
                const res = await attendanceApi.updateStudentAttendance(selectedAttendanceId,selectedValue);
                enqueueSnackbar(res, { variant : "success",preventDuplicate: true });
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Table sx={{ minWidth: 650, width: "100%" }} aria-label="attendance table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell align="left">Avatar</TableCell>
                        <TableCell align="left">Tên</TableCell>
                        <TableCell align="left">Mã sinh viên</TableCell>
                        <TableCell align="left">Ngày</TableCell>
                        <TableCell align="left">Trạng thái</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {attendances.map((attendance, index) => (
                        <TableRow
                            key={attendance.student.student_code}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">
                                <Avatar 
                                    sx={{ width: '40px', height: '40px', border: '1px solid #000' }} 
                                    src={attendance.student.avatar} 
                                />
                            </TableCell>
                            <TableCell align="left">{attendance.student.name}</TableCell>
                            <TableCell align="left">{attendance.student.student_code}</TableCell>
                            <TableCell align="left">{attendance.class_attendance.day}</TableCell>
                            <TableCell align="left">
                                <StyledSelect
                                    value={attendanceStatus[attendance.class_attendance.id]}
                                    onChange={(event) => handleChange(event, attendance.class_attendance.id)}
                                >
                                    <StyledMenuItem value={"Vắng"}>Vắng</StyledMenuItem>
                                    <StyledMenuItem value={"Đi muộn"}>Đi muộn</StyledMenuItem>
                                    <StyledMenuItem value={"Nghỉ có phép"}>Nghỉ có phép</StyledMenuItem>
                                    <StyledMenuItem value={"Đi học"}>Đi học</StyledMenuItem>
                                </StyledSelect>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Thay đổi trạng thái điểm danh</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Xác nhận thay đổi trạng thái điểm danh của sinh viên?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Hủy
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
