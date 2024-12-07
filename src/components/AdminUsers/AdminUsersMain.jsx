import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/AdminUsers/adminUsersMain.css';
import axiosInstance from '../../utils/axiosInstance';

const AdminUsersMain = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const totalPages = Math.ceil(count / pageSize);

    const fetchUsers = (page = 1, query = '') => {
        const url = query
            ? `api/accounts/users/?search=${query}&page=${page}`
            : `api/accounts/users/?page=${page}`;

        axiosInstance.get(url)
            .then((response) => {
                setUsers(response.data.results);
                setCount(response.data.count);
                setCurrentPage(page);
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
        fetchUsers(1, searchQuery); // При поиске переходим на первую страницу
    };

    const handlePageClick = (page) => {
        fetchUsers(page, searchQuery);
    };

    return (
        <main className="admin-users__main">
            <h1 className="admin-users__main-container-title">Пользователи</h1>

            <div className="admin-users__main-container">
                <div className="admin-users__search-container">
                    <Link to="/admin-user-create" className="admin-users__add-user">
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
                                        {`${user.surname} ${user.first_name} ${user.last_name || ""}`}
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

                {/* Пагинация */}
                {totalPages > 1 && (
                    <div className="admin-users__pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`admin-users__pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminUsersMain;

