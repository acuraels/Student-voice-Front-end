import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '.././styles/headerAdmin.css';

const HeaderAdmin = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        navigate('/login');
    };

    return (
        <header className="admin-header">
            <div className="admin-header__container">
                <div className="admin-header__container-left">
                    <Link to="/admin-users" className="admin-header__logo">Student voice</Link>
                    <Link to="/admin-report" className="btn-report">Отчёт</Link>
                </div>
                <div className="admin-header__container-right">
                    <div className="admin-header__container-links">
                        <Link to="/admin-users" className="admin-header__users">Пользователи</Link>
                    </div>
                    <div className="admin-header__container-imgs">
                        <Link to="/admin-settings">
                            <img src="/settings.svg" alt="Настройки" />
                        </Link>
                        <a onClick={handleLogout} className="admin-header__logout-button">
                            <img src="/signout.svg" alt="Выйти" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
