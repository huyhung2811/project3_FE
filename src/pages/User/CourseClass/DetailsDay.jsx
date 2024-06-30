import React from 'react';
import { useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import {AttendanceTab, AttendanceTabDay } from '../../components/CourseClass/ClassAttendance';
import { commonApi } from '../../services/apis/CommonApi';
import DetailsTab from '../../components/CourseClass/DetailsTab';
import ClassStudents from '../../components/CourseClass/Students';
import { getLocalItem } from '../../stores/LocalStorage';

export function CourseClassDetailsDay() {
    const { classCode, date } = useParams();
    const [value, setValue] = React.useState('1');
    const [courseClassDetails, setCourseClassDetails] = React.useState();
    const role = getLocalItem('role');
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await commonApi.getCourseClassDetails(classCode);
                let details = res;
                if(role === 'teacher'){
                    delete details.number_of_absenses
                }
                setCourseClassDetails(details);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [classCode]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card style={{ width: "96%" }}>
            <CardHeader
                title={
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                        Chi tiết lớp {classCode}
                    </span>
                }
            />
            <CardContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Thông tin chi tiết" value="1" />
                            <Tab label="Điểm danh" value="2" />
                            <Tab label={courseClassDetails && `Sinh viên lớp (${courseClassDetails.students.length})`} value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {courseClassDetails && <DetailsTab courseClassDetails={courseClassDetails} />}
                    </TabPanel>
                    <TabPanel value="2">
                        <AttendanceTabDay classCode={classCode} day = {date}/>
                    </TabPanel>
                    <TabPanel value="3">
                        {courseClassDetails && <ClassStudents students={courseClassDetails.students} />}
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
}

export function CourseClassDetails() {
    const { classCode} = useParams();
    const [value, setValue] = React.useState('1');
    const [courseClassDetails, setCourseClassDetails] = React.useState();
    const role = getLocalItem('role');
    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await commonApi.getCourseClassDetails(classCode);
                let details = res;
                if(role === 'teacher'){
                    delete details.number_of_absenses
                }
                setCourseClassDetails(details);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [classCode]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Card style={{ width: "96%" }}>
            <CardHeader
                title={
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                        Chi tiết lớp {classCode}
                    </span>
                }
            />
            <CardContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Thông tin chi tiết" value="1" />
                            <Tab label="Điểm danh" value="2" />
                            <Tab label={courseClassDetails && `Sinh viên lớp (${courseClassDetails.students.length})`} value="3" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        {courseClassDetails && <DetailsTab courseClassDetails={courseClassDetails} />}
                    </TabPanel>
                    <TabPanel value="2">
                        <AttendanceTab classCode={classCode}/>
                    </TabPanel>
                    <TabPanel value="3">
                        {courseClassDetails && <ClassStudents students={courseClassDetails.students} />}
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
}