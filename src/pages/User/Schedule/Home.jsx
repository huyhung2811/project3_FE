import React from "react";
import "./Home.css";
import Schedule from "../../../components/Schedule/Schedule";
import UserManager from "../../Admin/UserManager/UserManager";
import { getLocalItem } from "../../../stores/LocalStorage";

function Home() {
    
    return (
        getLocalItem('role') === 'admin' ? <UserManager/> : <Schedule/>
    );
}

export default Home;