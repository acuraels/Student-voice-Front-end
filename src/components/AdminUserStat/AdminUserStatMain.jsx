import React from 'react';
import '../../styles/AdminUserStat/adminUserStatMain.css';

const AdminUserStatMain = () => {
    return (
        <main className="admin-user-stat__main">
            <h1 className="admin-user-stat__title">Статистика преподавателя</h1>

            <div className="admin-user-stat__container">
                <div className="admin-user-stat__info-container">
                    <div className="admin-user-stat__info">
                        <div className="admin-user-stat__user">
                            <img src="/Generic avatar.svg" alt="Фото преподавателя" className="admin-user-stat__avatar" />
                            <div className="admin-user-stat__user-details">
                                <span className="admin-user-stat__name">ФИО Преподавателя</span>
                                <span className="admin-user-stat__role">Роль: Преподаватель</span>
                            </div>
                        </div>
                        <div className="admin-user-stat__rating">
                            <button className="admin-user-stat__export-btn">Перейти к выгрузке</button>
                            <div className="admin-user-stat__average-rating">
                                <img src="/Star.svg" alt="Золотая звезда" className="admin-user-stat__gold-star" />
                                <span className="admin-user-stat__rating-number">4.9</span>
                            </div>
                            <span className="admin-user-stat__reviews">103 отзыва</span>
                        </div>
                    </div>

                    <div className="admin-user-stat__filters">
                        <button className="admin-user-stat__filter-btn">Средняя оценка</button>
                        <button className="admin-user-stat__filter-btn">С комментарием</button>
                        <button className="admin-user-stat__filter-btn">Давность</button>
                    </div>

                    <ul className="admin-user-stat__list">
                        {[1, 2, 3, 4].map((item, index) => (
                            <li key={index} className="admin-user-stat__list-item">
                                <div className="admin-user-stat__lesson-info">
                                    <div className="admin-user-stat__stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <img key={star} src="/Star.svg" alt="Звезда" className="admin-user-stat__star" />
                                        ))}
                                    </div>
                                    <span className="admin-user-stat__lesson-name">Название пары</span>
                                </div>
                                <div className="admin-user-stat__date-info">
                                    <span className="admin-user-stat__date">26.09.2024</span>
                                    <span className="admin-user-stat__time">19:15</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="admin-user-stat__show-more">Показать еще</button>
                </div>
            </div>
        </main>
    );
};

export default AdminUserStatMain;