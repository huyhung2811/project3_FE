import React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import { studentApi } from '../../services/apis/StudentApi';
import DetailsTab from '../../components/CourseClass/Details/DetailsTab';
import ClassStudents from '../../components/CourseClass/Details/Students';

export default function StudentClass() {
    const [value, setValue] = React.useState('1');
    const [studentClass, setStudentClass] = React.useState();

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await studentApi.getStudentClass();
                setStudentClass(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    });

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        studentClass && <Card style={{ width: "96%" }}>
            <CardHeader
                title={
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                        Chi tiết lớp {studentClass.class_name}
                    </span>
                }
            />
            <CardContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Thông tin chi tiết" value="1" />
                            <Tab label={studentClass && `Sinh viên lớp (${studentClass.students.length})`} value="2" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {studentClass && <DetailsTab courseClassDetails={studentClass} />}
                    </TabPanel>
                    <TabPanel value="2">
                        {studentClass && <ClassStudents students={studentClass.students} />}
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
}