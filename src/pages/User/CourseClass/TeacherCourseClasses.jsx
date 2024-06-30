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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { courseClassApi } from '../../../services/apis/CourseClassApi';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'class_code',
        label: 'Mã lớp',
    },
    {
        id: 'name',
        label: 'Tên',
    },
    {
        id: 'course_code',
        label: 'Mã học phần',
    },
    {
        id: 'room',
        label: 'Phòng',
    },
    {
        id: 'school_day',
        label: 'Ngày học',
    },
    {
        id: 'time',
        label: 'Thời gian học',
    },
];

function EnhancedTableHead(props) {
    const { order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

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

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

function EnhancedTableToolbar({ semester, handleSemesterChange }) {
    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h4"
                id="tableTitle"
                component="div"
            >
                Lớp học phần trong kỳ
            </Typography>
            <FormControl variant="outlined" sx={{ width: '200px', minWidth: 120, display: 'flex', justifyContent: 'end', flexDirection: 'row', alignItems: 'center' }}>
                <p style={{ width: "100px" }}>Học kỳ: </p>
                <Select
                    value={semester}
                    onChange={handleSemesterChange}
                    style={{ width: '100%', height: '30px' }}
                >
                    <MenuItem value={'2022.1'}>2022.1</MenuItem>
                    <MenuItem value={'2022.2'}>2022.2</MenuItem>
                    <MenuItem value={'2022.3'}>2022.3</MenuItem>
                    <MenuItem value={'2023.1'}>2023.1</MenuItem>
                    <MenuItem value={'2023.2'}>2023.2</MenuItem>
                    <MenuItem value={'2023.3'}>2023.3</MenuItem>
                </Select>
            </FormControl>
            <Tooltip title="Filter list">
                <IconButton>
                </IconButton>
            </Tooltip>
        </Toolbar>
    );
}

EnhancedTableToolbar.propTypes = {
    semester: PropTypes.string.isRequired,
    handleSemesterChange: PropTypes.func.isRequired,
};

const dateSemester = {
    '2022.1': "2022-10-05",
    '2022.2': "2023-03-20",
    '2022.3': "2023-08-01",
    '2023.1': "2023-09-11",
    '2023.2': "2024-02-19",
}

export default function TeacherCourseClasses() {
    const [order, setOrder] = React.useState('asc');
    const [page, setPage] = React.useState(0);
    const [tableDatas, setTableDatas] = React.useState([]);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [date, setDate] = React.useState(() => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        return currentDate;
    });
    const [semester, setSemester] = React.useState('');
    const navigate = useNavigate();

    const handleSemesterChange = (event) => {
        console.log(dateSemester[event.target.value]);
        setDate(dateSemester[event.target.value]);
    };

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await courseClassApi.getTeacherCourseClasses(date);
                setSemester(res.semester);
                const newTableDatas = res.course_classes.map(data => ({
                    class_code: data.class_code,
                    name: data.name,
                    course_code: data.course_code,
                    room: data.room ? data.room : "Không",
                    school_day: data.school_day ? data.school_day : "Không",
                    time: data.start_time ? data.start_time + " - " + data.end_time : "Không",
                }));
                setTableDatas(newTableDatas);
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
            tableDatas ? stableSort(tableDatas, getComparator(order)).slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage,
            ) : [],
        [order, page, rowsPerPage, tableDatas],
    );

    const handleClassClick = (event, class_code) => {
        const currentDate = dayjs().format('YYYY-MM-DD');
        navigate(`/course-class/${class_code}/${currentDate}`);
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, p: 2 }}>
                <EnhancedTableToolbar
                    semester={semester}
                    handleSemesterChange={handleSemesterChange}
                />
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
                                            onClick={(event) => handleClassClick(event, row.class_code)}
                                        >
                                            <TableCell
                                                component="th"
                                                id={labelId}
                                                scope="row"
                                                padding="none"
                                            >
                                                {row.class_code}
                                            </TableCell>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.course_code}</TableCell>
                                            <TableCell align="left">{row.room}</TableCell>
                                            <TableCell align="left">{row.school_day}</TableCell>
                                            <TableCell align="left">{row.time}</TableCell>
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
