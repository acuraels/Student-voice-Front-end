import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/TeacherDisciplines/teacherDisciplinesMain.css';
import axiosInstance from '../../utils/axiosInstance';

const TeacherDisciplinesMain = () => {
    const navigate = useNavigate();
    const [disciplines, setDisciplines] = useState([]); // Состояние для хранения дисциплин
    const [searchQuery, setSearchQuery] = useState(''); // Состояние для строки поиска
    const [error, setError] = useState(null); // Для обработки ошибок

    // Функция для загрузки предметов с учетом строки поиска
    const fetchDisciplines = async () => {
        try {
            const response = await axiosInstance.get('/api/subjects/teacher-subjects/', {
                params: { search: searchQuery } // Передаем параметр поиска
            });
            setDisciplines(response.data);
        } catch (err) {
            console.error('Ошибка при загрузке дисциплин:', err);
            setError('Не удалось загрузить дисциплины.');
        }
    };

    // Загружаем данные при первой загрузке компонента и при изменении searchQuery
    useEffect(() => {
        fetchDisciplines();
    }, [searchQuery]);

    // Обработчик изменения строки поиска
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleAddDisciplineClick = (event) => {
        event.preventDefault();
        navigate('/teacher-discipline-create');
    };

    return (
        <main className="teacher-disciplines__main">
            <h1 className="teacher-disciplines__main-container-title">Предметы</h1>

            <div className="teacher-disciplines__main-container">
                <div className="teacher-disciplines__search-container">
                    <a href="#" onClick={handleAddDisciplineClick} className="teacher-disciplines__add-discipline">
                        <img src="/add.svg" alt="Добавить дисциплину" className="teacher-disciplines__add-discipline__img" />
                    </a>
                    <form className="teacher-disciplines__search-form" onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            placeholder="Дисциплина"
                            className="teacher-disciplines__search-input"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                        <button type="submit" className="teacher-disciplines__search-button">
                            <img src="/Search.svg" alt="Поиск" />
                        </button>
                    </form>
                </div>

                <div className="teacher-disciplines__list-header">
                    <span>Имя дисциплины</span>
                    <span>Средняя оценка</span>
                </div>

                <ul className="teacher-disciplines__list">
                    {error ? (
                        <p>{error}</p>
                    ) : disciplines.length === 0 ? (
                        <p>Нет доступных дисциплин.</p>
                    ) : (
                        disciplines.map((discipline) => (
                            <li key={discipline.id} className="teacher-disciplines__list-item">
                                <div className="teacher-disciplines__discipline-info">
                                    <span className="teacher-disciplines__discipline-name">{discipline.name}</span>
                                </div>
                                <div className="teacher-disciplines__discipline-actions">
                                    <span className="teacher-disciplines__discipline-rating">
                                        <img src="/Star.svg" alt="Рейтинг" />
                                        {discipline.average_rating || '—'}
                                    </span>
                                    <a href="#" className="teacher-disciplines__discipline-stats">
                                        <img src="/Stat.svg" alt="Статистика" />
                                    </a>
                                    <a href="#" className="teacher-disciplines__discipline-edit">
                                        <img src="/Edit_fill.svg" alt="Редактировать" />
                                    </a>
                                </div>
                            </li>
                        ))
                    )}
                </ul>

                <button className="teacher-disciplines__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default TeacherDisciplinesMain;

