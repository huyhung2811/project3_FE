import React from 'react';
import { TextField } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { commonApi } from '../../services/apis/CommonApi';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import Grid from '@mui/material/Grid';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const labelText = {
    student_code: 'Mã sinh viên',
    name: "Tên",
    email: "Email",
    phone: "Số điện thoại",
    birth_date: "Ngày sinh",
    address: "Địa chỉ",
    home_town: "Quê quán",
    student_class: "Lớp sinh viên",
    class_name: "Lớp sinh viên",
    system: "Hệ",
    unit: "Khoa/Viện"
};

function StudentDetailsModal({ isOpen, handleClose, studentCode }) {
    const [studentDetails, setStudentDetails] = React.useState();
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await commonApi.getStudentDetails(studentCode);
                setStudentDetails(res);
            } catch (err) {
                console.error(err.message);
            }
        };
        fetchData();
    }, [studentCode]);
    return (
        studentDetails && <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={isOpen}
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title" style={{ display: 'flex', flexDirection: "row", alignItems: "center", justifyContent: "start" }}>
                <Avatar style={{ width: "60px", height: "60px", border: "1px solid #000" }} src={studentDetails.avatar} />
                <p style={{ textAlign: "start", marginLeft: "10px", fontSize: "22px", fontWeight: "bold" }}>{studentDetails.name}</p>
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
                <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                    {Object.entries(studentDetails).map(([key, value], index) => {
                        if (key !== 'avatar' && key !== 'name') {
                            return (
                                <Grid item xs={6} md={3} key={index}>
                                    <p className="detail-label" style={{ color: "#000", fontSize: "20px", fontWeight: "bold" }}>{labelText[key]}</p>
                                    <TextField
                                        className="input"
                                        id={`input-${key}`}
                                        name={key}
                                        variant="outlined"
                                        defaultValue={value}
                                        InputProps={{
                                            readOnly: true,
                                            style: { fontSize: '18px' }
                                        }}
                                    />
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
            </DialogContent>
        </BootstrapDialog>
    );
}

export default StudentDetailsModal;


