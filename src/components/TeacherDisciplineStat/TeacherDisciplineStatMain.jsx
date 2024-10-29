import React from 'react';
import '../../styles/TeacherDisciplineStat/teacherDisciplineStatMain.css';
import { ChevronLeft } from 'lucide-react';

const TeacherDisciplineStatMain = () => {
    return (
        <main className="teacher-discipline-stat__main">
            <h1 className="teacher-discipline-stat__title">Статистика предмета</h1>

            <div className="teacher-discipline-stat__container">
                <div className="teacher-discipline-stat__info-container">
                    <div className="teacher-discipline-stat__header">
                        <button className="teacher-discipline-stat__back-btn">
                            <ChevronLeft size={24} />
                        </button>
                        <h2 className="teacher-discipline-stat__subject-name">Предмет</h2>
                    </div>

                    <div className="teacher-discipline-stat__rating">
                        <div className="teacher-discipline-stat__average-rating">
                            <img src="/Star.svg" alt="Золотая звезда" className="teacher-discipline-stat__gold-star" />
                            <span className="teacher-discipline-stat__rating-number">4.9</span>
                        </div>
                        <span className="teacher-discipline-stat__reviews">109 оценок</span>
                    </div>

                    <div className="teacher-discipline-stat__filters">
                        <button className="teacher-discipline-stat__filter-btn">Средняя оценка</button>
                        <button className="teacher-discipline-stat__filter-btn">С комментариями</button>
                        <button className="teacher-discipline-stat__filter-btn">Давность</button>
                    </div>

                    <ul className="teacher-discipline-stat__list">
                        {[1, 2, 3, 4].map((item, index) => (
                            <li key={index} className="teacher-discipline-stat__list-item">
                                <div className="teacher-discipline-stat__lesson-info">
                                    <div className="teacher-discipline-stat__stars">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <img key={star} src="/Star.svg" alt="Звезда" className="teacher-discipline-stat__star" />
                                        ))}
                                    </div>
                                    <span className="teacher-discipline-stat__lesson-name">Название пары</span>
                                </div>
                                <div className="teacher-discipline-stat__date-info">
                                    <span className="teacher-discipline-stat__date">26.09.2024</span>
                                    <span className="teacher-discipline-stat__time">19:15</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <button className="teacher-discipline-stat__show-more">Показать еще</button>
                </div>
            </div>
        </main>
    );
};

export default TeacherDisciplineStatMain;