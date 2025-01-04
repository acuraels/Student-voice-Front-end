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
    const [teacherFeedback, setTeacherFeedback] = useState({
        most_frequent_praise: '',
        most_frequent_criticism: ''
    });
    const { unique_code } = useParams(); // Получаем параметр из URL
    const navigate = useNavigate();
    const teacherId = localStorage.getItem("user_id");

    useEffect(() => {
        // Запрос данных урока
        const fetchLessonData = async () => {
            try {
                const response = await axiosInstance.get(`/api/lessons/${unique_code}/lesson-stat/`);
                setLessonData(response.data);
                setReviews(response.data.student_feedback || []); // Если отзывы включены в данные урока
            } catch (error) {
                console.error("Ошибка при загрузке данных урока:", error);
            } finally {
                setIsLoading(false);
            }
        };

        // Запрос данных отзывов преподавателя
        const fetchTeacherFeedback = async () => {
            try {
                const response = await axiosInstance.get(`/api/lessons/teacher-lessons/${teacherId}/`);
                setTeacherFeedback({
                    most_frequent_praise: response.data.teacher.most_frequent_praise,
                    most_frequent_criticism: response.data.teacher.most_frequent_criticism
                });
            } catch (error) {
                console.error("Ошибка при загрузке данных преподавателя:", error);
            }
        };

        fetchLessonData();
        fetchTeacherFeedback();
    }, [unique_code]);

    const displayedReviews = reviews;

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
                        <h2>{lessonData.topic}</h2>
                        <p>{lessonData.location}</p>
                    </div>
                    <div className="teacher-lesson-stat__time">
                        {lessonData.start_time} - {lessonData.end_time}
                    </div>
                    <div className="teacher-lesson-stat__rating">
                        <img src="/Star.svg" alt="Рейтинг" />
                        <span
                            style={{
                                fontSize: '20px',
                                fontWeight: 'bold',
                            }}
                        >
                            {lessonData.average_rating !== null && lessonData.average_rating !== undefined
                                ? lessonData.average_rating.toFixed(1)
                                : 'N/A'}
                        </span>
                    </div>

                </div>

                <div className="admin-user-stat__feedback">
                    <span className="admin-user-stat__feedback-good">
                        {teacherFeedback.most_frequent_praise || 'Хороший отзыв'}
                    </span>
                    <span className="admin-user-stat__feedback-bad">
                        {teacherFeedback.most_frequent_criticism || 'Плохой отзыв'}
                    </span>
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
