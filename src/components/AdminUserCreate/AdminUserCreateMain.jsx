import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../styles/AdminUserEdit/adminUserEditMain.css';
import { ChevronLeft, Upload, Eye, EyeOff } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance';

const AdminUserCreateMain = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const [surname, setSurname] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const [institute, setInstitute] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [institutes, setInstitutes] = useState([]);

    useEffect(() => {
        axiosInstance.get('/api/institutes/')
            .then((response) => {
                setInstitutes(response.data);
            })
            .catch((error) => {
                console.error('Error fetching institutes:', error);
                toast.error('Ошибка загрузки институтов');
            });
    }, []);

    const handleBackClick = () => {
        navigate('/admin-users');
    };

    const validateFields = () => {
        const validationErrors = {};
        if (!surname.trim()) validationErrors.surname = 'Фамилия обязательна';
        if (!firstName.trim()) validationErrors.first_name = 'Имя обязательно';
        if (!role) validationErrors.role = '';
        if (!institute) validationErrors.institute = '';
        if (!username.trim()) validationErrors.username = 'Логин обязателен';
        if (!password.trim()) validationErrors.password = 'Пароль обязателен';
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!validateFields()) {
            toast.error('Проверьте правильность заполнения полей');
            return;
        }

        const userData = {
            username,
            password,
            first_name: firstName,
            surname,
            last_name: lastName || '',
            role,
            institute,
        };

        axiosInstance.post('/api/accounts/create-user/', userData)
            .then((response) => {
                toast.success('Пользователь успешно создан');
                navigate('/admin-users');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                } else {
                    console.error('Error:', error);
                }
                toast.error('Ошибка создания пользователя');
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
        toast.info('Пароль сгенерирован');
    };

    return (
        <main className="admin-user-edit__main">
            <ToastContainer />
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
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="role">Роль</label>
                        <select
                            id="role"
                            name="role"
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
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
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AdminUserCreateMain;
