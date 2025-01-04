import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify"; // Импорт Toastify
import "react-toastify/dist/ReactToastify.css"; // Стили Toastify
import "../.././styles/FormPage/formPageMain.css";
import { Eye, EyeOff } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";

const FormPageMain = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCredentials({
            ...credentials,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!credentials.username || !credentials.password) {
            toast.error("Пожалуйста, заполните все поля!");
            return;
        }

        axiosInstance
            .post("api/accounts/token/", credentials)
            .then((response) => {
                localStorage.setItem("access_token", response.data.access);
                localStorage.setItem("refresh_token", response.data.refresh);

                axiosInstance.defaults.headers["Authorization"] = "Bearer " + response.data.access;

                axiosInstance.get("api/accounts/user-info/").then((res) => {
                    localStorage.setItem("user_role", res.data.role);
                    const userRole = res.data.role;

                    toast.success("Вход выполнен успешно!");
                    if (userRole === "admin") {
                        navigate("/admin-users");
                    } else if (userRole === "teacher") {
                        localStorage.setItem("user_id", res.data.id);
                        navigate("/teacher-lessons");
                    } else {
                        navigate("/unauthorized");
                    }
                });
            })
            .catch((error) => {
                console.error("Login error:", error);
                toast.error("Ошибка входа. Проверьте логин или пароль.");
            });
    };

    return (
        <main className="main">
            <div className="main__container">
                <div className="main__content">
                    <div className="main__image-container">
                        <img src="/infografic.png" alt="Infographic" className="main__image" />
                    </div>
                    <div className="main__form-wrapper">
                        <h2 className="main__title">Вход</h2>
                        <div className="main__form-container">
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="form__group">
                                    <label htmlFor="username" className="form__label">
                                        Логин
                                    </label>
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Ваш логин"
                                        className="form__input"
                                        value={credentials.username}
                                        onChange={handleInputChange}
                                        required // Поле обязательно для заполнения
                                    />
                                </div>
                                <div className="form__group">
                                    <label htmlFor="password" className="form__label">
                                        Пароль
                                    </label>
                                    <div className="form__password-container">
                                        <input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Ваш пароль"
                                            className="form__input"
                                            value={credentials.password}
                                            onChange={handleInputChange}
                                            required // Поле обязательно для заполнения
                                        />
                                        <button
                                            type="button"
                                            className="form__password-toggle"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>
                                </div>
                                <button type="submit" className="form__button">
                                    Войти
                                </button>
                            </form>
                            {/*<Link to="/forgot-password" className="form__link">Забыли пароль?</Link>
              <Link to="/register" className="form__link">Зарегистрироваться</Link>*/}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-center" autoClose={3000} /> {/* Контейнер для уведомлений */}
        </main>
    );
};

export default FormPageMain;
