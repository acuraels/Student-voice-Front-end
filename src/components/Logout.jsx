import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        if (localStorage.getItem('user_role') == 'teacher') {
            localStorage.removeItem('user_id');
        }
        localStorage.removeItem('user_role');
        navigate('/login');
    }, [navigate]);

    return null;
}

export default Logout;