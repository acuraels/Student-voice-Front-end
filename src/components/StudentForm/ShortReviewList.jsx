import React from "react";
import "../.././styles/StudentForm/studFormHeader.css";
import ShortReview from "./ShortReview";

// компонент является списком коротких отзывов. Получает на вход оценку ученика, в зависимости от неё выводит
//необходимые данные
const shortReviewList = (props) => {

  //проверка на хоть какую то выставленную отметку. Если ноль возвращает пустой компонент.
  //Может быть и другая логика
  if (props.grade == 0) {
    return <div className="stud-form__praise-group"></div>;
  }

  //Данные о хороших отзывах. Список содержит списка вида [текст отзыва, ссылка на изображение]
  const positiveReviews = [
    ["подача материала", "https://goo.su/0GzJelD"],
    ["Презентация", "https://goo.su/0GzJelD"],
    ["Интересные задания", "https://goo.su/0GzJelD"],
    ["Дополнительный материал", "https://goo.su/0GzJelD"],
    ["Ответы на вопросы", "https://goo.su/0GzJelD"],
  ];

    //Данные о плохих отзывах. Список содержит списка вида [текст отзыва, ссылка на изображение]
  const negativeReviews = [
    ["не понятен материал", "https://goo.su/UkwCI2r"],
    ["нет презентации", "https://goo.su/UkwCI2r"],
    ["скучные задания", "https://goo.su/UkwCI2r"],
    ["сложные задания", "https://goo.su/UkwCI2r"],
    ["нет ответов на вопросы", "https://goo.su/UkwCI2r"],
  ];

  //определение, хорошие или плохие отзывы показывать
  const Reviews = props.grade > 3 ? positiveReviews : negativeReviews;
  const heading = props.grade > 3 ? "Что понравилось в занятии?" : "Что не понравилось в занятии?";

  //далее Reviews преобразуется в последовательность компонентов
  return (
    <div className="stud-form__praise-group">
      <h3 className="stud-form__praise-title">{heading}</h3>
      <div className="stud-form__praise-options">
        {Reviews.map((x) => (
          <ShortReview text={x[0]} src={x[1]} />
        ))}
      </div>
    </div>
  );
};

export default shortReviewList;
