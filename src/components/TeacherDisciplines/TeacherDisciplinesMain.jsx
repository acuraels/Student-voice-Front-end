import React from 'react';
import '../../styles/TeacherDisciplines/teacherDisciplinesMain.css';

const TeacherDisciplinesMain = () => {
    return (
        <main className="teacher-disciplines__main">
            <h1 className="teacher-disciplines__main-container-title">Предметы</h1>

            <div className="teacher-disciplines__main-container">
                <div className="teacher-disciplines__search-container">
                    <a href="#" className="teacher-disciplines__add-discipline">
                        <img src="/add.svg" alt="Добавить дисциплину" className="teacher-disciplines__add-discipline__img" />
                    </a>
                    <form className="teacher-disciplines__search-form">
                        <input type="text" placeholder="Дисциплина" className="teacher-disciplines__search-input" />
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
                    {[1, 2, 3].map((discipline, index) => (
                        <li key={index} className="teacher-disciplines__list-item">
                            <div className="teacher-disciplines__discipline-info">
                                <span className="teacher-disciplines__discipline-name">Имя дисциплины</span>
                            </div>
                            <div className="teacher-disciplines__discipline-actions">
                                <span className="teacher-disciplines__discipline-rating">
                                    <img src="/Star.svg" alt="Рейтинг" />
                                    4.9
                                </span>
                                <a href="#" className="teacher-disciplines__discipline-stats">
                                    <img src="/Stat.svg" alt="Статистика" />
                                </a>
                                <a href="#" className="teacher-disciplines__discipline-edit">
                                    <img src="/Edit_fill.svg" alt="Редактировать" />
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>

                <button className="teacher-disciplines__show-more">Показать еще</button>
            </div>
        </main>
    );
};

export default TeacherDisciplinesMain;