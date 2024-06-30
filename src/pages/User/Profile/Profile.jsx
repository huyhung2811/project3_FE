import React from 'react';
import ProfileCard from '../../../components/Profile/ProfileCard';
import { useProfile } from '../../../stores/Context/ProfileContext';
import "./Profile.css";
import Skeleton from '@mui/material/Skeleton';

function Profile() {
    const user = useProfile();

    return (
        <>
            <div className='profile background-img'></div>
            {user.profile ? (
                <ProfileCard isEdit={false} />
            ) : (
                <Skeleton variant="rectangular" style={{ display: 'flex', width: "92%", height: "492px", marginTop: '-100px', zIndex: 1, backgroundColor: 'white', borderRadius: '4px', marginBottom: '20px', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)' }}></Skeleton>
            )
            }
        </>
    );
}

export default Profile;