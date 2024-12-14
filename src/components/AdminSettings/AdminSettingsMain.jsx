import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/adminSettings/adminSettingsMain.css';
import { ChevronLeft, Eye, EyeOff, Upload } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import UserInfoSettings from '../UserInfoSettings';

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
    const [teachersCanSeeReviews, setTeachersCanSeeReviews] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserData = async () => {
            try {
                const response = await axiosInstance.get('api/accounts/user-info/');
                setUsername(response.data.username);
                setUserData(response.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных пользователя:', error);
                toast.error('Ошибка при загрузке данных пользователя');
            }
        };

        const loadReviewsVisibility = async () => {
            try {
                const resp = await axiosInstance.get('/api/accounts/teachers/reviews-visibility/');
                setTeachersCanSeeReviews(resp.data.visible_reviews);
            } catch (err) {
                console.error('Ошибка при получении состояния отзывов:', err);
                // Можно оставить по умолчанию true
            }
        };

        loadUserData();
        loadReviewsVisibility();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (username !== userData.username) {
                await axiosInstance.put('api/accounts/update-profile/', { username });
                toast.success('Логин успешно обновлен');
                setUserData((prevData) => ({
                    ...prevData,
                    username: username,
                }));
            }

            if (newPassword && oldPassword) {
                await axiosInstance.post('api/accounts/change-password/', {
                    old_password: oldPassword,
                    new_password: newPassword,
                });
                toast.success('Пароль успешно изменен');
            } else if (newPassword || oldPassword) {
                toast.warning('Пожалуйста, заполните оба поля для смены пароля.');
            }

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
        navigate('/admin-users');
    };

    const handleToggleReviewsForTeachers = async () => {
        try {
            const response = await axiosInstance.post('/api/accounts/teachers/toggle-reviews/', {
                visible_reviews: !teachersCanSeeReviews
            });
            setTeachersCanSeeReviews(!teachersCanSeeReviews);
            toast.success('Видимость отзывов для преподавателей обновлена');
        } catch (error) {
            console.error('Ошибка при обновлении видимости отзывов для преподавателей:', error);
            toast.error('Ошибка при обновлении видимости отзывов');
        }
    };

    return (
        <main className="admin-settings__main">
            <ToastContainer />
            <h1 className="admin-settings__title">Настройки администратора</h1>

            <div className="admin-settings__container">
                <button
                    className="admin-settings__back-button"
                    onClick={handleBackClick}
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

                    <UserInfoSettings />

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

                <div className="admin-settings__reviews-toggle-container">
                    <h2 className="admin-settings__section-title">Видимость отзывов для преподавателей</h2>
                    <p className="meow">Текущее состояние: {teachersCanSeeReviews ? "Включены" : "Выключены"}</p>
                    <button className="admin-settings__apply-btn" onClick={handleToggleReviewsForTeachers}>
                        {teachersCanSeeReviews ? "Выключить отзывы" : "Включить отзывы"}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default AdminSettingsMain;

