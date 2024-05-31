import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { CardHeader } from '@mui/material';
import "../UserManager/UserLoginHistories/HistoriesCard.css";
import LoginDatePicker from '../UserManager/UserLoginHistories/LoginDatePicker';
import dayjs from 'dayjs';
import { profileAPI } from '../../services/apis/ProfileApi';
import DividerDate from '../UserManager/UserLoginHistories/DividerDate';
import { styled } from '@mui/material/styles';

const Root = styled('div')(({ theme }) => ({
    width: '100%',
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    '& > :not(style) ~ :not(style)': {
        marginTop: theme.spacing(2),
    },
}));

export default function LoginHistoriesCard() {
    const [data, setData] = React.useState({
        startDate: dayjs().subtract(2, 'day'),
        endDate: dayjs(),
    });
    const [loginHistories, setLoginHistories] = React.useState();
    const [error, setError] = React.useState();

    React.useEffect(() => {
        profileAPI.getLoginHistories(data)
            .then(res => {
                const groupedHistories = groupByDate(res);
                setLoginHistories(groupedHistories);
            })
            .catch(err => {
                setError(err.message);
            });
    }, [data]);

    const groupByDate = (histories) => {
        return histories.reduce((acc, history) => {
            const { login_date, login_time } = history;
            if (!acc[login_date]) {
                acc[login_date] = [];
            }
            acc[login_date].push(login_time);
            return acc;
        }, {});
    };

    return (
        <Card className='card login-histories' >
            <CardHeader
                title={
                    <div style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                            Lịch sử đăng nhập
                        </span>
                        <LoginDatePicker data={data} setData={setData} />   
                    </div>
                }
            />
            <CardContent sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column", padding: '20px'}}>
                <Root>
                    {
                        loginHistories && Object.keys(loginHistories).length > 0
                            ?
                            Object.keys(loginHistories).map((date) => (
                                <div key={date}>
                                    <DividerDate date={date} loginTimes={loginHistories[date]} />
                                </div>
                            ))
                            :
                            <p style={{ textAlign: "center", color: "red", fontSize: "18px" }}>
                                {error ? error : "Không tồn tại lịch sử đăng nhập"}
                            </p>
                    }
                </Root>
            </CardContent>
        </Card >
    );
}