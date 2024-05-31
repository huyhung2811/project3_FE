import React from "react";
import "./Home.css";
import { getLocalItem } from "../../../stores/LocalStorage";

function Home() {
    
    return (
        <>
            {getLocalItem("role") === 'student' ? 'Student Home' : 'Teacher Home'}
        </>
    );
}

export default Home;