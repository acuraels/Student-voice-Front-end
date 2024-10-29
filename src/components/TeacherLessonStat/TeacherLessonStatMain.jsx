import React, { useState } from 'react';
import '../../styles/TeacherLessonStat/teacherLessonStatMain.css';
import { ChevronLeft, ChevronDown } from 'lucide-react';

const TeacherLessonStatMain = () => {
    const [showAllReviews, setShowAllReviews] = useState(false);

    const reviews = [
        { rating: 5, comment: "Отличная лекция!", timestamp: "26.09.2024 - 19:15" },
        { rating: 4, comment: "Хорошо, но можно лучше", timestamp: "26.09.2024 - 19:16" },
        { rating: 5, comment: "", timestamp: "26.09.2024 - 19:17" },
        { rating: 4, comment: "Интересная тема", timestamp: "26.09.2024 - 19:18" },
        { rating: 5, comment: "Спасибо за урок!", timestamp: "26.09.2024 - 19:19" },
    ];

    const displayedReviews = showAllReviews ? reviews : reviews.slice(0, 4);

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <img
                key={index}
                src="/Star.svg"
                alt="Звезда"
                className={`teacher-lesson-stat__star ${index < rating ? 'teacher-lesson-stat__star--filled' : ''}`}
            />
        ));
    };

    return (
        <main className="teacher-lesson-stat__main">
            <h1 className="teacher-lesson-stat__title">Статистика пары</h1>

            <div className="teacher-lesson-stat__container">
                <div className="teacher-lesson-stat__header">
                    <button className="teacher-lesson-stat__back-button">
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="teacher-lesson-stat__lesson-info">
                    <div className="teacher-lesson-stat__discipline">
                        <h2>Дисциплина</h2>
                        <p>Место проведения</p>
                    </div>
                    <div className="teacher-lesson-stat__time">26.09.2024 - 19:15</div>
                    <div className="teacher-lesson-stat__rating">
                        {renderStars(4.9)}
                        <span>4.9</span>
                    </div>
                </div>

                <p className="teacher-lesson-stat__feedback-count">Оставили отзыв: 29 студентов</p>

                <div className="teacher-lesson-stat__reviews">
                    {displayedReviews.map((review, index) => (
                        <div key={index} className="teacher-lesson-stat__review">
                            <div className="teacher-lesson-stat__review-rating">
                                {renderStars(review.rating)}
                            </div>
                            <p className="teacher-lesson-stat__review-comment">{review.comment || "Без комментария"}</p>
                            <p className="teacher-lesson-stat__review-timestamp">{review.timestamp}</p>
                        </div>
                    ))}
                </div>

                {reviews.length > 4 && (
                    <button
                        className="teacher-lesson-stat__show-more"
                        onClick={() => setShowAllReviews(!showAllReviews)}
                    >
                        {showAllReviews ? 'Скрыть' : 'Показать еще'}
                        <ChevronDown size={20} className={`teacher-lesson-stat__chevron ${showAllReviews ? 'up' : ''}`} />
                    </button>
                )}
            </div>
        </main>
    );
};

export default TeacherLessonStatMain;