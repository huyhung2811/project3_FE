import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import { IoFilter } from "react-icons/io5";
import DeviceFilterPopper from '../../components/Device/DeviceFilterPopper';
import { deviceApi } from '../../services/apis/DeviceApi';
import { useSearchParams, useLocation } from 'react-router-dom';
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import ChangeDeviceModal from '../../components/Device/ChangeDeviceModal';
import { useSnackbar } from 'notistack';

const headCells = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'MAC_address',
        label: 'MAC Address',
    },
    {
        id: 'room_id',
        label: 'Phòng',
    },
    {
        id: 'updated_time',
        label: 'Thời gian cập nhật',
    },
    {
        id: 'status',
        label: 'Trạng thái',
    },
    {
        id: 'action',
        label: 'Hành động',
    }
];

const getStatusColor = (status) => {
    switch (status) {
        case 'active':
            return '#58cc02';
        case 'inactive':
            return 'red';
        default:
            return 'white';
    }
};

function EnhancedTableHead() {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={'left'}
                        sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

function EnhancedTableToolbar({ setSearchParams }) {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleOpenPopover = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopover = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'filter-popover' : undefined;

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%', fontWeight: 'bold' }}
                variant="h5"
                id="tableTitle"
                component="div"
            >
                Danh sách thiết bị
            </Typography>
            <Tooltip title="Bộ lọc">
                <IconButton onClick={handleOpenPopover} aria-describedby={id}>
                    <IoFilter />
                </IconButton>
                <DeviceFilterPopper anchorEl={anchorEl} handleClosePopover={handleClosePopover} id={id} open={open} setSearchParams={setSearchParams}/>
            </Tooltip>
        </Toolbar>
    );
}

export default function DeviceList() {
    const [page, setPage] = React.useState(0);
    const [tableDatas, setTableDatas] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [total, setTotal] = React.useState(0);
    const [searchParams, setSearchParams] = useSearchParams();
    const [error, setError] = React.useState(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [isChange, setIsChange] = React.useState(false);
    const [selectedDevice, setSelectedDevice] = React.useState(null);
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    React.useEffect(() => {
        setIsChange(false);
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', page + 1);
        setSearchParams(queryParams);
        const room = queryParams.get('room');
        const building = queryParams.get('building');
        const status = queryParams.get('status');
        const fetchData = async () => {
            try {
                const res = await deviceApi.getDevices(page, rowsPerPage, building, room, status);
                setTotal(res.total);
                setTableDatas(res.data);
            } catch (err) {
                console.error(err);
                setTotal(0);
                setTableDatas(null);
                setError(err.message);
            }
        };

        fetchData();
    }, [location.search, setSearchParams, page, rowsPerPage, isChange]);

    const handleChangePage = (event, newPage) => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', page + 1);
        setSearchParams(queryParams);
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        const queryParams = new URLSearchParams(location.search);
        queryParams.set('page', page + 1);
        setSearchParams(queryParams);
        setPage(0);
    };

    const handleOpenModal = (device) => {
        setSelectedDevice(device);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setSelectedDevice(null);
        setIsModalOpen(false);
    }

    const handleDeleteDevice = async (id) => {
        try {
            const res = await deviceApi.deleteDevice(id);
            enqueueSnackbar(res, { variant: "success", preventDuplicate: true });
            setIsChange(true);
        } catch (err) {
            enqueueSnackbar(err.response, { variant: "error", preventDuplicate: true });
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
                <EnhancedTableToolbar setSearchParams={setSearchParams}/>
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750, p: 5 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead />
                        <TableBody>
                            {tableDatas? tableDatas.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        tabIndex={-1}
                                        key={row.id}
                                        sx={{
                                            cursor: 'pointer',
                                            '&:hover': {
                                                fontWeight: 'bold',
                                                backgroundColor: '#f5f5f5',
                                            },
                                        }}
                                    >
                                        <TableCell
                                            component="th"
                                            id={labelId}
                                            scope="row"
                                            align="left"
                                        >
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="left">{row.MAC_address}</TableCell>
                                        <TableCell align="left">{row.room}</TableCell>
                                        <TableCell align="left">{row.updated_time}</TableCell>
                                        <TableCell align="left" style={{ width: "160px" }}><p style={{ backgroundColor: getStatusColor(row.status), padding: '0px 5px', borderRadius: '3px', color: "white" }}>{row.status === "active" ? "Hoạt động" : "Không hoạt động"}</p></TableCell>
                                        <TableCell align="left">
                                        <Tooltip title="Click để sửa">
                                                <IconButton onClick={() => handleOpenModal(row)}>
                                                    <CiEdit />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Click để xóa">
                                                <IconButton onClick={() => handleDeleteDevice(row.id)}>
                                                    <MdDelete />
                                                </IconButton>
                                            </Tooltip>
                                        </TableCell>
                                    </TableRow>
                                );
                            }) : <TableRow>
                            <td colSpan={6} style={{ textAlign: 'center'}}>
                                <p style={{ fontSize: '16px', color: 'red' }}>{error}</p>
                            </td>
                        </TableRow>}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={total ? total : 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            {selectedDevice && <ChangeDeviceModal isOpen={isModalOpen} handleClose={handleCloseModal} id={selectedDevice.id} MAC_address={selectedDevice.MAC_address} room={selectedDevice.room} setIsChange={setIsChange}/>}
        </Box>
    );
}
