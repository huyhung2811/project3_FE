import { createContext, useContext } from 'react';
import { useState, useEffect } from 'react';
import { userApi } from '../../services/apis/UserApi';
import { getLocalItem, setLocalItem } from '../LocalStorage';

const PermissionContext = createContext(null);

export function PermissionProvider({ children }) {
  const [permissions, setPermissions] = useState();
  const role = getLocalItem('role');
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (role) {
          const res = await userApi.getUserPermissions();
          setPermissions(res);
          setLocalItem('permissions', res);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();

  },[role]);

  return (
    <PermissionContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionContext.Provider>
  );
}

export function usePermission() {
  return useContext(PermissionContext);
}
