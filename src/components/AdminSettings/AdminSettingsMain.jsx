import React, { useState } from 'react';
import '../../styles/AdminSettings/adminSettingsMain.css';
import { ChevronLeft, Eye, EyeOff, Upload } from 'lucide-react';

const AdminSettingsMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState('');
    const [settings, setSettings] = useState({
        averageRating: true,
        ratings: true,
        topReviews: true,
        comments: false
    });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSettingChange = (setting) => {
        setSettings(prevSettings => ({
            ...prevSettings,
            [setting]: !prevSettings[setting]
        }));
    };

    const handleApplyChanges = () => {
        console.log('Applying changes:', settings);
    };

    return (
        <main className="admin-settings__main">
            <h1 className="admin-settings__title">Настройки администратора</h1>

            <div className="admin-settings__container">
                <button className="admin-settings__back-button">
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-settings__profile">
                    <div className="admin-settings__avatar-container">
                        <div className="admin-user-edit__photo-placeholder">
                            <img src="/Generic avatar.svg" alt="Загрузить фото" />
                        </div>
                        <button className="admin-settings__avatar-upload"><Upload size={24} /></button>
                    </div>
                    <label htmlFor="login" className="admin-settings__label">ФИО</label>
                    <input type="text" placeholder="ФИО" className="admin-settings__name-input" />
                </div>

                <section className="admin-settings__account-access">
                    <h2 className="admin-settings__section-title">Доступ к моему аккаунту</h2>
                    <div className="alignment">
                        <div className="admin-settings__input-group">
                            <label htmlFor="login" className="admin-settings__label">Логин</label>
                            <input type="text" id="login" placeholder="Логин" className="admin-settings__input" />
                        </div>
                        <div className="admin-settings__input-group">
                            <label htmlFor="password" className="admin-settings__label">Пароль</label>
                            <div className="admin-settings__password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    placeholder="Пароль"
                                    className="admin-settings__input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button
                                    className="admin-settings__password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="admin-settings__visibility">
                    <h2 className="admin-settings__section-title">Преподаватели видят</h2>
                    <div className="admin-settings__toggle-group">
                        <label className="admin-settings__toggle">
                            <span className="admin-settings__toggle-label">Средняя оценка</span>
                            <input
                                type="checkbox"
                                checked={settings.averageRating}
                                onChange={() => handleSettingChange('averageRating')}
                                className="admin-settings__toggle-input"
                            />
                            <span className="admin-settings__toggle-slider"></span>
                        </label>
                        <label className="admin-settings__toggle">
                            <span className="admin-settings__toggle-label">Оценки</span>
                            <input
                                type="checkbox"
                                checked={settings.ratings}
                                onChange={() => handleSettingChange('ratings')}
                                className="admin-settings__toggle-input"
                            />
                            <span className="admin-settings__toggle-slider"></span>
                        </label>
                        <label className="admin-settings__toggle">
                            <span className="admin-settings__toggle-label">Топ 3 мини-отзыва</span>
                            <input
                                type="checkbox"
                                checked={settings.topReviews}
                                onChange={() => handleSettingChange('topReviews')}
                                className="admin-settings__toggle-input"
                            />
                            <span className="admin-settings__toggle-slider"></span>
                        </label>
                        <label className="admin-settings__toggle">
                            <span className="admin-settings__toggle-label">Комментарии</span>
                            <input
                                type="checkbox"
                                checked={settings.comments}
                                onChange={() => handleSettingChange('comments')}
                                className="admin-settings__toggle-input"
                            />
                            <span className="admin-settings__toggle-slider"></span>
                        </label>
                    </div>
                </section>

                <button className="admin-settings__apply-btn" onClick={handleApplyChanges}>Применить</button>
            </div>
        </main>
    );
};

export default AdminSettingsMain;