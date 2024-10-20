import React from 'react';
import '../../styles/AdminUsers/adminUsersMain.css';

const AdminUsersMain = () => {
    return (
        <main className="admin-users__main">
            <div className="admin-users__main-container">
                <h1 className="admin-users__main-container-title">Пользователи</h1>

                <div className="admin-users__search-container">
                    <a href="#" className="admin-users__add-user">
                        <img src="/User plus.svg" alt="Добавить пользователя" className="admin-users__add-user__img" />
                    </a>
                    <form className="admin-users__search-form">
                        <input type="text" placeholder="ФИО сотрудника" className="admin-users__search-input" />
                        <button type="submit" className="admin-users__search-button">
                            <img src="/Search.svg" alt="Поиск" />
                        </button>
                    </form>
                </div>

                <div className="admin-users__list-header">
                    <span>Имя пользователя</span>
                    <span>Средняя оценка</span>
                </div>

                <ul className="admin-users__list">
                    {[1, 2, 3, 4].map((user, index) => (
                        <li key={index} className="admin-users__list-item">
                            <div className="admin-users__user-info">
                                <img src="/Generic avatar.svg" alt="Аватар пользователя" className="admin-users__user-avatar" />
                                <div className="admin-users__user-details">
                                    <span className="admin-users__user-name">ФИО</span>
                                    <span className="admin-users__user-role">Роль: роль</span>
                                </div>
                            </div>
                            <div className="admin-users__user-actions">
                                <span className="admin-users__user-rating">
                                    <img src="/Star.svg" alt="Рейтинг" />
                                    4.9
                                </span>
                                <a href="#" className="admin-users__user-stats">
                                    <img src="/Stat.svg" alt="Статистика" />
                                </a>
                                <a href="#" className="admin-users__user-edit">
                                    <img src="/Edit_fill.svg" alt="Редактировать" />
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <button className="admin-users__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default AdminUsersMain;