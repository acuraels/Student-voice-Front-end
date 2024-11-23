import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { toast, ToastContainer } from 'react-toastify'; // Импорт Toastify
import 'react-toastify/dist/ReactToastify.css'; // Стили для Toastify
import '../../styles/adminSettings/adminSettingsMain.css';
import { ChevronLeft, Eye, EyeOff, Upload } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import UserInfoSettings from '../UserInfoSettings'; // Импортируем компонент

const AdminSettingsMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [settings, setSettings] = useState({
        averageRating: true,
        ratings: true,
        topReviews: true,
        comments: false,
    });
    const [userData, setUserData] = useState({});
    const navigate = useNavigate(); // Для маршрутизации

    useEffect(() => {
        // Получаем текущие данные пользователя
        axiosInstance.get('api/accounts/user-info/')
            .then((response) => {
                setUsername(response.data.username);
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных пользователя:', error);
                toast.error('Ошибка при загрузке данных пользователя');
            });
    }, []);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleSettingChange = (setting) => {
        setSettings((prevSettings) => ({
            ...prevSettings,
            [setting]: !prevSettings[setting],
        }));
    };

    const handleApplyChanges = () => {
        toast.success('Настройки успешно применены.');
        console.log('Применение настроек:', settings);
        // Реализуйте сохранение настроек на бэкенде здесь
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Обновление логина, если он изменился
            if (username !== userData.username) {
                await axiosInstance.put('api/accounts/update-profile/', { username });
                toast.success('Логин успешно обновлен');
                setUserData((prevData) => ({
                    ...prevData,
                    username: username,
                }));
            }

            // Обновление пароля, если указаны старый и новый пароли
            if (newPassword && oldPassword) {
                await axiosInstance.post('api/accounts/change-password/', {
                    old_password: oldPassword,
                    new_password: newPassword,
                });
                toast.success('Пароль успешно изменен');
            } else if (newPassword || oldPassword) {
                toast.warning('Пожалуйста, заполните оба поля для смены пароля.');
            }

            // Сбрасываем поля формы после успешного обновления
            setOldPassword('');
            setNewPassword('');
        } catch (error) {
            console.error('Ошибка при обновлении данных:', error);
            if (error.response && error.response.data) {
                toast.error(`Ошибка: ${JSON.stringify(error.response.data)}`);
            }
        }
    };

    const handleBackClick = () => {
        navigate('/admin-users'); // Переход на маршрут /admin-users
    };

    return (
        <main className="admin-settings__main">
            <ToastContainer />
            <h1 className="admin-settings__title">Настройки администратора</h1>

            <div className="admin-settings__container">
                <button
                    className="admin-settings__back-button"
                    onClick={handleBackClick} // Обработчик клика для кнопки "Назад"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-settings__profile">
                    <div className="admin-settings__avatar-container">
                        <div className="admin-user-edit__photo-placeholder">
                            <img src="/Generic avatar.svg" alt="Загрузить фото" />
                        </div>
                        <button className="admin-settings__avatar-upload"><Upload size={24} /></button>
                    </div>

                    {/* Отображение ФИО пользователя */}
                    <UserInfoSettings />

                    {/* Поле для ввода логина */}
                    <label htmlFor="username" className="admin-settings__label">Логин</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Логин"
                        className="admin-settings__name-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>

                <section className="admin-settings__account-access">
                    <h2 className="admin-settings__section-title">Доступ к моему аккаунту</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="alignment">
                            <div className="admin-settings__input-group">
                                <label htmlFor="old_password" className="admin-settings__label">Старый пароль</label>
                                <div className="admin-settings__password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="old_password"
                                        placeholder="Старый пароль"
                                        className="admin-settings__input"
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="admin-settings__password-toggle"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                            <div className="admin-settings__input-group">
                                <label htmlFor="new_password" className="admin-settings__label">Новый пароль</label>
                                <div className="admin-settings__password-input">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="new_password"
                                        placeholder="Новый пароль"
                                        className="admin-settings__input"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <button
                                        type="button"
                                        className="admin-settings__password-toggle"
                                        onClick={togglePasswordVisibility}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="admin-settings__apply-btn">Применить</button>
                    </form>
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

                <button className="admin-settings__apply-btn" onClick={handleApplyChanges}>Применить настройки</button>
            </div>
        </main>
    );
};

export default AdminSettingsMain;
