import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { CardActions } from '@mui/material';
import Button from '@mui/material/Button';
import { dayOffRequestApi } from '../../services/apis/DayOffRequestApi';
import { useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { getLocalItem } from '../../stores/LocalStorage';

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

export default function DayOffDetail() {
    const [details, setDetails] = React.useState(null);
    const [isChange, setIsChange] = React.useState(false);
    const { id } = useParams();
    const { enqueueSnackbar } = useSnackbar();
    const handleReject = () => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.changeRequestStatus(id,"Từ chối");
                enqueueSnackbar('Từ chối thành công', { variant: "success", preventDuplicate: true });
                setIsChange(!isChange);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    const handleAccept = (id) => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.changeRequestStatus(id,"Duyệt");
                enqueueSnackbar('Duyệt thành công', { variant: "success", preventDuplicate: true });
                setIsChange(!isChange);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }

    React.useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await dayOffRequestApi.showRequestDetails(id);
                setDetails(res);
                console.log(res);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [id,isChange]);

    return (
        details && (
            <Card style={{ width: "96%", padding: "20px" }}>
                <CardHeader
                    title={
                        <Typography variant="h5" style={{ fontWeight: 'bold' }}>
                            Chi tiết yêu cầu
                        </Typography>
                    }
                />
                <CardContent>
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={6}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Tên lớp
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.class_name}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Mã lớp
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.class_code}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Mã học phần
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.course_code}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Thời gian học
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.day} | {details.start_time} - {details.end_time}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Người gửi
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.student_name}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Mã sinh viên
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.student_code}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Lý do
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.reason}
                                </Grid>
                            </Grid>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Thời gian tạo
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    {details.created_time}
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'column' }}>
                            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                    Trạng thái
                                </Grid>
                                <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                    <p style={{ backgroundColor: getStatusColor(details.status), padding: '0px 5px', borderRadius: '3px', }}>{details.status}</p>
                                </Grid>
                            </Grid>
                            {details.status !== "Chờ duyệt" &&<>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                        Người duyệt
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        {details.teacher_name}
                                    </Grid>
                                </Grid>
                                <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ margin: '5px' }}>
                                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', fontWeight: 'bold' }}>
                                        Thời gian duyệt
                                    </Grid>
                                    <Grid item xs={6} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>

                                    </Grid>
                                </Grid>
                            </>}
                        </Grid>
                    </Grid>
                </CardContent>
                {(details.status === "Chờ duyệt" && getLocalItem('role') === 'teacher') && <CardActions style={{ display: 'flex', flexDirection: 'row', justifyContent: 'end' }}>
                    <Button size="medium" variant="outlined" color="error" onClick={()=>handleReject(details.id)}>Từ chối</Button>
                    <Button size="medium" variant="outlined" onClick={()=>handleAccept(details.id)}>Duyệt</Button>
                </CardActions>}
            </Card>
        )
    );
}
