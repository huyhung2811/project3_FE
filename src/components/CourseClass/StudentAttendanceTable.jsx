import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function StudentAttendanceTable({attendances}) {
    return (
        <Table sx={{ minWidth: 650, width: "100%" }} aria-label="attendance table">
            <TableHead>
                <TableRow>
                    <TableCell>STT</TableCell>
                    <TableCell align="left">Ngày</TableCell>
                    <TableCell align="left">Start Time</TableCell>
                    <TableCell align="left">End Time</TableCell>
                    <TableCell align="left">Trạng thái</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {attendances.map((attendance, index) => (
                    <TableRow
                        key={attendance.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {index + 1}
                        </TableCell>
                        <TableCell align="left">{attendance.day}</TableCell>
                        <TableCell align="left">{attendance.start_time}</TableCell>
                        <TableCell align="left">{attendance.end_time}</TableCell>
                        <TableCell align="left">{attendance.status}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}