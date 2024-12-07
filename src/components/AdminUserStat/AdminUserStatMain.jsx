// frontend/AdminUserStatMain.jsx

import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/adminUserStat/adminUserStatMain.css';
import { ChevronLeft } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const AdminUserStatMain = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [teacher, setTeacher] = useState({});
    const [lessons, setLessons] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;
    const [ratingOrder, setRatingOrder] = useState('none');
    const [dateOrder, setDateOrder] = useState('none');

    const getOrderingParam = () => {
        if (ratingOrder !== 'none') return ratingOrder === 'desc' ? '-average_rating' : 'average_rating';
        if (dateOrder !== 'none') return dateOrder === 'desc' ? '-start_time' : 'start_time';
        return '';
    };

    const fetchData = (page = 1) => {
        let url = `api/lessons/teacher-lessons/${id}/?page=${page}`;
        const ordering = getOrderingParam();
        if (ordering) url += `&ordering=${ordering}`;
        axiosInstance.get(url)
            .then((response) => {
                setLessons(response.data.results || []);
                setCount(response.data.count || 0);
                setCurrentPage(page);
                if (response.data.teacher) {
                    setTeacher({
                        id: response.data.teacher.id,
                        role: response.data.teacher.role,
                        first_name: response.data.teacher.first_name,
                        surname: response.data.teacher.surname,
                        last_name: response.data.teacher.last_name,
                        rating: response.data.teacher.rating,
                        total_reviews: response.data.teacher.feedback_count,
                        most_frequent_praise: response.data.teacher.most_frequent_praise,
                        most_frequent_criticism: response.data.teacher.most_frequent_criticism,
                    });
                }
            });
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    const handleBackClick = () => {
        navigate('/admin-users');
    };

    const handleRatingFilterClick = () => {
        if (ratingOrder === 'none') { setRatingOrder('desc'); setDateOrder('none'); }
        else if (ratingOrder === 'desc') setRatingOrder('asc');
        else if (ratingOrder === 'asc') setRatingOrder('desc');
        fetchData(1);
    };

    const handleDateFilterClick = () => {
        if (dateOrder === 'none') { setDateOrder('desc'); setRatingOrder('none'); }
        else if (dateOrder === 'desc') setDateOrder('asc');
        else if (dateOrder === 'asc') setDateOrder('desc');
        fetchData(1);
    };

    const handlePageClick = (page) => {
        fetchData(page);
    };

    const totalPages = Math.ceil(count / pageSize);

    const handleExportClick = () => {
        const url = `api/lessons/teacher-report/${teacher.id}/`;
        // Загрузим файл
        axiosInstance.get(url, { responseType: 'blob' })
            .then((response) => {
                const blob = new Blob([response.data], { type: response.headers['content-type'] });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = `report_teacher_${teacher.id}.xlsx`;
                link.click();
            });
    };

    return (
        <main className="admin-user-stat__main">
            <h1 className="admin-user-stat__title">Статистика пользователя</h1>
            <div className="admin-user-stat__container">
                <div className="admin-user-stat__info-container">
                    <button className="admin-user-stat__back-button" onClick={handleBackClick}>
                        <ChevronLeft size={24} />
                    </button>
                    <div className="admin-user-stat__info">
                        <div className="admin-user-stat__user">
                            <img src="/Generic avatar.svg" alt="Фото преподавателя" className="admin-user-stat__avatar" />
                            <div className="admin-user-stat__user-details">
                                <span className="admin-user-stat__name">{`${teacher.first_name || ''} ${teacher.surname || ''} ${teacher.last_name || ''}`.trim()}</span>
                                <span className="admin-user-stat__role">Роль: {teacher.role === 'teacher' ? 'Преподаватель' : teacher.role}</span>
                            </div>
                        </div>
                        <div className="admin-user-stat__feedback">
                            <span className="admin-user-stat__feedback-good">{teacher.most_frequent_praise || 'Хороший отзыв'}</span>
                            <span className="admin-user-stat__feedback-bad">{teacher.most_frequent_criticism || 'Плохой отзыв'}</span>
                        </div>
                        <div className="admin-user-stat__rating">
                            <button className="admin-user-stat__export-btn" onClick={handleExportClick}>Перейти к выгрузке</button>
                            <div className="admin-user-stat__average-rating">
                                <img src="/Star.svg" alt="Золотая звезда" className="admin-user-stat__gold-star" />
                                <span className="admin-user-stat__rating-number">{teacher.rating ? teacher.rating.toFixed(1) : '-'}</span>
                            </div>
                            <span className="admin-user-stat__reviews">{teacher.total_reviews || 0} отзыва</span>
                        </div>
                    </div>
                    <div className="admin-user-stat__filters">
                        <button className="admin-user-stat__filter-btn" onClick={handleRatingFilterClick}>Средняя оценка {ratingOrder === 'desc' ? '↓' : ratingOrder === 'asc' ? '↑' : ''}</button>
                        <button className="admin-user-stat__filter-btn" onClick={handleDateFilterClick}>Давность {dateOrder === 'desc' ? '↓' : dateOrder === 'asc' ? '↑' : ''}</button>
                    </div>
                    <ul className="admin-user-stat__list">
                        {Array.isArray(lessons) && lessons.map((lesson) => (
                            <li key={lesson.id} className="admin-user-stat__list-item">
                                <div className="admin-user-stat__lesson-info">
                                    <div className="admin-user-stat__stars">
                                        {Array.from({ length: Math.round(lesson.average_rating || 0) }).map((_, i) => (
                                            <img key={i} src="/Star.svg" alt="Звезда" className="admin-user-stat__star" />
                                        ))}
                                    </div>
                                    <span className="admin-user-stat__lesson-name">{lesson.topic || 'Название пары'}</span>
                                </div>
                                <div className="admin-user-stat__place-info">
                                    <span className="admin-user-stat__place">Место проведения</span>
                                    <span className="admin-user-stat__place-name">{lesson.location || 'Не указано'}</span>
                                </div>
                                <div className="admin-user-stat__date-info">
                                    <span className="admin-user-stat__date">{lesson.start_time ? new Date(lesson.start_time).toLocaleDateString('ru-RU') : ''}</span>
                                    <span className="admin-user-stat__time">{lesson.start_time ? new Date(lesson.start_time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    {totalPages > 1 && (
                        <div className="admin-user-stat__pagination">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                                <button
                                    key={pageNumber}
                                    className={`admin-user-stat__pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                                    onClick={() => handlePageClick(pageNumber)}
                                >
                                    {pageNumber}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
};

export default AdminUserStatMain;

