import React from "react";

const ShortReview = ({ text, src, isPositive, onSelect }) => {
  const buttonClass = `stud-form__praise-button ${isPositive ? 'positive' : 'negative'}`;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={buttonClass}
    >
      <img src={src} alt={text} />
      {text}
    </button>
  );
};

export default ShortReview;