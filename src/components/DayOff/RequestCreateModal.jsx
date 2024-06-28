import React from 'react';
import { useState } from 'react';
import { TextField, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { scheduleApi } from '../../services/apis/ScheduleApi';
import dayjs from 'dayjs';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { dayOffRequestApi } from '../../services/apis/DayOffRequestApi';
import { useSnackbar } from 'notistack';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function RequestCreateModal({ isOpen, handleClose }) {
    const [selectedDate, setSelectedDate] = useState(null);
    const [classOptions, setClassOptions] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [reason, setReason] = useState('');
    const { enqueueSnackbar } = useSnackbar();

    const handleDateChange = (date) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        setSelectedDate(formattedDate);
        const fetchScheduleData = async (view, date) => {
            try {
                const res = await scheduleApi.getScheduleInDay(date);
                console.log(res.schedule_in_day[0].class_code);
                setClassOptions(res.schedule_in_day);
            } catch (err) {
                console.error(err);
            }
        };
        fetchScheduleData('dayGridMonth', formattedDate);
    };

    const handleCreateRequest = async () => {
        try {
            const res = await dayOffRequestApi.createRequest(selectedClass, selectedDate, reason);
            enqueueSnackbar(res, { variant: "success", preventDuplicate: true });
            window.location.reload();
        } catch (err) {
            enqueueSnackbar(err, { variant: "error", preventDuplicate: true });
        }
    }

    const handleClassChange = (event) => {
        setSelectedClass(event.target.value);
    };

    const handleCloseModal = (event) => {
        setSelectedDate(null);
        setClassOptions([]);
        setSelectedClass('');
        setReason('');
        handleClose();
    }

    return (
        <BootstrapDialog
            onClose={handleCloseModal}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            fullWidth={true}
            maxWidth={'sm'}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
                <p>Tạo yêu cầu nghỉ học</p>
            </DialogTitle>
            <IconButton
                aria-label="close"
                onClick={handleCloseModal}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <IoMdClose />
            </IconButton>
            <DialogContent dividers>
                <LocalizationProvider dateAdapter={AdapterDayjs} style={{ width: '100%' }}>
                    <DatePicker
                        label="Chọn ngày nghỉ"
                        sx={{ width: '100%' }}
                        value={selectedDate ? dayjs(selectedDate) : null}
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <FormControl fullWidth margin="normal" disabled={!selectedDate}>
                    <InputLabel id="class-label">Chọn lớp học</InputLabel>
                    <Select
                        labelId="class-label"
                        id="class-select"
                        value={selectedClass}
                        onChange={handleClassChange}
                        label="Chọn lớp học"
                        disabled={!selectedDate}
                    >
                        {classOptions.map((option) => (
                            <MenuItem key={option.class_code} value={option.class_code}>
                                {`${option.class_code} - ${option.name}`}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="reason"
                    label="Lý do"
                    name="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    disabled={!selectedClass}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Hủy</Button>
                <Button type="submit" onClick={handleCreateRequest}>Gửi</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
