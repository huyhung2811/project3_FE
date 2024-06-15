import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { profileAPI } from '../../services/apis/ProfileApi'

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  const [countNotifications, setCountNotifications] = useState(null);
  const [isHasNotifications, setIsHasNotifications] = useState(false);
  useEffect(() => {
      const fetchData = async () => {
        try {
            const res = await profileAPI.get();
            setProfile(res);
            setCountNotifications(res.notifications);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
  }, [isHasNotifications]);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, countNotifications, setCountNotifications, setIsHasNotifications }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
