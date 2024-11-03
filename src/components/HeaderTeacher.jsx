import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '.././styles/headerTeacher.css';

const HeaderTeacher = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user_role');
        navigate('/login');
    };

    return (
        <header className="teacher-header">
            <div className="teacher-header__container">
                <div className="teacher-header__container-left">
                    <Link to="/teacher-lessons" className="teacher-header__logo">Student Voice</Link>
                </div>
                <div className="teacher-header__container-right">
                    <div className="teacher-header__container-links">
                        <Link to="/teacher-lessons" className="teacher-header__users">Пары</Link>
                        <Link to="/teacher-disciplines" className="teacher-header__institutions">Предметы</Link>
                    </div>
                    <div className="teacher-header__container-imgs">
                        <Link to="/teacher-settings">
                            <img src="/settings.svg" alt="Настройки" />
                        </Link>
                        <a onClick={handleLogout} className="teacher-header__logout-button">
                            <img src="/signout.svg" alt="Выйти" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderTeacher;
