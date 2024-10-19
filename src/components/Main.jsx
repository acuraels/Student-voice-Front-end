import React from 'react';
import '.././styles/main.css';

const Main = () => {
    return (
        <main className="main">
            <div className="main__container">
                <div className="main__content">
                    <div className="main__image-container">
                        <img src="/infografic.png" alt="Infographic" className="main__image" />
                    </div>
                    <div className="main__form-wrapper">
                        <h2 className="main__title">Вход</h2>
                        <div className="main__form-container">
                            <form className="form">
                                <div className="form__group">
                                    <label htmlFor="login" className="form__label">Логин</label>
                                    <input id="login" type="text" placeholder="Ваш логин" className="form__input" />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="password" className="form__label">Пароль</label>
                                    <input id="password" type="password" placeholder="Ваш пароль" className="form__input" />
                                </div>
                                <button type="submit" className="form__button">Войти</button>
                            </form>
                            <a href="#" className="form__link">Забыли пароль?</a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Main;
