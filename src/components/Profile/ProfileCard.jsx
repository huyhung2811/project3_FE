import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { CardHeader, Grid } from '@mui/material';
import { useProfile } from '../../stores/Context/ProfileContext';
import TextInput from '../Common/Input/TextInput';
import { FaEdit } from "react-icons/fa";
import { Badge } from '@mui/material';
import { MdCameraAlt } from "react-icons/md";
import { CancelButton, EditButton } from '../Common/Button/Button';
import { profileAPI } from '../../services/apis/ProfileApi';
import { useSnackbar } from "notistack";
import { DefaultAvatar } from '../../assets';

function ProfileCard({ isEdit }) {
    const profile = useProfile().profile;
    const setProfile = useProfile().setProfile;
    const navigate = useNavigate();
    const [data, setData] = React.useState({
        phone: profile.phone,
        address: profile.address,
        home_town: profile.home_town,
        avatar: '',
    });
    const inputAvatarRef = React.useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const handleRedirect = (path) => {
        navigate(path);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleAvatarChange = (e) => {
        inputAvatarRef.current.click();
    }

    const handleAvatarInput = (e) => {
        const file = e.target.files[0];
        setData((prev) => ({
            ...prev,
            avatar: file
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await profileAPI.update(data);
            setProfile(res.data);
            enqueueSnackbar('Sửa thành công!', { variant: "success", preventDuplicate: true });
            navigate("/profile");
        } catch (err) {
            console.error(err);
            enqueueSnackbar(err.message, { variant: "error", preventDuplicate: true });
        }
    }

    return (
        <Card className='card profile' >
            <CardHeader
                avatar={
                    isEdit ?
                        (
                            <Badge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                badgeContent={
                                    <>
                                        <MdCameraAlt onClick={handleAvatarChange} style={{ backgroundColor: 'white', width: 30, height: 30, borderRadius: '50%', padding: '2px', border: '2px solid #000', cursor: 'pointer' }} />
                                        <input
                                            ref={inputAvatarRef}
                                            multiple
                                            accept="image/*"
                                            className="input"
                                            name="avatar"
                                            id="input-avatar"
                                            onChange={handleAvatarInput}
                                            type="file"
                                            hidden
                                        />
                                    </>
                                }
                            >
                                <Avatar sx={{ width: '80px', height: '80px', border: '1px solid #000' }} src={data.avatar ? URL.createObjectURL(data.avatar) : (profile.avatar ? profile.avatar : DefaultAvatar)} />
                            </Badge>
                        ) : (
                            <Avatar sx={{ width: '80px', height: '80px', border: '1px solid #000' }} src={profile.avatar ? profile.avatar : DefaultAvatar} />
                        )
                }
                title={
                    <span style={{ fontSize: '30px', fontWeight: 'bold' }}>
                        {profile.name}
                    </span>
                }
                subheader={
                    <span style={{ fontSize: '20px' }}>
                        {profile.username}
                    </span>
                }
            />
            <CardContent sx={{ display: 'flex', justifyContent: "center", alignItems: 'center', flexDirection: "column" }}>
                <Grid container spacing={{ xs: 2 }} columns={{ xs: 2, sm: 4, md: 6 }}>
                    {Object.entries(profile).map(([key, value], index) => {
                        if (key !== 'avatar') {
                            return (
                                <Grid item xs={6} md={3} key={index}>
                                    {
                                        isEdit ?
                                            ((key === 'address' || key === 'home_town' || key === 'phone') ?
                                                <TextInput label={key} value={value} status={!isEdit} action={handleInputChange} /> :
                                                <TextInput label={key} value={value} status={isEdit} action={handleInputChange} />)
                                            : <TextInput label={key} value={value} status={!isEdit} action={handleInputChange} />   
                                    }
                                </Grid>
                            );
                        }
                        return null;
                    })}
                </Grid>
            </CardContent>
            <CardActions sx={{ float: 'right', margin: '10px' }}>
                {isEdit ?
                    (
                        <>
                            <CancelButton action={() => handleRedirect('/profile')} />
                            <EditButton action={handleSubmit} />
                        </>
                    ) :
                    (
                        <Button variant='outlined' size="medium" endIcon={<FaEdit />} sx={{ fontWeight: 'bold' }} onClick={() => handleRedirect("/profile/edit")}>
                            Sửa Profile
                        </Button>
                    )
                }
            </CardActions>
        </Card >
    );
}

export default ProfileCard;