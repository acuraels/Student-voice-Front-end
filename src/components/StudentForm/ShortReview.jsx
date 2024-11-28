import React from "react";

const ShortReview = ({ text, imgSrc, isPositive, onSelect, isSelected }) => {
  const buttonClass = `stud-form__praise-button ${isPositive ? "positive" : "negative"} ${isSelected ? "selected" : ""
    }`;

  return (
    <button type="button" onClick={() => onSelect(text)} className={buttonClass}>
      <img src={imgSrc} alt={text} className="stud-form__praise-icon" /> {/* Добавляем картинку */}
      {text}
    </button>
  );
};

export default ShortReview;
