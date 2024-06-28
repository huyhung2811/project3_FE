import React from 'react';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import { IoMdClose } from "react-icons/io";
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useSnackbar } from 'notistack';
import { deviceApi } from '../../services/apis/DeviceApi';
import TextField from '@mui/material/TextField';
import { MenuItem, Select, InputLabel, FormControl} from '@mui/material';
import { userApi } from '../../services/apis/UserApi';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        zIndex: 1,
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const userRole = {
    'admin' : 'Quản trị viên',
    'student' : 'Sinh viên',
    'teacher' : 'Giáo viên'
}

export default function ChangeUserModal({ isOpen, handleClose, id, email, role, status, setIsChange }) {
    const [inputStatus, setInputStatus] = useState(status);
    const { enqueueSnackbar } = useSnackbar();

    const handleStatusChange = (event) => {
        setInputStatus(event.target.value);
    }

    const handleEditUser = async () => {
        try {
            const res = await userApi.updateUser(id, inputStatus);
            enqueueSnackbar(res, { variant: "success", preventDuplicate: true });
            handleCloseModal();
            setIsChange(true);
        } catch (err) {
            enqueueSnackbar(err, { variant: "error", preventDuplicate: true });
        }
    }

    const handleCloseModal = (event) => {
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
                <p>Sửa thiết bị</p>
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
                    <TextField
                        autoFocus
                        margin="dense"
                        id="email"
                        label="Email"
                        type="text"
                        fullWidth
                        disabled
                        value={email}
                    />
                    <TextField
                        margin="dense"
                        id="role"
                        label="Role"
                        type="text"
                        fullWidth
                        disabled
                        value={userRole[role]}
                    />
                    <FormControl sx={{ marginBottom: 2, width: '100%', marginTop: 1 }}>
                        <InputLabel id="status-select-label">Trạng thái</InputLabel>
                        <Select
                            labelId="status-select-label"
                            id="status-select"
                            label="Trạng thái"
                            value={inputStatus}
                            onChange={handleStatusChange}
                        >
                            <MenuItem value="">Chọn trạng thái</MenuItem>
                            <MenuItem value="active">Hoạt động</MenuItem>
                            <MenuItem value="inactive">Không hoạt động</MenuItem>
                        </Select>
                    </FormControl>
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Hủy</Button>
                <Button type="submit" onClick={handleEditUser}>Sửa</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
