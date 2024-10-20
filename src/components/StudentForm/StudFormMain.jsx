import React, { useState } from 'react';
import '../.././styles/StudentForm/studFormMain.css';

const StudFormMain = () => {
    const [studentName, setStudentName] = useState('');
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(0); // Храним рейтинг
    const [selectedPraise, setSelectedPraise] = useState([]);

    // Функция для отправки данных на бэкенд
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            studentName,
            comment,
            rating,  // Передаем выбранный рейтинг
            selectedPraise
        };

        try {
            const response = await fetch('https://example.com/api/submit-form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Форма успешно отправлена!');
            } else {
                alert('Ошибка при отправке формы');
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error);
        }
    };

    const handlePraiseSelection = (praise) => {
        setSelectedPraise(prev =>
            prev.includes(praise) ? prev.filter(p => p !== praise) : [...prev, praise]
        );
    };

    return (
        <main className="stud-form">
            <div className="stud-form__container">
                <h1 className="stud-form__title">Название дисциплины</h1>
                <div className="stud-form__info">
                    <div className="stud-form__info-date">
                        <h2 className="stud-form__info-title">Дата проведения</h2>
                        <p className="stud-form__info-desc">01.01.2024 - 11:11</p>
                    </div>
                    <div className="stud-form__info-place">
                        <h2 className="stud-form__info-title">Место проведения</h2>
                        <p className="stud-form__info-desc">Дистант</p>
                    </div>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit} className="stud-form__form">
                    <div className="stud-form__input-group">
                        <input
                            type="text"
                            placeholder="ФИО студента"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                            className="stud-form__input"
                        />
                    </div>

                    <div className="stud-form__input-group">
                        <label className="stud-form__label">Оценка</label>
                        <div className="stud-form__rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={star <= rating ? 'stud-form__star stud-form__star_filled' : 'stud-form__star'}
                                >
                                    {star <= rating ? '★' : '☆'}
                                </span>
                            ))}
                        </div>
                        <p className="stud-form__current-rating">Ваша оценка: {rating}</p>
                    </div>

                    <div className="stud-form__praise-group">
                        <h3 className="stud-form__praise-title">За что похвалить лектора?</h3>
                        <div className="stud-form__praise-options">
                            <button type="button" onClick={() => handlePraiseSelection('Подача материала')} className="stud-form__praise-button">
                                Подача материала
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Презентация')} className="stud-form__praise-button">
                                Презентация
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Ответы на вопросы')} className="stud-form__praise-button">
                                Ответы на вопросы
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Интересные задания')} className="stud-form__praise-button">
                                Интересные задания
                            </button>
                        </div>
                    </div>

                    <div className="stud-form__input-group">
                        <textarea
                            value={comment}
                            placeholder="Ваш комментарий"
                            onChange={(e) => setComment(e.target.value)}
                            className="stud-form__textarea"
                        />
                    </div>

                    <button className="stud-form__submit-button">Готово</button>
                </form>
            </div>
        </main>
    );
};

export default StudFormMain;
