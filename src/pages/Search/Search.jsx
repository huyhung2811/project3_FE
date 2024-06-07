import React from "react";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import SearchInput from "../../components/Common/Input/SearchInput";
import { searchApi } from "../../services/apis/SearchApi";
import {SearchResultStudentTable, SearchResultTeacherTable, SearchResultCourseTable, SearchResultCourseClassTable} from "../../components/Search/SearchResultTable";

const defaultValues = {
    "student": "Họ và tên / MSSV",
    "teacher": "Họ và tên",
    "course": "IT1234",
    "course_class": "123456"
};

const currentTab = {
    "student": 1,
    "teacher": 2,
    "course": 3,
    "course-class": 4,
};

const data = {
    "students": 1,
    "teachers": 2,
    "course": 3,
}

const getLabelByValue = (value) => {
    for (let key in currentTab) {
        if (currentTab[key] === parseInt(value)) {
            return key;
        }
    }
    return null;
};

export default function Search() {
    const [value, setValue] = React.useState('1');
    const [searchInput, setSearchInput] = React.useState(defaultValues[getLabelByValue('1')]);
    const [searchResult, setSearchResult] = React.useState();
    const [error, setError] = React.useState();

    const handleSearchInputChange = (e) => {
        setSearchInput(e.target.value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSearchResult(null);
        setError(null);
        setSearchInput(defaultValues[getLabelByValue(newValue)]);
    };

    const handleSubmit = () => {
    
        const fetchData = async () => {
            try {
                setError(null);
                const type = getLabelByValue(value);
                const res = await searchApi.getResult(searchInput, type);
                if(value === "1"){
                    setSearchResult(res.students);
                }
                if(value === "2"){
                    setSearchResult(res.teachers);
                }
                if(value === "3"){
                    setSearchResult(res.course);
                }
                if(value ==="4"){
                    setSearchResult(res);
                }
            } catch (err) {
                console.error(err.message);
                setSearchResult(null);
                setError(err.message);
            }
        };

        if (searchInput) {
            fetchData();
        }
    }

    console.log(searchResult);

    return (
        <Card style={{ width: "96%" }}>
            <CardHeader
                title={
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                        Tìm kiếm
                    </span>
                }
            />
            <CardContent>
                <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                            <Tab label="Sinh viên" value="1" />
                            <Tab label="Giáo viên" value="2" />
                            <Tab label="Học phần" value="3" />
                            <Tab label="Lớp học phần" value="4" />
                        </TabList>
                    </Box>
                    <TabPanel value="1">
                        <SearchInput handleSearchInputChange={handleSearchInputChange} defaultValue={defaultValues.student} handleSubmit={handleSubmit} />
                        {(searchResult || error) && <SearchResultStudentTable value={searchResult} error={error} type={getLabelByValue(value)} />}
                    </TabPanel>
                    <TabPanel value="2">
                        <SearchInput handleSearchInputChange={handleSearchInputChange} defaultValue={defaultValues.teacher} handleSubmit={handleSubmit} />
                        {(searchResult || error) && <SearchResultTeacherTable value={searchResult} error={error} type={getLabelByValue(value)} />}
                    </TabPanel>
                    <TabPanel value="3">
                        <SearchInput handleSearchInputChange={handleSearchInputChange} defaultValue={defaultValues.course} handleSubmit={handleSubmit} />
                        {(searchResult || error) && <SearchResultCourseTable value={searchResult} error={error} type={getLabelByValue(value)} />}
                    </TabPanel>
                    <TabPanel value="4">
                        <SearchInput handleSearchInputChange={handleSearchInputChange} defaultValue={defaultValues.course_class} handleSubmit={handleSubmit} />
                        {(searchResult || error) && <SearchResultCourseClassTable value={searchResult} error={error} type={getLabelByValue(value)} />}
                    </TabPanel>
                </TabContext>
            </CardContent>
        </Card>
    );
}
