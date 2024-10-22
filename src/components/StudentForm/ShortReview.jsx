import React from "react";
import "../.././styles/StudentForm/studFormHeader.css";


// компонент является коротким отзывом, получает на вход текст короткого отзыва и ссылку на изображение
const studFormHeader = (props) => {
  return (
    <button
      type="button"
      onClick={() => handlePraiseSelection(props.text)}
      className="stud-form__praise-button"
    >
      <img src={props.src}></img>
      {props.text}
    </button>
  );
};

export default studFormHeader;
