import React from "react";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export function TableHeaderStudent() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Tên</TableCell>
                <TableCell align="left">MSSV</TableCell>
            </TableRow>
        </TableHead>
    );
}

export function TableHeaderTeacher() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="left">Avatar</TableCell>
                <TableCell align="left">Tên</TableCell>
                <TableCell align="left">Mã giáo viên</TableCell>
            </TableRow>
        </TableHead>
    );
}

export function TableHeaderCourse() {
    return (
        <TableHead>
            <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="left">Mã học phần</TableCell>
                <TableCell align="left">Tên học phần</TableCell>
                <TableCell align="left">Loại</TableCell>
                <TableCell align="left">Số tín</TableCell>
                <TableCell align="left">Hệ</TableCell>
                <TableCell align="left">Lớp trong kì</TableCell>
            </TableRow>
        </TableHead>
    );
}

export function TableHeaderCourseClass(){
    return (
        <TableHead>
            <TableRow>
                <TableCell>STT</TableCell>
                <TableCell align="left">Mã lớp</TableCell>
                <TableCell align="left">Mã học phần</TableCell>
                <TableCell align="left">Tên lớp</TableCell>
                <TableCell align="left">Giáo viên giảng dạy</TableCell>
                <TableCell align="left">Loại</TableCell>
                <TableCell align="left">Hệ</TableCell>
                <TableCell align="left">Hình thức giảng dạy</TableCell>
            </TableRow>
        </TableHead>
    );
}
