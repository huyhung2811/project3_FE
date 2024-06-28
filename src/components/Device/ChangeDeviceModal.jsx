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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        zIndex: 1,
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ChangeDeviceModal({ isOpen, handleClose, id, MAC_address, room, setIsChange}) {
    const [MACAddress, setMACAddress] = useState(MAC_address);
    const [inputRoom, setInputRoom] = useState();
    const [inputBuilding, setInputBuilding] = useState();
    const { enqueueSnackbar } = useSnackbar();

    React.useEffect(() => {
        if (room) {
            const parts = room.split('-');
            setInputBuilding(parts[0]);
            setInputRoom(parts[1]);
        }
    }, [room]);

    const handleMACAddressChange = (event) => {
        setMACAddress(event.target.value);
    }

    const handleRoomChange = (event) => {
        setInputRoom(event.target.value);
    }

    const handleBuildingChange = (event) => {
        setInputBuilding(event.target.value);
    }

    const handleEditDevice = async () => {
        try {
            const res = await deviceApi.updateDevice(id, MACAddress, inputRoom, inputBuilding);
            enqueueSnackbar(res, { variant: "success", preventDuplicate: true });
            handleCloseModal();
            setIsChange(true);
            // window.location.reload();
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
                        id="MACAddress"
                        label="MAC Address"
                        type="text"
                        fullWidth
                        value={MACAddress}
                        onChange={handleMACAddressChange}
                    />
                    <TextField
                        margin="dense"
                        id="room"
                        label="Room"
                        type="text"
                        fullWidth
                        value={inputRoom}
                        onChange={handleRoomChange}
                    />
                    <TextField
                        margin="dense"
                        id="building"
                        label="Building"
                        type="text"
                        fullWidth
                        value={inputBuilding}
                        onChange={handleBuildingChange}
                    />
                </DialogContent>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCloseModal}>Hủy</Button>
                <Button type="submit" onClick={handleEditDevice}>Sửa</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}
