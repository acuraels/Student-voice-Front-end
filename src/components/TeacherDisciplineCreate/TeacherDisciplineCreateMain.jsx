// src/components/TeacherDisciplineCreateMain.jsx

import React, { useState, useEffect } from 'react';
import '../../styles/TeacherDisciplineCreate/teacherDisciplineCreateMain.css';
import { ChevronLeft, Trash2, ChevronDown } from 'lucide-react';
import axiosInstance from '../../utils/axiosInstance'; // Предполагается, что axiosInstance настроен с необходимыми заголовками
import { toast, ToastContainer } from 'react-toastify'; // Для уведомлений
import 'react-toastify/dist/ReactToastify.css';

const TeacherDisciplineCreateMain = () => {
    const [discipline, setDiscipline] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [disciplines, setDisciplines] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [userId, setUserId] = useState(null); // Состояние для хранения user_id

    // Получение user_id из localStorage при монтировании компонента
    useEffect(() => {
        const storedUserId = localStorage.getItem('user_id');
        if (storedUserId) {
            setUserId(storedUserId);
        } else {
            console.warn('user_id не найден в localStorage');
            // Вы можете перенаправить пользователя или показать сообщение об ошибке
        }
    }, []);

    // Функция для получения списка дисциплин
    const fetchDisciplines = async () => {
        try {
            const response = await axiosInstance.get('/api/subjects/');
            setDisciplines(response.data);
        } catch (error) {
            console.error('Ошибка при получении дисциплин:', error);
            toast.error('Не удалось загрузить дисциплины.');
        }
    };

    useEffect(() => {
        fetchDisciplines();
    }, []);

    // Функция для добавления дисциплины
    const handleAddDiscipline = async () => {
        const trimmedDiscipline = discipline.trim();
        if (trimmedDiscipline && !disciplines.some(d => d.name.toLowerCase() === trimmedDiscipline.toLowerCase())) {
            try {
                const response = await axiosInstance.post('/api/subjects/', { name: trimmedDiscipline });
                setDisciplines([...disciplines, response.data]);
                setDiscipline(''); // Очистить поле ввода
                setIsOpen(false);
                toast.success('Дисциплина успешно добавлена!');
            } catch (error) {
                console.error('Ошибка при добавлении дисциплины:', error);
                toast.error('Не удалось добавить дисциплину.');
            }
        } else {
            toast.warn('Введите уникальное название дисциплины.');
        }
    };

    // Функция для удаления дисциплины
    const handleDelete = async (id) => {
        setIsShaking(true);
        try {
            await axiosInstance.delete(`/api/subjects/${id}/`);
            setDisciplines(disciplines.filter(d => d.id !== id));
            toast.success('Дисциплина успешно удалена!');
        } catch (error) {
            console.error('Ошибка при удалении дисциплины:', error);
            toast.error('Не удалось удалить дисциплину.');
        } finally {
            setTimeout(() => setIsShaking(false), 820);
        }
    };

    // Обработчик выбора дисциплины из списка
    const handleSelectOption = (option) => {
        setDiscipline(option.name);
        setIsOpen(false);
    };

    // Обработчик изменения ввода
    const handleInputChange = (e) => {
        setDiscipline(e.target.value);
    };

    // Обработчик отправки формы (нажатие Enter)
    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddDiscipline();
    };

    return (
        <main className="teacher-discipline-create__main">
            <ToastContainer />
            <div className="teacher-discipline-create__main-container">
                <button className="teacher-discipline-create__back-btn">
                    <ChevronLeft size={24} />
                </button>
                <div className="teacher-discipline-create__content">
                    <form className="teacher-discipline-create__input-group" onSubmit={handleSubmit}>
                        <label htmlFor="discipline" className="teacher-discipline-create__label">Дисциплина</label>
                        <div className="teacher-discipline-create__custom-select">
                            <input
                                type="text"
                                id="discipline"
                                className="teacher-discipline-create__input"
                                value={discipline}
                                onChange={handleInputChange}
                                onFocus={() => setIsOpen(true)}
                                placeholder="Выберите или введите дисциплину"
                            />
                            <button
                                type="button"
                                className="teacher-discipline-create__dropdown-toggle"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <ChevronDown size={20} />
                            </button>
                            {isOpen && (
                                <ul className="teacher-discipline-create__options">
                                    {disciplines.map((option) => (
                                        <li
                                            key={option.id}
                                            onClick={() => handleSelectOption(option)}
                                            className="teacher-discipline-create__option"
                                        >
                                            {option.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </form>
                    <div className="teacher-discipline-create__actions">
                        <button
                            type="button"
                            className="teacher-discipline-create__apply-btn"
                            onClick={handleAddDiscipline}
                        >
                            Применить
                        </button>
                        <button
                            type="button"
                            className={`teacher-discipline-create__delete-btn ${isShaking ? 'shake' : ''}`}
                            onClick={() => {
                                if (discipline.trim()) {
                                    const selectedDiscipline = disciplines.find(d => d.name.toLowerCase() === discipline.toLowerCase());
                                    if (selectedDiscipline) {
                                        handleDelete(selectedDiscipline.id);
                                    } else {
                                        toast.warn('Выбранная дисциплина не найдена.');
                                    }
                                } else {
                                    toast.warn('Введите название дисциплины для удаления.');
                                }
                            }}
                            disabled={!discipline.trim()}
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default TeacherDisciplineCreateMain;
