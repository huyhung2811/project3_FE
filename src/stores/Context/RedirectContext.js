import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const redirectContext = createContext(null);

export function RedirectProvider({children}){
    const navigate = useNavigate();
    
    const handleRedirect = (path) => {
        localStorage.removeItem('userData');
        localStorage.removeItem('userPage');
        navigate(path);
    }

    return (
        <redirectContext.Provider value={{handleRedirect}}>
            {children}
        </redirectContext.Provider>
    );
}

export function useRedirect() {
    return useContext(redirectContext);
}
