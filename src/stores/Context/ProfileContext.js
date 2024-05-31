import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { profileAPI } from '../../services/apis/ProfileApi'

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
      const fetchData = async () => {
        try {
            const res = await profileAPI.get();
            setProfile(res);
        } catch (err) {
          console.error(err);
        }
      };

      fetchData();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfile() {
  return useContext(ProfileContext);
}
