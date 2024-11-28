import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/TeacherLessonStat/teacherLessonStatMain.css';
import { ChevronLeft, ChevronDown } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance'; // Импортируем axiosInstance

const TeacherLessonStatMain = () => {
    const [lessonData, setLessonData] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showAllReviews, setShowAllReviews] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const { unique_code } = useParams(); // Получаем параметр из URL
    const navigate = useNavigate();

    useEffect(() => {
        // Запрос данных урока
        const fetchLessonData = async () => {
            try {
                const response = await axiosInstance.get(`/api/lessons/${unique_code}/lesson-stat/`);

                setLessonData(response.data);
                setReviews(response.data.student_feedback || []); // Если отзывы включены в данные
            } catch (error) {
                console.error("Ошибка при загрузке данных:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchLessonData();
    }, [unique_code]);

    const displayedReviews = reviews;

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

    const handleBackClick = () => {
        navigate('/teacher-lessons');
    };

    if (isLoading) return <p>Загрузка...</p>;

    if (!lessonData) return <p>Данные не найдены</p>;

    return (
        <main className="teacher-lesson-stat__main">
            <h1 className="teacher-lesson-stat__title">Статистика пары</h1>

            <div className="teacher-lesson-stat__container">
                <div className="teacher-lesson-stat__header">
                    <button
                        className="teacher-lesson-stat__back-button"
                        onClick={handleBackClick}
                    >
                        <ChevronLeft size={24} />
                    </button>
                </div>

                <div className="teacher-lesson-stat__lesson-info">
                    <div className="teacher-lesson-stat__discipline">
                        <h2>{lessonData.subject}</h2>
                        <p>{lessonData.location}</p>
                    </div>
                    <div className="teacher-lesson-stat__time">
                        {lessonData.start_time} - {lessonData.end_time}
                    </div>
                    <div className="teacher-lesson-stat__rating">
                        {/* Отображение рейтинга с округлением */}
                        <img src="/Star.svg" alt="Рейтинг" />
                        <span
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >{lessonData.average_rating.toFixed(1)}</span>
                    </div>
                </div>

                <p className="teacher-lesson-stat__feedback-count">

                    Оставили отзыв: {lessonData.student_feedback_count} студентов
                </p>

                <div className="teacher-lesson-stat__reviews">
                    {displayedReviews.map((review, index) => (
                        <div key={index} className="teacher-lesson-stat__review">
                            <div className="teacher-lesson-stat__review-rating">
                                <img src="/Star.svg" alt="Рейтинг" />
                                {review.rating}
                            </div>
                            <p className="teacher-lesson-stat__review-comment">
                                {review.comment || "Без комментария"}
                            </p>
                            <p className="teacher-lesson-stat__review-timestamp">
                                {review.created_at}
                            </p>
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

