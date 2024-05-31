import React from "react";
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

function GenderDropdown({value, status, action, isRequired}) {
    return (
        <>
            <label>Giới tính {isRequired && <span style={{color: "red"}}>*</span>} </label>
            <TextField
                className="input"
                id="input-gender"
                name="gender"
                select
                defaultValue= {value}
                InputProps={{
                    readOnly: status,
                    style: { fontSize: '18px' }
                }}
                variant="outlined"
                onChange={action}
            >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="male">Nam</MenuItem>
                <MenuItem value="female">Nữ</MenuItem>
            </TextField>
        </>
    );
}

export default GenderDropdown;