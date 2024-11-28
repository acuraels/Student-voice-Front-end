import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Добавлен useNavigate
import ShortReviewList from "./ShortReviewList";
import "../../styles/StudentForm/studFormMain.css";
import axiosInstance from "../../utils/axiosInstance"; // Импорт axiosInstance

const StudFormMain = () => {
  const { unique_code } = useParams(); // Извлекаем unique_code из URL
  const navigate = useNavigate(); // Для навигации после отправки формы
  const [lessonData, setLessonData] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPraise, setSelectedPraise] = useState([]);

  // Получение данных урока при монтировании компонента
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axiosInstance.get(`/api/lessons/code/${unique_code}/`);
        setLessonData(response.data);
      } catch (error) {
        if (error.response) {
          const errorData = error.response.data;
          alert(errorData.error || "Урок не найден или ссылка недействительна.");
        } else {
          console.error("Ошибка при загрузке данных урока:", error);
          alert("Ошибка при загрузке данных урока.");
        }
      }
    };

    fetchLessonData();
  }, [unique_code]);

  // Обработка отправки формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert("Пожалуйста, укажите вашу оценку.");
      return;
    }
    const formData = {
      student_name: studentName,
      comment,
      rating,
      praises: selectedPraise,
    };

    try {
      await axiosInstance.post(`/api/lessons/code/${unique_code}/feedback/`, formData);
      // Переадресация на страницу завершения формы
      navigate("/form-completed");
    } catch (error) {
      if (error.response) {
        const errorData = error.response.data;
        alert(`Ошибка при отправке формы: ${JSON.stringify(errorData)}`);
      } else {
        console.error("Ошибка при отправке данных:", error);
        alert("Ошибка при отправке данных.");
      }
    }
  };

  // Обработка выбора похвалы
  const handlePraiseSelection = (praise) => {
    setSelectedPraise((prev) =>
      prev.includes(praise) ? prev.filter((p) => p !== praise) : [...prev, praise]
    );
  };

  if (!lessonData) {
    return <div>Загрузка данных урока...</div>;
  }

  return (
    <main className="stud-form">
      <div className="stud-form__container">
        <h1 className="stud-form__title">{lessonData.subject_name}</h1>
        <h2 className="stud-form__theme">{lessonData.topic}</h2>
        <div className="stud-form__info">
          <div className="stud-form__info-date">
            <h2 className="stud-form__info-title">Дата проведения</h2>
            <p className="stud-form__info-desc">
              {new Date(lessonData.start_time).toLocaleString()}
            </p>
          </div>
          <div className="stud-form__info-place">
            <h2 className="stud-form__info-title">Место проведения</h2>
            <p className="stud-form__info-desc">{lessonData.location}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="stud-form__form">
          <div className="stud-form__input-group">
            <input
              type="text"
              placeholder="ФИО студента"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
              className="stud-form__input"
              maxLength="75"
            />
          </div>

          <div className="stud-form__input-group">
            <label className="stud-form__label">Оценка</label>
            <div className="stud-form__rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => setRating(star)}
                  className={
                    star <= rating
                      ? "stud-form__star stud-form__star_filled"
                      : "stud-form__star"
                  }
                >
                  {star <= rating ? "★" : "☆"}
                </span>
              ))}
            </div>
            <p className="stud-form__current-rating">Ваша оценка: {rating}</p>
          </div>

          <ShortReviewList
            grade={rating}
            onPraiseSelection={handlePraiseSelection}
            selectedPraise={selectedPraise}
          />

          <div className="stud-form__input-group">
            <textarea
              value={comment}
              placeholder="Ваш комментарий"
              onChange={(e) => setComment(e.target.value)}
              className="stud-form__textarea"
              maxLength="100"
            />
          </div>

          <button type="submit" className="stud-form__submit-button">
            Готово
          </button>
        </form>
      </div>
    </main>
  );
};

export default StudFormMain;
