import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { TableHeaderStudent, TableHeaderTeacher, TableHeaderCourse, TableHeaderCourseClass } from "./TableHeader";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
const tableType = {
    "student": <TableHeaderStudent />,
    "teacher": <TableHeaderTeacher />,
    "course": <TableHeaderCourse />,
    "course-class": <TableHeaderCourseClass />
}

export function SearchResultStudentTable({ value, error, type }) {
    console.log(type)
    return (
        <div style={{ marginTop: "10px" }}>
            {value && <Table sx={{ minWidth: 650, width: "100%" }} aria-label="result table">
                {tableType[type]}
                <TableBody>
                    {value.map((result, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left"> <Avatar sx={{ width: '40px', height: '40px', border: '1px solid #000' }} src={result.avatar} /></TableCell>
                            <TableCell align="left">{result.name}</TableCell>
                            <TableCell align="left">{result.student_code}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export function SearchResultTeacherTable({ value, error, type }) {
    console.log(type)
    return (
        <div style={{ marginTop: "10px" }}>
            {value && <Table sx={{ minWidth: 650, width: "100%" }} aria-label="result table">
                {tableType[type]}
                <TableBody>
                    {value.map((result, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left"> <Avatar sx={{ width: '40px', height: '40px', border: '1px solid #000' }} src={result.avatar} /></TableCell>
                            <TableCell align="left">{result.name}</TableCell>
                            <TableCell align="left">{result.teacher_code}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export function SearchResultCourseTable({ value, error, type }) {
    console.log(type)
    return (
        <div style={{ marginTop: "10px" }}>
            {value && <Table sx={{ minWidth: 650, width: "100%" }} aria-label="result table">
                {tableType[type]}
                <TableBody>
                    {value.map((result, index) => (
                        <TableRow
                            key={index}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {index + 1}
                            </TableCell>
                            <TableCell align="left">{result.course_code}</TableCell>
                            <TableCell align="left">{result.name}</TableCell>
                            <TableCell align="left">{result.type}</TableCell>
                            <TableCell align="left">{result.number_of_credit}</TableCell>
                            <TableCell align="left">
                                {result.systems.map((system) => {
                                    return <p>{system.name}</p>
                                })}
                            </TableCell>
                            <TableCell align="left">
                                {result.classes.map((courseClass) => {
                                    return <Link to={`/course-class/${courseClass.class_code}`} style={{
                                        marginRight: "10px",
                                        backgroundColor: "#2c98f0",
                                        color: "white",
                                        padding: "5px 10px",
                                        borderRadius: "5px",
                                        textDecoration: "none"
                                    }}
                                        title="Xem chi tiết">
                                        {courseClass.class_code}
                                    </Link>
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}

export function SearchResultCourseClassTable({ value, error, type }) {
    console.log(type)
    return (
        <div style={{ marginTop: "10px" }}>
            {value && <Table sx={{ minWidth: 650, width: "100%" }} aria-label="result table">
                {tableType[type]}
                <TableBody>
                    <TableRow
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                        <TableCell component="th" scope="row">
                            {1}
                        </TableCell>
                        <TableCell align="left">{value.class_code}</TableCell>
                        <TableCell align="left">{value.course_code}</TableCell>
                        <TableCell align="left">{value.name}</TableCell>
                        <TableCell align="left">{value.teacher_name}</TableCell>
                        <TableCell align="left">{value.type}</TableCell>
                        <TableCell align="left">
                            {value.systems.map((system) => {
                                return <p>{system.name}</p>
                            })}
                        </TableCell>
                        <TableCell align="left">{value.education_format}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
