import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminUsers/adminUsersMain.css';
import axiosInstance from '../../utils/axiosInstance';

const AdminUsersMain = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    const fetchUsers = () => {
        axiosInstance.get('api/users/')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении списка пользователей:', error);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        axiosInstance.get(`api/users/?search=${searchQuery}`)
            .then((response) => {
                setUsers(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при поиске пользователей:', error);
            });
    };

    return (
        <main className="admin-users__main">
            <h1 className="admin-users__main-container-title">Пользователи</h1>

            <div className="admin-users__main-container">
                <div className="admin-users__search-container">
                    <Link to="/admin-user-edit" className="admin-users__add-user">
                        <img src="/User plus.svg" alt="Добавить пользователя" className="admin-users__add-user__img" />
                    </Link>
                    <form className="admin-users__search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="ФИО сотрудника"
                            className="admin-users__search-input"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
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
                    {users.map((user, index) => (
                        <li key={index} className="admin-users__list-item">
                            <div className="admin-users__user-info">
                                <img src="/Generic avatar.svg" alt="Аватар пользователя" className="admin-users__user-avatar" />
                                <div className="admin-users__user-details">
                                    <span className="admin-users__user-name">
                                        {`${user.last_name} ${user.first_name} ${user.surname || ''}`}
                                    </span>
                                    <span className="admin-users__user-role">Роль: {user.role}</span>
                                </div>
                            </div>
                            <div className="admin-users__user-actions">
                                <span className="admin-users__user-rating">
                                    {user.role !== 'admin' && user.rating !== null ? (
                                        <>
                                            <img src="/Star.svg" alt="Рейтинг" />
                                            {user.rating.toFixed(1)}
                                        </>
                                    ) : (
                                        <span>—</span>
                                    )}
                                </span>
                                <Link to={`/admin-user-stat/${user.id}`} className="admin-users__user-stats">
                                    <img src="/Stat.svg" alt="Статистика" />
                                </Link>
                                <Link to={`/admin-user-edit/${user.id}`} className="admin-users__user-edit">
                                    <img src="/Edit_fill.svg" alt="Редактировать" />
                                </Link>
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
