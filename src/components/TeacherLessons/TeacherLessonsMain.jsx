import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { Link } from 'react-router-dom';
import '../../styles/TeacherLessons/teacherLessonsMain.css';
import { Plus, Search, Star, BarChart2, Edit } from 'lucide-react';

const TeacherLessonsMain = () => {
    const [lessons, setLessons] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchLessons = async () => {
            try {
                const params = {};
                if (searchQuery) params.search = searchQuery;
                if (startDate) params.start_date = startDate;
                if (endDate) params.end_date = endDate;

                const response = await axiosInstance.get('/api/lessons/subjects/', { params });
                setLessons(response.data);
            } catch (error) {
                console.error('Error fetching lessons:', error);
            }
        };

        fetchLessons();
    }, [searchQuery, startDate, endDate]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
    };

    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
    };

    return (
        <main className="teacher-lessons__main">
            <h1 className="teacher-lessons__main-container-title">Пары</h1>

            <div className="teacher-lessons__main-container">
                <div className="teacher-lessons__search-container">
                    <Link to="/teacher-lesson-create" className="teacher-lessons__add-lesson">
                        <Plus size={24} />
                    </Link>
                    <form className="teacher-lessons__search-form" onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            placeholder="Название пары"
                            className="teacher-lessons__search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="teacher-lessons__search-button">
                            <Search size={24} />
                        </button>
                    </form>
                </div>

                <div className="teacher-lessons__filter-container">
                    <div className="teacher-lessons_filter-sub-container">
                        <label htmlFor="start-date">Начало</label>
                        <input
                            type="date"
                            id="start-date"
                            className="teacher-lessons__date-input"
                            value={startDate}
                            onChange={handleStartDateChange}
                        />
                    </div>
                    <div className="teacher-lessons_filter-sub-container">
                        <label htmlFor="end-date">Конец</label>
                        <input
                            type="date"
                            id="end-date"
                            className="teacher-lessons__date-input"
                            value={endDate}
                            onChange={handleEndDateChange}
                        />
                    </div>
                </div>

                <div className="teacher-lessons__list-header">
                    <span>Название пары</span>
                    <span>Место/Дата</span>
                    <span>Средняя оценка</span>
                </div>

                <ul className="teacher-lessons__list">
                    {lessons.length > 0 ? (
                        lessons.map((lesson) => (
                            <li key={lesson.id} className="teacher-lessons__list-item">
                                <div className="teacher-lessons__lesson-info">
                                    <span className="teacher-lessons__lesson-name">{lesson.topic}</span>
                                </div>
                                <div className="teacher-lessons__lesson-date">
                                    <span>{lesson.location}</span>
                                    <span>{new Date(lesson.start_time).toLocaleString()}</span>
                                </div>
                                <div className="teacher-lessons__lesson-actions">
                                    <span className="teacher-lessons__lesson-rating">
                                        <Star size={16} />
                                        {lesson.average_rating ? lesson.average_rating.toFixed(1) : 'N/A'}
                                    </span>
                                    <Link to={`/teacher-lesson-stat/${lesson.id}`} className="teacher-lessons__lesson-stats">
                                        <BarChart2 size={16} />
                                    </Link>
                                    <Link to={`/teacher-lesson-edit/${lesson.id}`} className="teacher-lessons__lesson-edit">
                                        <Edit size={16} />
                                    </Link>
                                </div>
                            </li>
                        ))
                    ) : (
                        <li>No lessons found.</li>
                    )}
                </ul>

                <button className="teacher-lessons__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default TeacherLessonsMain;

