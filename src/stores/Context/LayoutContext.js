import { createContext, useContext } from 'react';
import { useState } from 'react';

const LayoutContext = createContext(null);

export function LayoutProvider({ children }) {
    const [showSidebar, setShowSidebar] = useState(true);

    return (
        <LayoutContext.Provider value={{ showSidebar, setShowSidebar }}>
            {children}
        </LayoutContext.Provider>
    );
}

export function useLayout() {
    return useContext(LayoutContext);
}
