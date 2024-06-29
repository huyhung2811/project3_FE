import React from "react";
import './login.css';
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { Logo } from '../../assets';
import { AuthAPI } from "../../services/apis/AuthApi";
import { setLocalItem } from "../../stores/LocalStorage";
import { useSnackbar } from "notistack";

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState({
        email: '',
        password: '',
    });
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        document.title = 'Đăng nhập';
    }, []);

    const handleIconClick = (e) => {
        e.preventDefault();
        setShowPassword(!showPassword);
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
        setError({
            ...error,
            [name]: ''
        });
    }

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await AuthAPI.login(data)
            console.log(res);
            setLocalItem('token', res.token);
            setLocalItem('role', res.role);
            enqueueSnackbar('Đăng nhập thành công', { variant: "success", preventDuplicate: true });
            navigate("/");
        } catch (err) {
            enqueueSnackbar('Đăng nhập thất bại', { variant: "error", preventDuplicate: true });
            if (err.errors) {
                setError({
                    email: err.errors.email ? err.errors.email[0] : '',
                    password: err.errors.password ? err.errors.password[0] : '',
                });
            } else {
                setError({
                    ...error,
                    password: err.error,
                });
            }
            console.log(err);
        };
    }

    return (
        <div className="container">
            <div className="container-left">
                
            </div>
            <div className="container-right">
                <img className="logo" src={Logo} alt="logo" />
                <form onSubmit={handleLoginSubmit}>
                    <h1>Đăng nhập</h1>
                    <p>Bạn phải đăng nhập để sử dụng web</p>
                    <div className="wrapper-input">
                        <div className="input-box">
                            <input type="text" name="email" placeholder="Email" value={data.email} onChange={handleInputChange} />
                            <p className="error-message" id="error-email">{error.email}</p>
                        </div>
                        <div className="input-box">
                            <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={data.password} onChange={handleInputChange} /><br/>
                            {showPassword ? <IoEyeOffOutline className="icon" onClick={handleIconClick} /> : <IoEyeOutline className="icon" onClick={handleIconClick} />}
                            <p className="error-message" id="error-password">{error.password}</p>
                        </div>
                    </div>
                    <button type="submit">Đăng nhập</button>
                </form>
            </div>
        </div>
    );
}

export default Login;               