import React from 'react';
import { useState } from 'react';
import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import Autocomplete from '@mui/material/Autocomplete';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

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
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setClassOptions(['Class 1', 'Class 2', 'Class 3']);
    };
    const handleClassChange = (event, value) => setSelectedClass(value);
    return (
        <BootstrapDialog
            onClose={handleClose}
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
                onClick={handleClose}
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
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Chọn ngày nghỉ"
                        value={selectedDate}
                        onChange={handleDateChange}
                        renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
                    />
                </LocalizationProvider>
                <Autocomplete
                    options={classOptions}
                    value={selectedClass}
                    onChange={handleClassChange}
                    disabled={!selectedDate}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Chọn lớp học"
                            fullWidth
                            margin="normal"
                            disabled={!selectedDate}
                        />
                    )}
                />
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
        </BootstrapDialog>
    );
}



