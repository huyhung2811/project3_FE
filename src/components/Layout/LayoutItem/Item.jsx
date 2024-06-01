import React from 'react';
import { useLocation } from 'react-router-dom';

export function Item({ item, action }) {
    const location = useLocation();
    const pathName = location.pathname;

    return (
        <div className={`wrapper-${item.type}-item ${pathName === item.path ? 'active' : ''}`} onClick={action}>
            {item.icon}
            <p>{item.name}</p>
        </div>
    );
}
