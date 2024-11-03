import React, { useState, useEffect } from 'react';
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

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        axiosInstance.get('api/user-info/')
            .then((response) => {
                setUsername(response.data.username);
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Ошибка при получении данных пользователя:', error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (username !== userData.username) {
            axiosInstance.put('api/update-profile/', { username })
                .then((response) => {
                    alert('Логин успешно обновлен');
                    setUserData((prevData) => ({
                        ...prevData,
                        username: username,
                    }));
                })
                .catch((error) => {
                    console.error('Ошибка при обновлении логина:', error);
                    if (error.response && error.response.data) {
                        alert(JSON.stringify(error.response.data));
                    }
                });
        }

        if (newPassword && oldPassword) {
            axiosInstance.post('api/change-password/', {
                old_password: oldPassword,
                new_password: newPassword
            })
                .then((response) => {
                    alert('Пароль успешно изменен');
                })
                .catch((error) => {
                    console.error('Ошибка при смене пароля:', error);
                    if (error.response && error.response.data) {
                        alert(JSON.stringify(error.response.data));
                    }
                });
        } else if (newPassword || oldPassword) {
            alert('Пожалуйста, заполните оба поля для смены пароля.');
        }
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
        </main>
    );
};

export default TeacherSettingsMain;