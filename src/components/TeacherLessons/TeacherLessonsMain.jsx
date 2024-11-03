import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TeacherLessons/teacherLessonsMain.css';
import { Plus, Search, Star, BarChart2, Edit } from 'lucide-react';

const TeacherLessonsMain = () => {
    return (
        <main className="teacher-lessons__main">
            <h1 className="teacher-lessons__main-container-title">Пары</h1>

            <div className="teacher-lessons__main-container">
                <div className="teacher-lessons__search-container">
                    <Link to="/teacher-lesson-create" className="teacher-lessons__add-lesson">
                        <img src="/add.svg" alt="Добавить дисциплину" />
                    </Link>
                    <form className="teacher-lessons__search-form">
                        <input type="text" placeholder="Название пары" className="teacher-lessons__search-input" />
                        <button type="submit" className="teacher-lessons__search-button">
                            <img src="/Search.svg" alt="Поиск" />
                        </button>
                    </form>
                </div>

                <div className="teacher-lessons__filter-container">
                    <div className="teacher-lessons_filter-sub-container">
                        <label htmlFor="date-filter">Начало</label>
                        <input type="date" className="teacher-lessons__date-input" placeholder="Начало" />
                    </div>
                    <div className="teacher-lessons_filter-sub-container">
                        <label htmlFor="date-filter">Конец</label>
                        <input type="date" className="teacher-lessons__date-input" placeholder="Конец" />
                    </div>
                </div>

                <div className="teacher-lessons__list-header">
                    <span>Название пары</span>
                    <span>Сегодня/Все пары</span>
                    <span>Средняя оценка</span>
                </div>

                <ul className="teacher-lessons__list">
                    {[1, 2, 3].map((lesson, index) => (
                        <li key={index} className="teacher-lessons__list-item">
                            <div className="teacher-lessons__lesson-info">
                                <span className="teacher-lessons__lesson-name">Название пары</span>
                            </div>
                            <div className="teacher-lessons__lesson-date">
                                <span>Дистант/Дистант</span>
                                <span>26.09.2024 - 19:15</span>
                            </div>
                            <div className="teacher-lessons__lesson-actions">
                                <span className="teacher-lessons__lesson-rating">
                                    <img src="/Star.svg" alt="Рейтинг" />
                                    4.9
                                </span>
                                <Link to="/teacher-lesson-stat" className="teacher-lessons__lesson-stats">
                                    <img src="/Stat.svg" alt="Статистика" />
                                </Link>
                                <Link to="/teacher-lesson-create" className="teacher-lessons__lesson-edit">
                                    <img src="/Edit_fill.svg" alt="Редактировать" />
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>

                <button className="teacher-lessons__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default TeacherLessonsMain;
