import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import "./Students.css";
import StudentDetailsModal from './StudentDetailsModal';

export default function ClassStudents({ students }) {

    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [selectedStudent, setSelectedStudent] = React.useState(null);

    const handleStudentClick = (student) => {
        setSelectedStudent(student);
        setIsModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedStudent(null);
    }

    return (
        <>
            {students && <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                {students.map((student, index) => {
                    return (
                        <Grid item xs={3} key={index}>
                            <Card className="student-card" onClick={() => handleStudentClick(student.student_code)}>
                                <Avatar className="student-avatar" src={student.avatar} />
                                <Typography variant="div" className="student-title">
                                    <p>{student.name}</p>
                                    <p>{student.student_code}</p>
                                </Typography>
                            </Card>
                        </Grid>
                    );
                })}
            </Grid>}
            {selectedStudent && <StudentDetailsModal isOpen={isModalOpen} handleClose={handleCloseModal} studentCode={selectedStudent} />}
        </>
    );
}