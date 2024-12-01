import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AdminUserEdit/adminUserEditMain.css';
import { ChevronLeft, Upload, Eye, EyeOff, Trash2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const AdminUserEditMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    // Состояния для полей формы
    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [institute, setInstitute] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [visibleReviews, setVisibleReviews] = useState(false); // Добавляем состояние visibleReviews
    const [institutes, setInstitutes] = useState([]);
    const [errors, setErrors] = useState({});

    // Получение данных пользователя и списка институтов при монтировании компонента
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/api/accounts/edit-user/${id}/`);
                const data = response.data;
                setSurname(data.surname);
                setFirstName(data.first_name);
                setLastName(data.last_name);
                setRole(data.role);
                setInstitute(data.institute);
                setUsername(data.username);
                setIsActive(data.is_active);
                setVisibleReviews(data.visible_reviews); // Устанавливаем visibleReviews
            } catch (error) {
                console.error('Ошибка при получении данных пользователя:', error);
            }
        };

        const fetchInstitutes = async () => {
            try {
                const response = await axiosInstance.get('/api/institutes/');
                setInstitutes(response.data);
            } catch (error) {
                console.error('Ошибка при получении институтов:', error);
            }
        };

        if (id) {
            fetchUserData();
            fetchInstitutes();
        } else {
            console.error('ID пользователя не определен');
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/admin-users');
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const userData = {
            username,
            first_name: firstName,
            surname,
            last_name: lastName,
            role,
            institute,
            is_active: isActive,
            ...(password ? { password } : {}),
        };

        // Добавляем visible_reviews, если роль 'teacher'
        if (role === 'teacher') {
            userData.visible_reviews = visibleReviews;
        }

        axiosInstance.put(`/api/accounts/edit-user/${id}/`, userData)
            .then(response => {
                console.log('Пользователь обновлен:', response.data);
                navigate('/admin-users');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                } else {
                    console.error('Ошибка при обновлении пользователя:', error);
                }
            });
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/accounts/delete-user/${id}/`)
            .then(response => {
                console.log('Пользователь удален:', response.data);
                navigate('/admin-users');
            })
            .catch(error => {
                console.error('Ошибка при удалении пользователя:', error);
            });
    };

    const generateRandomPassword = () => {
        const length = 8;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;';
        let newPassword = '';
        for (let i = 0, n = charset.length; i < length; ++i) {
            newPassword += charset.charAt(Math.floor(Math.random() * n));
        }
        setPassword(newPassword);
    };

    return (
        <main className="admin-user-edit__main">
            <h1 className="admin-user-edit__title">Информация о пользователе</h1>

            <div className="admin-user-edit__container">
                <button
                    className="admin-uesr-edit__back-button"
                    onClick={handleBackClick}
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-user-edit__photo-container">
                    <div className="admin-user-edit__photo-placeholder">
                        <img src="/Generic avatar.svg" alt="Загрузить фото" />
                    </div>
                    <button className="admin-user-edit__photo-upload"><Upload size={24} /></button>
                </div>

                <form className="admin-user-edit__form" onSubmit={handleSubmit}>
                    <div className="admin-user-edit__form-group">
                        <label htmlFor="surName">Фамилия</label>
                        <input
                            type="text"
                            id="surName"
                            name="surName"
                            placeholder="Фамилия"
                            className="admin-user-edit__form-name__input"
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                        />
                        {errors.surname && <p className="error">{errors.surname}</p>}

                        <label htmlFor="firstName">Имя</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="Имя"
                            className="admin-user-edit__form-name__input"
                            required
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        {errors.first_name && <p className="error">{errors.first_name}</p>}

                        <label htmlFor="LastName">Отчество <span className="last-name-span">(опционально)</span> </label>
                        <input
                            type="text"
                            id="LastName"
                            name="LastName"
                            placeholder="Отчество"
                            className="admin-user-edit__form-name__input"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        {errors.last_name && <p className="error">{errors.last_name}</p>}
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="role">Роль</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            required
                        >
                            <option value="">Выберите роль</option>
                            <option value="teacher">Преподаватель</option>
                            <option value="admin">Администратор</option>
                        </select>
                        {errors.role && <p className="error">{errors.role}</p>}
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="institute">Институт</label>
                        <select
                            id="institute"
                            name="institute"
                            value={institute}
                            onChange={(e) => setInstitute(e.target.value)}
                            required
                        >
                            <option value="">Выберите институт</option>
                            {institutes.map((inst) => (
                                <option key={inst.id} value={inst.id}>
                                    {inst.name}
                                </option>
                            ))}
                        </select>
                        {errors.institute && <p className="error">{errors.institute}</p>}
                    </div>

                    {/* Добавляем переключатель активации пользователя */}
                    <div className="admin-user-edit__form-group">
                        <label htmlFor="isActive">Активен</label>
                        <input
                            type="checkbox"
                            id="isActive"
                            name="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                        />
                    </div>

                    {/* Добавляем чекбокс видимости отзывов, только если роль 'teacher' */}
                    {role === 'teacher' && (
                        <div className="admin-user-edit__form-group">
                            <label htmlFor="visibleReviews">Видимость отзывов</label>
                            <input
                                type="checkbox"
                                id="visibleReviews"
                                name="visibleReviews"
                                checked={visibleReviews}
                                onChange={(e) => setVisibleReviews(e.target.checked)}
                            />
                        </div>
                    )}

                    <h2 className="admin-user-edit__subtitle">Доступ</h2>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="login">Логин</label>
                        <input
                            type="text"
                            id="login"
                            name="login"
                            placeholder="Логин"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                        {errors.username && <p className="error">{errors.username}</p>}
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="admin-user-edit__password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Пароль"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                className="admin-user-edit__password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button
                            type="button"
                            className="admin-user-edit__generate-password"
                            onClick={generateRandomPassword}
                        >
                            Генерировать
                        </button>
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className="admin-user-edit__form-actions">
                        <button type="submit" className="admin-user-edit__submit-btn">Применить</button>
                        <button
                            type="button"
                            className="admin-user-edit__delete-btn"
                            onClick={handleDelete}
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AdminUserEditMain;

