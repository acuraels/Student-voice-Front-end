import React from 'react';
import '.././styles/formPageFooter.css';

const FormPageFooter = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <ul className="footer-list">
                    <li className="footer-list-text">
                        <h2>© ФГАОУ ВО “УрФУ имени первого Президента России Б. Н. Ельцина”</h2>
                        <p>Инстутит радиоэлектроники и информационных технологий - РТФ</p>
                    </li>
                    <li className="footer-list-contacts">
                        <p>Контакты</p>
                        <ul>
                            <li><a href="mailto:project.irit@urfu.ru">Написать нам</a></li>
                            <li><p>Екатеринбург, ул. Мира 32</p></li>
                        </ul>
                    </li>
                    <li className="footer-list-social">
                        <p>Мы в социальных сетях</p>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default FormPageFooter;
