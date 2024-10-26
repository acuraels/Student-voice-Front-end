import React from 'react';
import '.././styles/headerTeacher.css';

const HeaderTeacher = () => {
    return (
        <header className="teacher-header">
            <div className="teacher-header__container">
                <div className="teacher-header__container-left">
                    <a href="#" className="teacher-header__logo">Student voice</a>
                </div>
                <div className="teacher-header__container-right">
                    <div className="teacher-header__container-links">
                        <a href="#" className="teacher-header__users">Пары</a>
                        <a href="#" className="teacher-header__institutions">Предметы</a>
                    </div>
                    <div className="teacher-header__container-imgs">
                        <a href="">
                            <img src="/settings.svg" alt="" />
                        </a>
                        <a href="">
                            <img src="/signout.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderTeacher;
