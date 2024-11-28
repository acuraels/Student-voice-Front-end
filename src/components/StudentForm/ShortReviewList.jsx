import React from "react";
import ShortReview from "./ShortReview";

const ShortReviewList = ({ grade, onPraiseSelection, selectedPraise }) => {
  if (grade === 0) return null;

  const positiveReviews = [
    { text: "Подача материала", imgSrc: "/record_voice_over.svg" },
    { text: "Презентация", imgSrc: "/airplay.svg" },
    { text: "Ответы на вопросы", imgSrc: "/question_answer.svg" },
    { text: "Интересные задания", imgSrc: "/assignment.svg" },
  ];

  const negativeReviews = [
    { text: "Подача материала", imgSrc: "/record_voice_over.svg" },
    { text: "Презентация", imgSrc: "/airplay.svg" },
    { text: "Ответы на вопросы", imgSrc: "/question_answer.svg" },
    { text: "Неинтересные задания", imgSrc: "/assignment.svg" },
  ];

  const reviews = grade > 3 ? positiveReviews : negativeReviews;
  const heading = grade > 3 ? "Что понравилось в занятии?" : "Что не понравилось в занятии?";

  return (
    <div className="stud-form__praise-group">
      <h3 className="stud-form__praise-title">{heading}</h3>
      <div className="stud-form__praise-options">
        {reviews.map((review, index) => (
          <ShortReview
            key={index}
            text={review.text} // Текст отправляется на бэкенд
            imgSrc={review.imgSrc} // Картинка только для отображения
            isPositive={grade > 3}
            onSelect={onPraiseSelection}
            isSelected={selectedPraise.includes(review.text)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortReviewList;
