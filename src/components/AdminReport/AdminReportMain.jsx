import React, { useState } from 'react';
import '../../styles/AdminReport/adminReportMain.css';
import { ChevronDown, X, Search, Download, ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate

const AdminReportMain = () => {
    const [institutes, setInstitutes] = useState('');
    const [disciplines, setDisciplines] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const navigate = useNavigate(); // Для маршрутизации

    const clearFilter = (setter) => {
        setter('');
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <img
                key={index}
                src="/Star.svg"
                alt="Звезда"
                className={`admin-report__star ${index < rating ? 'admin-report__star--filled' : ''}`}
            />
        ));
    };

    const handleBackClick = () => {
        navigate('/admin-users'); // Переход на маршрут /admin-users
    };

    return (
        <main className="admin-report__main">
            <h1 className="admin-report__title">Отчёт</h1>

            <div className="admin-report__container">
                {/* Кнопка назад */}
                <button
                    className="admin-report__back-button"
                    onClick={handleBackClick} // Привязка обработчика
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-report__rates">
                    <h2 className="admin-report__section-title">Рейтинг</h2>
                    <div className="admin-report__rating-header">
                        <div className="admin-report__rating-score">
                            <img src="/Star.svg" alt="Рейтинг" className="admin-report__rating-star" />
                            <span className="admin-report__rating-number">4.9</span>
                        </div>
                        <span className="admin-report__rating-count">109 оценок</span>
                    </div>

                    <div className="admin-report__rating-table">
                        <div className="admin-report__rating-column admin-report__rating-column--high">
                            <div className="admin-report__rating-column-header">С наивысшей оценкой</div>
                            <div className="admin-report__rating-item">Белоусова Вериомика Игоревна</div>
                            <div className="admin-report__rating-item">Анисимова Анастасия Висторовна</div>
                            <div className="admin-report__rating-item">Белогур Вероника Анатольевна</div>
                        </div>
                        <div className="admin-report__rating-column admin-report__rating-column--low">
                            <div className="admin-report__rating-column-header">С наименьшей оценкой</div>
                            <div className="admin-report__rating-item">Гладков Антон Адреевич</div>
                            <div className="admin-report__rating-item">Ильин Александр Витальевич</div>
                            <div className="admin-report__rating-item">Григоридзе Воуржан Арсенович</div>
                        </div>
                    </div>
                </div>

                <div className="admin-report__smalls">
                    <h2 className="admin-report__section-title">Топ коротких отзывов</h2>
                    <div className="admin-report__reviews-table">
                        <div className="admin-report__reviews-header">
                            <div className="admin-report__reviews-cell">Отзывы</div>
                            <div className="admin-report__reviews-cell">Положительные</div>
                            <div className="admin-report__reviews-cell">Отрицательные</div>
                        </div>
                        <div className="admin-report__reviews-row">
                            <div className="admin-report__reviews-cell">Интересность заданий</div>
                            <div className="admin-report__reviews-cell">157 (6%)</div>
                            <div className="admin-report__reviews-cell">975 (36%)</div>
                        </div>
                        <div className="admin-report__reviews-row">
                            <div className="admin-report__reviews-cell">Подача материала</div>
                            <div className="admin-report__reviews-cell">340 (14%)</div>
                            <div className="admin-report__reviews-cell">647 (26%)</div>
                        </div>
                        <div className="admin-report__reviews-row">
                            <div className="admin-report__reviews-cell">Презентация</div>
                            <div className="admin-report__reviews-cell">398 (17%)</div>
                            <div className="admin-report__reviews-cell">76 (3%)</div>
                        </div>
                    </div>
                    <button className="admin-report__show-all">Показать все</button>
                </div>

                <h2 className="admin-report__heading">Выгрузка отчёта по фильтрам</h2>

                <div className="admin-report__filters">
                    <div className="admin-report__filter-group">
                        <div className="admin-report__filter">
                            {institutes && (
                                <button onClick={() => clearFilter(setInstitutes)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={institutes}
                                onChange={(e) => setInstitutes(e.target.value)}
                                className="admin-report__select"
                            >
                                <option value="">Институты</option>
                                <option value="1">Институт 1</option>
                                <option value="2">Институт 2</option>
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>
                        <div className="admin-report__filter">
                            {disciplines && (
                                <button onClick={() => clearFilter(setDisciplines)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={disciplines}
                                onChange={(e) => setDisciplines(e.target.value)}
                                className="admin-report__select"
                            >
                                <option value="">ФИО преподавателя</option>
                                <option value="1">ФИО преподавателя 1</option>
                                <option value="2">ФИО преподавателя 2</option>
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>
                        <div className="admin-report__filter">
                            {teacherName && (
                                <button onClick={() => clearFilter(setTeacherName)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={teacherName}
                                onChange={(e) => setTeacherName(e.target.value)}
                                className="admin-report__select"
                            >
                                <option value="">Предмет</option>
                                <option value="1">Предмет 1</option>
                                <option value="2">Предмет 2</option>
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>
                    </div>

                    <div className="admin-report__date-filters">
                        <div className="admin-report__date-filter">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="admin-report__date-input"
                            />
                        </div>
                        <div className="admin-report__date-filter">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="admin-report__date-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="admin-report__actions">
                    <button className="admin-report__action-btn admin-report__action-btn--search">
                        <Search size={20} />
                        Поиск
                    </button>
                    <button className="admin-report__action-btn admin-report__action-btn--download">
                        <Download size={20} />
                        Скачать отчет
                    </button>
                </div>

                <div className="admin-report__table">
                    {[1, 2, 3].map((_, index) => (
                        <div key={index} className="admin-report__table-row">
                            <div className="admin-report__table-cell">
                                <div className="admin-report__rating">{renderStars(4)}</div>
                                <div className="admin-report__lesson-name">Название пары</div>
                                <div className="admin-report__teacher-name">ФИО преподавателя</div>
                            </div>
                            <div className="admin-report__table-cell">Институт</div>
                            <div className="admin-report__table-cell">Дистант/Очная</div>
                            <div className="admin-report__table-cell">
                                <span className="admin-report__date">26.09.2024</span>
                                <span className="admin-report__time">19:15</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default AdminReportMain;
