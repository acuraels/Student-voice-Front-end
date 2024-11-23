import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Импорт useNavigate
import { toast, ToastContainer } from 'react-toastify'; // Импорт Toastify
import 'react-toastify/dist/ReactToastify.css'; // Стили для Toastify
import '../../styles/TeacherSettings/teacherSettingsMain.css';
import { ChevronLeft, Eye, EyeOff, Upload } from 'lucide-react';
import UserInfoSettings from '../UserInfoSettings';
import axiosInstance from '../../utils/axiosInstance';

const TeacherSettingsMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [userData, setUserData] = useState({});
    const navigate = useNavigate(); // Для навигации

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Получение данных пользователя
    useEffect(() => {
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

    // Обработка отправки формы
    const handleSubmit = async (e) => {
        e.preventDefault(); // Предотвращаем стандартное поведение формы

        try {
            // Проверяем, нужно ли обновлять логин
            if (username !== userData.username) {
                await axiosInstance.put('api/accounts/update-profile/', { username });
                toast.success('Логин успешно обновлен');
                setUserData((prevData) => ({
                    ...prevData,
                    username: username,
                }));
            }

            // Проверяем, нужно ли обновлять пароль
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

    // Обработчик для кнопки "Назад"
    const handleBackClick = () => {
        navigate('/teacher-lessons'); // Переход на маршрут
    };

    return (
        <main className="teacher-settings__main">
            <h1 className="teacher-settings__title">Настройки преподавателя</h1>

            <div className="teacher-settings__container">
                <button
                    className="teacher-settings__back-button"
                    onClick={handleBackClick} // Обработчик кнопки
                >
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
                    <UserInfoSettings />
                    <form onSubmit={handleSubmit}>
                        <div className="teacher-settings__input-group">
                            <label htmlFor="login" className="teacher-settings__label">Логин</label>
                            <input
                                type="text"
                                id="login"
                                placeholder="Логин"
                                className="teacher-settings__input"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="teacher-settings__input-group">
                            <label htmlFor="old_password" className="teacher-settings__label">Старый пароль</label>
                            <div className="teacher-settings__password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="old_password"
                                    placeholder="Старый пароль"
                                    className="teacher-settings__input"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="teacher-settings__password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <div className="teacher-settings__input-group">
                            <label htmlFor="new_password" className="teacher-settings__label">Новый пароль</label>
                            <div className="teacher-settings__password-input">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="new_password"
                                    placeholder="Новый пароль"
                                    className="teacher-settings__input"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="teacher-settings__password-toggle"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" className="teacher-settings__apply-btn">Применить</button>
                    </form>
                </section>
            </div>
            <ToastContainer />
        </main>
    );
};

export default TeacherSettingsMain;
