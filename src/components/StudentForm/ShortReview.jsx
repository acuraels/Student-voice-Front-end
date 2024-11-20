import React from "react";

const ShortReview = ({ text, isPositive, onSelect, isSelected }) => {
  const buttonClass = `stud-form__praise-button ${isPositive ? "positive" : "negative"
    } ${isSelected ? "selected" : ""}`;

  return (
    <button type="button" onClick={() => onSelect(text)} className={buttonClass}>
      {text}
    </button>
  );
};

export default ShortReview;
