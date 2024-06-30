import * as React from 'react';
import PropTypes from 'prop-types';
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
import { Avatar } from "@mui/material";
import FormControl from '@mui/material/FormControl';
import { dayOffRequestApi } from '../../../services/apis/DayOffRequestApi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../../stores/Context/ProfileContext';
import Button from '@mui/material/Button';
import { MdAdd } from "react-icons/md";
import RequestCreateModal from '../../../components/DayOff/RequestCreateModal';

const headCells = [
    {
        id: 'id',
        label: 'ID',
    },
    {
        id: 'student_avatar',
        label: 'Avatar',
    },
    {
        id: 'student_name',
        label: 'Tên người gửi',
    },
    {
        id: 'class',
        label: 'Lớp',
    },
    {
        id: 'day',
        label: 'Ngày nghỉ',
    },
    {
        id: 'reason',
        label: 'Lý do',
    },
    {
        id: 'status',
        label: 'Trạng thái',
    },
];

const getStatusColor = (status) => {
    switch (status) {
        case 'Duyệt':
            return '#58cc02';
        case 'Chờ duyệt':
            return 'yellow';
        case 'Từ chối':
            return 'red';
        default:
            return 'black';
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

function EnhancedTableToolbar() {
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const handleOpenModal = () => {
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

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
                Yêu cầu xin nghỉ
            </Typography>
            <Tooltip title="Tạo yêu cầu mới">
                <Button variant="contained" style={{backgroundColor: '#2c98f0', width:"120px"}} endIcon={<MdAdd />} onClick={handleOpenModal}>
                    Tạo mới
                </Button>
                <RequestCreateModal isOpen={isModalOpen} handleClose={handleCloseModal}/>
            </Tooltip>
        </Toolbar>
    );
}

export default function StudentRequestDayOffList() {
    const [order, setOrder] = React.useState('asc');
    const [page, setPage] = React.useState(0);
    const [tableDatas, setTableDatas] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [date, setDate] = React.useState(() => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        return currentDate;
    });
    const navigate = useNavigate();
    const value = useProfile();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.getTeacherNotifications();
                setTableDatas(res);
                console.log(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [page, date]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const visibleRows = React.useMemo(
        () =>
            tableDatas ? tableDatas.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ) : [],
        [page, rowsPerPage, tableDatas],
    );

    const handleRequestClick = (event, requestId, isRead) => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.changeIsReadRequest(requestId);
                if (isRead === "0") {
                    value.setCountNotifications(value.countNotifications - 1);
                }
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
        navigate(`/request-day-off/${requestId}`);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
                <EnhancedTableToolbar />
                <TableContainer>
                    <Table
                        sx={{ minWidth: 750, p: 5 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            order={order}
                            rowCount={tableDatas && tableDatas.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => {
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <Tooltip title="Click để xem chi tiết" arrow placement="top">
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.class_code}
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    fontWeight: 'bold',
                                                    backgroundColor: '#f5f5f5',
                                                },
                                            }}
                                            onClick={(event) => handleRequestClick(event, row.id, row.is_read)}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                align="left"
                                            >
                                                {row.id}
                                            </TableCell>
                                            <TableCell align="left"><Avatar sx={{ width: '40px', height: '40px', border: '1px solid #000' }} src={row.student_avatar} /></TableCell>
                                            <TableCell align="left">{row.student_name}</TableCell>
                                            <TableCell align="left">{row.class_code} - {row.class_name}</TableCell>
                                            <TableCell align="left">{row.day}</TableCell>
                                            <TableCell align="left">{row.reason}</TableCell>
                                            <TableCell align="center"><p style={{ backgroundColor: getStatusColor(row.status), padding: '0px 5px', borderRadius: '3px', }}>{row.status}</p></TableCell>
                                        </TableRow>
                                    </Tooltip>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={tableDatas && tableDatas.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
