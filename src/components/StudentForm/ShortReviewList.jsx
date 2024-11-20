import React from "react";
import ShortReview from "./ShortReview";

const ShortReviewList = ({ grade, onPraiseSelection, selectedPraise }) => {
  if (grade === 0) {
    return null;
  }

  const positiveReviews = [
    "Подача материала",
    "Презентация",
    "Ответы на вопросы",
    "Интересные задания",
  ];

  const negativeReviews = [
    "Подача материала",
    "Презентация",
    "Ответы на вопросы",
    "Интересные задания",
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
            text={review}
            isPositive={grade > 3}
            onSelect={onPraiseSelection}
            isSelected={selectedPraise.includes(review)}
          />
        ))}
      </div>
    </div>
  );
};

export default ShortReviewList;