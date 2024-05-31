import React from 'react';
import Button from '@mui/material/Button';
import { FaEdit } from "react-icons/fa";
import { HiUserAdd } from "react-icons/hi";

export function CancelButton({ action }) {
    return (
        <Button variant='outlined' size="medium" sx={{ fontWeight: 'bold', color: 'red', borderColor: 'red' }} onClick={action}>
            Cancel
        </Button>
    );
}

export function EditButton({action}) {
    return (
        <Button variant='outlined' size="medium" endIcon={<FaEdit />} sx={{ fontWeight: 'bold' }} onClick={action}>
            Sửa
        </Button>
    );
}

export function CreateButton({action}) {
    return (
        <Button variant='outlined' size="medium" endIcon={<HiUserAdd />} sx={{ fontWeight: 'bold' }} onClick={action}>
            Tạo mới
        </Button>
    );
}