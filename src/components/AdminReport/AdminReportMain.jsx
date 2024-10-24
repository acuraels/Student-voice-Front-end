import React, { useState } from 'react';
import '../../styles/AdminReport/adminReportMain.css';
import { ChevronDown, X, Calendar, Search, Download } from 'lucide-react';

const AdminReportMain = () => {
    const [institutes, setInstitutes] = useState('');
    const [disciplines, setDisciplines] = useState('');
    const [teacherName, setTeacherName] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

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

    return (
        <main className="admin-report__main">
            <div className="admin-report__container">
                <h1 className="admin-report__title">Отчёт</h1>

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
                            <button className="admin-report__clear-filter">
                                <X size={18} />
                            </button>
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
                                <option value="">Дисциплины</option>
                                <option value="1">Дисциплина 1</option>
                                <option value="2">Дисциплина 2</option>
                            </select>
                            <button className="admin-report__clear-filter">
                                <X size={18} />
                            </button>
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
                                <option value="">ФИО преподавателя</option>
                                <option value="1">Преподаватель 1</option>
                                <option value="2">Преподаватель 2</option>
                            </select>
                            <button className="admin-report__clear-filter">
                                <X size={18} />
                            </button>
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

                <button className="admin-report__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default AdminReportMain;