import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/AdminUserEdit/adminUserEditMain.css';
import { ChevronLeft, Upload, Eye, EyeOff, Trash2 } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminUserEditMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [institute, setInstitute] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [visibleReviews, setVisibleReviews] = useState(false);
    const [institutes, setInstitutes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axiosInstance.get(`/api/accounts/edit-user/${id}/`);
                const data = response.data;
                setSurname(data.surname || '');
                setFirstName(data.first_name || '');
                setLastName(data.last_name || '');
                setRole(data.role || '');
                setInstitute(data.institute || '');
                setUsername(data.username || '');
                setIsActive(data.is_active);
                setVisibleReviews(data.visible_reviews);
            } catch (error) {
                toast.error('Не удалось получить данные пользователя');
            }
        };

        const fetchInstitutes = async () => {
            try {
                const response = await axiosInstance.get('/api/institutes/');
                setInstitutes(response.data);
            } catch (error) {
                toast.error('Не удалось получить список институтов');
            }
        };

        if (id) {
            fetchUserData();
            fetchInstitutes();
        } else {
            toast.error('ID пользователя не определен');
        }
    }, [id]);

    const handleBackClick = () => {
        navigate('/admin-users');
    };

    const validateForm = () => {
        const newErrors = {};

        // Валидируем фамилию
        if (!surname.trim()) {
            newErrors.surname = 'Фамилия не может быть пустой';
        } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(surname)) {
            newErrors.surname = 'В фамилии допустимы только буквы';
        }

        // Валидируем имя
        if (!firstName.trim()) {
            newErrors.first_name = 'Имя не может быть пустым';
        } else if (!/^[а-яА-ЯёЁa-zA-Z]+$/.test(firstName)) {
            newErrors.first_name = 'В имени допустимы только буквы';
        }

        // Отчество (необязательное, но если пользователь ввел, проверяем)
        if (lastName && !/^[а-яА-ЯёЁa-zA-Z]+$/.test(lastName)) {
            newErrors.last_name = 'В отчестве допустимы только буквы';
        }

        // Роль
        if (!role) {
            newErrors.role = 'Выберите роль';
        }

        // Институт
        if (!institute) {
            newErrors.institute = 'Выберите институт';
        }

        // Логин
        if (!username.trim()) {
            newErrors.username = 'Логин не может быть пустым';
        }

        // Если пароль введен (при обновлении), можно добавить проверку на длину
        if (password && password.length < 6) {
            newErrors.password = 'Пароль должен содержать минимум 6 символов';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            // Выводим тосты об ошибках
            Object.values(newErrors).forEach((errMsg) => toast.error(errMsg));
            return false;
        }
        return true;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

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

        if (role === 'teacher') {
            userData.visible_reviews = visibleReviews;
        }

        axiosInstance.put(`/api/accounts/edit-user/${id}/`, userData)
            .then(response => {
                toast.success('Данные пользователя успешно обновлены');
                navigate('/admin-users');
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                    Object.values(error.response.data).forEach((errMsg) => toast.error(errMsg));
                } else {
                    toast.error('Ошибка при обновлении пользователя');
                }
            });
    };

    const handleDelete = () => {
        axiosInstance.delete(`/api/accounts/delete-user/${id}/`)
            .then(response => {
                toast.success('Пользователь удален');
                navigate('/admin-users');
            })
            .catch(() => {
                toast.error('Ошибка при удалении пользователя');
            });
    };

    const generateRandomPassword = () => {
        const length = 8;
        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;';
        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        toast.info('Пароль сгенерирован');
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
                    <button className="admin-user-edit__photo-upload">
                        <Upload size={24} />
                    </button>
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

                        <label htmlFor="LastName">
                            Отчество <span className="last-name-span">(опционально)</span>
                        </label>
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
                                type={showPassword ? 'text' : 'password'}
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
                        <button type="submit" className="admin-user-edit__submit-btn">
                            Применить
                        </button>
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

