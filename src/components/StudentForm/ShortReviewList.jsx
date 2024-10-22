import React from "react";
import ShortReview from "./ShortReview";

const ShortReviewList = ({ grade, onPraiseSelection }) => {
  if (grade === 0) {
    return <div className="stud-form__praise-group"></div>;
  }

  const positiveReviews = [
    [<p key="1">Подача материала</p>, "/record_voice_over.svg"],
    [<p key="2">Презентация</p>, "/airplay.svg"],
    [<p key="3">Ответы на вопросы</p>, "/question_answer.svg"],
    [<p key="4">Интересные задания</p>, "/assignment.svg"],

  ];

  const negativeReviews = [
    [<p key="1">Подача материала</p>, "/record_voice_over.svg"],
    [<p key="2">Презентация</p>, "/airplay.svg"],
    [<p key="3">Ответы на вопросы</p>, "/question_answer.svg"],
    [<p key="4">Интересные задания</p>, "/assignment.svg"],
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
            text={review[0]}
            src={review[1]}
            isPositive={grade > 3}
            onSelect={() => onPraiseSelection(review[0])}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortReviewList;