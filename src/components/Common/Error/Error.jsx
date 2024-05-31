import React from 'react';

export default function ErrorPage({error}){
    console.log(error);
    return (
        <div style={{width: '100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            <p style={{fontSize:'20px', color:'red'}}>{error}</p>
        </div>
    );
}