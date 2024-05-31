import React from "react";
import TextField from '@mui/material/TextField';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

const labelText = {
    password: "Mật khẩu",
    confirmPassword: "Xác nhận mật khẩu",
};

function PasswordInput({ label, value, status, action }) {

    const [isShowPassword, setIsShowPassword] = React.useState(false);

    const handleShowPassword = (e) => {
        setIsShowPassword(!isShowPassword);
    }

    return (
        <>
            <label>{labelText[label]} {<span style={{color: "red"}}>*</span>}</label>
            <TextField
                className="input"
                id={`input-${label}`}
                name={label}
                variant="outlined"  
                defaultValue={value}
                type = {isShowPassword ? "text" : "password"}
                InputProps={{
                    readOnly: status,
                    style: { fontSize: '18px' },
                    endAdornment: isShowPassword ? <IoEyeOffOutline onClick= {handleShowPassword}/> : <IoEyeOutline onClick={handleShowPassword}/> 
                }}
                onChange={action}
            />
        </>
    );
}

export default PasswordInput;