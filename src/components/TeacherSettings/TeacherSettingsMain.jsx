import React, { useState } from 'react';
import '../../styles/TeacherSettings/teacherSettingsMain.css';
import { ChevronLeft, Eye, EyeOff, Upload } from 'lucide-react';

const TeacherSettingsMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <main className="teacher-settings__main">
            <h1 className="teacher-settings__title">Настройки преподавателя</h1>

            <div className="teacher-settings__container">
                <button className="teacher-settings__back-button">
                    <ChevronLeft size={24} />
                </button>

                <div className="teacher-settings__profile">
                    <div className="teacher-settings__avatar-container">
                        <div className="teacher-settings__photo-placeholder">
                            <img src="/Generic avatar.svg" alt="Загрузить фото" />
                        </div>
                        <button className="teacher-settings__avatar-upload">
                            <Upload size={24} />
                        </button>
                    </div>
                </div>

                <section className="teacher-settings__account-access">
                    <h2 className="teacher-settings__section-title">Доступ к моему аккаунту</h2>
                    <div className="teacher-settings__input-group">
                        <label htmlFor="login" className="teacher-settings__label">Логин</label>
                        <input type="text" id="login" placeholder="Логин" className="teacher-settings__input" />
                    </div>
                    <div className="teacher-settings__input-group">
                        <label htmlFor="password" className="teacher-settings__label">Пароль</label>
                        <div className="teacher-settings__password-input">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Пароль"
                                className="teacher-settings__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                className="teacher-settings__password-toggle"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </section>

                <button className="teacher-settings__apply-btn">Применить</button>
            </div>
        </main>
    );
};

export default TeacherSettingsMain;