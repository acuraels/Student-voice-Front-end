import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ShortReviewList from "./ShortReviewList";
import "../../styles/StudentForm/studFormMain.css";
import axiosInstance from '../../utils/axiosInstance'; // Import axiosInstance

const StudFormMain = () => {
  const { unique_code } = useParams(); // Extract unique_code from URL
  const [lessonData, setLessonData] = useState(null);
  const [studentName, setStudentName] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [selectedPraise, setSelectedPraise] = useState([]);

  // Fetch lesson details when the component mounts
  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const response = await axiosInstance.get(`/api/lessons/code/${unique_code}/`);
        console.log(response.data); // Log the data for debugging
        setLessonData(response.data);
      } catch (error) {
        if (error.response) {
          // Server responded with a status other than 2xx
          const errorData = error.response.data;
          alert(errorData.error || "Урок не найден или ссылка недействительна.");
        } else {
          // Network or other error
          console.error("Ошибка при загрузке данных урока:", error);
          alert("Ошибка при загрузке данных урока.");
        }
      }
    };

    fetchLessonData();
  }, [unique_code]);

  // Handle form submission
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
      const response = await axiosInstance.post(
        `/api/lessons/code/${unique_code}/feedback/`,
        formData
      );
      alert("Форма успешно отправлена!");
      // Optionally reset form fields
      setStudentName("");
      setComment("");
      setRating(0);
      setSelectedPraise([]);
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        const errorData = error.response.data;
        alert(`Ошибка при отправке формы: ${JSON.stringify(errorData)}`);
      } else {
        // Network or other error
        console.error("Ошибка при отправке данных:", error);
        alert("Ошибка при отправке данных.");
      }
    }
  };

  // Handle praise selection
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
              maxLength="200"
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
              maxLength="500"
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
