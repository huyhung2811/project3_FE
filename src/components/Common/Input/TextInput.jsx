import React from "react";
import TextField from '@mui/material/TextField';

const labelText = {
    student_code: 'Mã sinh viên',
    name: "Tên",
    email: "Email",
    phone: "Số điện thoại",
    birth_date: "Ngày sinh",
    address: "Địa chỉ",
    home_town: "Quê quán",
    student_class: "Lớp sinh viên",
    class_name: "Lớp sinh viên",
    system: "Hệ",
    unit: "Khoa/Viện",
    teacher_code: "Mã giáo viên",
};

function TextInput({ label, value, status, action }) {
    return (
        <>
            <label>{labelText[label]}{ !status && (['home_town', 'address', 'phone'].includes(label)) &&<span style={{color: "red"}}> * </span>}</label>
            <TextField
                className="input"
                id={`input-${label}`}
                name={label}
                disabled = {status}
                variant="outlined"
                defaultValue={value}
                InputProps={{
                    readOnly: status,
                    style: { fontSize: '18px' }
                }}
                onChange={action}
            />
        </>
    );
}

export default TextInput;