import React, { useState } from 'react';
import '../../styles/AdminUserEdit/adminUserEditMain.css';
import { ChevronLeft, Upload, Eye, EyeOff, Trash2 } from 'lucide-react';

const AdminUserEditMain = () => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <main className="admin-user-edit__main">
            <h1 className="admin-user-edit__title">Информация о пользователе</h1>

            <div className="admin-user-edit__container">
                <button className="admin-uesr-edit__back-button">
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-user-edit__photo-container">
                    <div className="admin-user-edit__photo-placeholder">
                        <img src="/Generic avatar.svg" alt="Загрузить фото" />
                    </div>
                    <button className="admin-user-edit__photo-upload"><Upload size={24} /></button>
                </div>

                <form className="admin-user-edit__form">
                    <div className="admin-user-edit__form-group">
                        <label htmlFor="fullName">ФИО</label>
                        <input type="text" id="fullName" name="fullName" placeholder="ФИО" />
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="role">Роль</label>
                        <input type="text" id="role" name="role" placeholder="Роль" />
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="institute">Институт</label>
                        <select id="institute" name="institute">
                            <option value="">Выберите институт</option>
                            {/* Добавлять опции институтов позже надо здесь */}
                        </select>
                    </div>

                    <h2 className="admin-user-edit__subtitle">Доступ</h2>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="login">Логин</label>
                        <input type="text" id="login" name="login" placeholder="Логин" />
                    </div>

                    <div className="admin-user-edit__form-group">
                        <label htmlFor="password">Пароль</label>
                        <div className="admin-user-edit__password-container">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                placeholder="Пароль"
                            />
                            <button
                                type="button"
                                className="admin-user-edit__password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <button type="button" className="admin-user-edit__generate-password">
                            Генерировать
                        </button>
                    </div>

                    <div className="admin-user-edit__form-actions">
                        <button type="submit" className="admin-user-edit__submit-btn">Применить</button>
                        <button type="button" className="admin-user-edit__delete-btn">
                            <Trash2 size={20} />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default AdminUserEditMain;