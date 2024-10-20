import React, { useState } from 'react';
import '.././styles/studFormMain.css';

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
        <main className="stud-form-main">
            <div className="stud-form-main-container">
                <h1>Название дисциплины</h1>
                <div className="date-place-container">
                    <div className="date">
                        <h2>Дата проведения</h2>
                        <p className="desc">01.01.2024 - 11:11</p>
                    </div>
                    <div className="place">
                        <h2>Место проведения</h2>
                        <p className="desc">Дистант</p>
                    </div>
                </div>

                {/* Форма */}
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="ФИО студента"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <label>Оценка</label>
                        <div className="rating">
                            {/* Массив звезд */}
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    onClick={() => setRating(star)}  // Клик по звезде задает рейтинг
                                    style={{ cursor: 'pointer', fontSize: '2rem' }} // Изменение стиля для удобства клика
                                    className={star <= rating ? 'filled' : ''}
                                >
                                    {star <= rating ? '★' : '☆'}  {/* Показываем либо заполненную, либо пустую звезду */}
                                </span>
                            ))}
                        </div>
                        <p>Ваша оценка: {rating}</p> {/* Отображение текущего рейтинга */}
                    </div>

                    <div className="praise-group">
                        <h3>За что похвалить лектора?</h3>
                        <div>
                            <button type="button" onClick={() => handlePraiseSelection('Подача материала')}>
                                Подача материала
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Презентация')}>
                                Презентация
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Ответы на вопросы')}>
                                Ответы на вопросы
                            </button>
                            <button type="button" onClick={() => handlePraiseSelection('Интересные задания')}>
                                Интересные задания
                            </button>
                        </div>
                    </div>

                    <div className="input-group-comment">
                        <textarea
                            value={comment}
                            placeholder="Ваш комментарий"
                            onChange={(e) => setComment(e.target.value)}
                        />
                    </div>

                    <button className="form-submit-action-large-done">Готово</button>
                </form>
            </div>
        </main>
    );
};

export default StudFormMain;
