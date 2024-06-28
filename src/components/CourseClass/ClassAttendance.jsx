import React from 'react';
import { attendanceApi } from '../../services/apis/AttendanceApi';
import { getLocalItem } from '../../stores/LocalStorage';
import StudentAttendanceTable from './StudentAttendanceTable';
import ClassAttendanceByDayTable from './ClassAttendanceByDayTable';

export function AttendanceTabDay({ classCode, day }) {
    const [attendances, setAttendances] = React.useState([]);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                if (getLocalItem('role') === 'student') {
                    const res = await attendanceApi.getStudentAttendanceByDay(classCode, day);
                    setAttendances(res);
                } 
                if(getLocalItem('role') === 'teacher') {
                    const res = await attendanceApi.getClassAttendanceByDay(classCode, day);
                    setAttendances(res);
                }
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            }
        };
        fetchData();
    }, [classCode, day]);
    return (
        attendances && attendances.length > 0 ? (
            getLocalItem('role') === 'student' ? <StudentAttendanceTable attendances={attendances} /> : <ClassAttendanceByDayTable attendances={attendances} />
        ) : (
            <p style={{ color: "red" }}>{error}</p>
        )
    );
}

export function AttendanceTab({ classCode }) {
    const [attendances, setAttendances] = React.useState([]);
    const [error, setError] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await attendanceApi.getClassAttendance(classCode);
                setAttendances(res);
            } catch (err) {
                console.error(err.message);
                setError(err.message);
            }
        };
        fetchData();
    }, [classCode]);
    
    return (
        attendances.length > 0 ? (
            getLocalItem('role') === 'student' ? <StudentAttendanceTable attendances={attendances} /> : <ClassAttendanceByDayTable attendances={attendances} />
        ) : (
            <p style={{ color: "red" }}>{error}</p>
        )
    );
}