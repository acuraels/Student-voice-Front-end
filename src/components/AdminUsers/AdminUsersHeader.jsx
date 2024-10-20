import React from 'react';
import '../.././styles/AdminUsers/adminUsersHeader.css';

const AdminUsersHeader = () => {
    return (
        <header className="admin-header">
            <div className="admin-header__container">
                <div className="admin-header__container-left">
                    <a href="#" className="admin-header__logo">Student voice</a>
                    <a href="#" className="btn-report">Отчёт</a>
                </div>
                <div className="admin-header__container-right">
                    <div className="admin-header__container-links">
                        <a href="#" className="admin-header__users">Пользователи</a>
                        <a href="#" className="admin-header__institutions">Институты</a>
                    </div>
                    <div className="admin-header__container-imgs">
                        <a href="">
                            <img src="/settings.svg" alt="" />
                        </a>
                        <a href="">
                            <img src="/signout.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminUsersHeader;
