import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/TeacherLessonCreate/teacherLessonCreateMain.css';
import { ChevronLeft, Copy, Download, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify'; // Импорт react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Стили для уведомлений

const TeacherLessonCreateMain = () => {
    const [qrCode, setQrCode] = useState(null);
    const [institutes, setInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [formData, setFormData] = useState({
        teacher_id: '',
        date: '',
        topic: '',
        location: '',
        startTime: '',
        endTime: '',
        discipline: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axiosInstance.get('/api/accounts/current-user/');
                const user = userResponse.data;
                setUserData(user);

                const institutesResponse = await axiosInstance.get('/api/institutes/');
                setInstitutes(institutesResponse.data);

                if (user.institute && user.institute.id) {
                    setSelectedInstitute(user.institute.id);
                }

                const subjectsResponse = await axiosInstance.get('/api/subjects/teacher-subjects/');
                setSubjects(subjectsResponse.data);
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                toast.error('Не удалось загрузить данные.'); // Сообщение об ошибке
            }
        };

        fetchData();
    }, []);

    const handleInstituteChange = (e) => {
        setSelectedInstitute(e.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleBackClick = () => {
        navigate('/teacher-lessons');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedInstitute) {
            toast.warn('Пожалуйста, выберите институт.');
            return;
        }
        if (!formData.discipline) {
            toast.warn('Пожалуйста, выберите дисциплину.');
            return;
        }
        if (!formData.topic.trim()) {
            toast.warn('Пожалуйста, введите тему.');
            return;
        }
        if (!formData.location.trim()) {
            toast.warn('Пожалуйста, введите место проведения.');
            return;
        }
        if (!formData.date || !formData.startTime || !formData.endTime) {
            toast.warn('Пожалуйста, заполните дату и время проведения.');
            return;
        }

        try {
            const { date, startTime, endTime } = formData;
            const startDateTime = `${date}T${startTime}:00`;
            const endDateTime = `${date}T${endTime}:00`;
            const teacherId = localStorage.getItem('user_id');

            const data = {
                teacher: teacherId,
                institute: selectedInstitute,
                subject: formData.discipline,
                topic: formData.topic,
                location: formData.location,
                start_time: startDateTime,
                end_time: endDateTime,
            };
            console.log(data);
            const response = await axiosInstance.post('/api/lessons/', {
                teacher: teacherId,
                institute: selectedInstitute,
                subject: formData.discipline,
                topic: formData.topic,
                location: formData.location,
                start_time: startDateTime,
                end_time: endDateTime,
            });

            toast.success('Урок успешно сохранён.');

            const qrCodeBase64 = response.data.qr_code;
            if (qrCodeBase64) {
                setQrCode(qrCodeBase64);
            } else {
                toast.error('Не удалось получить QR-код.');
            }

            const uniqueCode = response.data.unique_code;
            if (uniqueCode) {
                navigate(`/teacher-lesson-edit/${uniqueCode}`);
            } else {
                toast.error('Ошибка: не удалось определить уникальный код.');
            }

        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Ошибка валидации:', error.response.data);
                toast.error(`Ошибка при сохранении урока: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error('Ошибка при отправке формы:', error);
                toast.error('Ошибка при сохранении урока.');
            }
        }
    };

    return (
        <main className="teacher-lesson-create__main">
            <ToastContainer /> {/* Контейнер для уведомлений */}
            <h1 className="teacher-lesson-create__title">Информация о паре</h1>

            <div className="teacher-lesson-create__container">
                <div className="teacher-lesson-create__header">
                    <button
                        className="teacher-lesson-create__back-button"
                        onClick={handleBackClick}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button className="teacher-lesson-create__copy-button">
                        <Copy size={24} />
                    </button>
                </div>

                <form className="teacher-lesson-create__form" onSubmit={handleSubmit}>
                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="institute">Институт</label>
                        <select
                            id="institute"
                            name="institute"
                            value={selectedInstitute}
                            onChange={handleInstituteChange}
                        >
                            <option value="">Выберите институт</option>
                            {institutes.map((institute) => (
                                <option key={institute.id} value={institute.id}>
                                    {institute.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="teacherName">ФИО преподавателя</label>
                        <input
                            type="text"
                            id="teacherName"
                            name="teacherName"
                            value={
                                userData
                                    ? `${userData.first_name} ${userData.surname} ${userData.last_name || ''}`
                                    : ''
                            }
                            readOnly
                        />
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="discipline">Дисциплина</label>
                        <select
                            id="discipline"
                            name="discipline"
                            value={formData.discipline}
                            onChange={handleInputChange}
                        >
                            <option value="">Выберите дисциплину</option>
                            {subjects.map((subject) => (
                                <option key={subject.id} value={subject.id}>
                                    {subject.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="topic">Тема</label>
                        <input
                            type="text"
                            id="topic"
                            name="topic"
                            placeholder="Тема пары"
                            value={formData.topic}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="location">Место проведения</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            placeholder="Место"
                            value={formData.location}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="date">Дата проведения</label>
                        <input
                            type="date"
                            id="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                        />
                    </div>

                    <div className="teacher-lesson-create__form-group teacher-lesson-create__time-group">
                        <div>
                            <label htmlFor="startTime">Начало</label>
                            <input
                                type="time"
                                id="startTime"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="endTime">Конец</label>
                            <input
                                type="time"
                                id="endTime"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                    <div className="teacher-lesson-create__form-actions">
                        <button
                            type="submit"
                            className="teacher-lesson-create__submit-button"
                        >
                            Применить
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default TeacherLessonCreateMain;