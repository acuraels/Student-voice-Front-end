import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/TeacherLessonCreate/teacherLessonCreateMain.css';
import { ChevronLeft, Copy, Download, Trash2 } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TeacherLessonEditMain = () => {
    const { unique_code } = useParams();
    const navigate = useNavigate();

    const [qrCode, setQrCode] = useState(null);
    const [institutes, setInstitutes] = useState([]);
    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [subjects, setSubjects] = useState([]);
    const [userData, setUserData] = useState(null);
    const [feedbackLink, setFeedbackLink] = useState('');
    const [formData, setFormData] = useState({
        teacher_id: '',
        date: '',
        topic: '',
        location: '',
        startTime: '',
        endTime: '',
        discipline: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponse = await axiosInstance.get('/api/accounts/current-user/');
                setUserData(userResponse.data);

                const institutesResponse = await axiosInstance.get('/api/institutes/');
                setInstitutes(institutesResponse.data);

                const subjectsResponse = await axiosInstance.get('/api/subjects/teacher-subjects/');
                setSubjects(subjectsResponse.data);

                const lessonResponse = await axiosInstance.get(`/api/lessons/${unique_code}/`);
                const lesson = lessonResponse.data;

                setFeedbackLink(`${lesson.unique_link}feedback`);
                setQrCode(lesson.qr_code_base64);
                setSelectedInstitute(lesson.institute);

                const startDate = new Date(lesson.start_time);
                const endDate = new Date(lesson.end_time);

                setFormData({
                    teacher_id: lesson.teacher,
                    date: startDate.toISOString().split('T')[0],
                    topic: lesson.topic,
                    location: lesson.location,
                    startTime: startDate.toTimeString().slice(0, 5),
                    endTime: endDate.toTimeString().slice(0, 5),
                    discipline: lesson.subject,
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных:', error);
                toast.error('Ошибка при загрузке данных.');
            }
        };

        fetchData();
    }, [unique_code]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(feedbackLink);
        toast.success('Ссылка скопирована в буфер обмена.');
    };

    const handleIncreaseTime = async () => {
        try {
            await axiosInstance.patch(`/api/lessons/${unique_code}/increase-time/`);
            toast.success('Время действия ссылки увеличено на 10 минут.');
        } catch (error) {
            console.error('Ошибка при увеличении времени действия ссылки:', error);
            toast.error('Ошибка при увеличении времени действия ссылки.');
        }
    };

    const handleDownloadQR = () => {
        if (!qrCode) {
            toast.error('QR-код не найден.');
            return;
        }
        const link = document.createElement('a');
        link.href = `data:image/png;base64,${qrCode}`;
        link.download = 'qr_code.png';
        link.click();
        toast.success('QR-код скачан.');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { date, startTime, endTime } = formData;

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
            if (!date || !startTime || !endTime) {
                toast.warn('Пожалуйста, заполните дату и время проведения.');
                return;
            }

            const startDateTime = `${date}T${startTime}:00`;
            const endDateTime = `${date}T${endTime}:00`;

            const updateData = {
                teacher: formData.teacher_id || localStorage.getItem('user_id'),
                institute: selectedInstitute,
                subject: formData.discipline,
                topic: formData.topic,
                location: formData.location,
                start_time: startDateTime,
                end_time: endDateTime,
            };

            await axiosInstance.put(`/api/lessons/${unique_code}/`, updateData);
            toast.success('Данные урока обновлены.');
        } catch (error) {
            if (error.response && error.response.data) {
                console.error('Ошибка валидации:', error.response.data);
                toast.error(`Ошибка: ${JSON.stringify(error.response.data)}`);
            } else {
                console.error('Ошибка при отправке формы:', error);
                toast.error('Ошибка при обновлении урока.');
            }
        }
    };

    const handleDelete = async () => {
        const confirmDelete = window.confirm('Вы уверены, что хотите удалить этот урок?');
        if (!confirmDelete) return;

        try {
            await axiosInstance.delete(`/api/lessons/${unique_code}/delete/`);
            toast.success('Урок удалён.');
            navigate('/teacher-lessons');
        } catch (error) {
            console.error('Ошибка при удалении урока:', error);
            toast.error('Ошибка при удалении урока.');
        }
    };

    return (
        <main className="teacher-lesson-create__main">
            <ToastContainer />
            <h1 className="teacher-lesson-create__title">Информация о паре</h1>

            <div className="teacher-lesson-create__container">
                <div className="teacher-lesson-create__header">
                    <button
                        className="teacher-lesson-create__back-button"
                        onClick={() => navigate(-1)}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="teacher-lesson-create__copy-button"
                        onClick={handleCopyLink}
                    >
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
                            onChange={(e) => setSelectedInstitute(e.target.value)}
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

                    <div className="teacher-lesson-create__qr-section">
                        <div className="teacher-lesson-create__qr-container">
                            {qrCode ? (
                                <img
                                    src={`data:image/png;base64,${qrCode}`}
                                    alt="QR Code"
                                    className="teacher-lesson-create__qr-code"
                                />
                            ) : (
                                <p className="teacher-lesson-create__generate-qr">
                                    Здесь будет ваш QR
                                </p>
                            )}
                        </div>
                        <div className="teacher-lesson-create__qr-actions">
                            <button
                                type="button"
                                className="teacher-lesson-create__qr-action-button"
                                onClick={handleDownloadQR}
                            >
                                <Download size={24} />
                                Скачать
                            </button>
                            <button
                                type="button"
                                className="teacher-lesson-create__qr-action-button"
                                onClick={handleCopyLink}
                            >
                                <Copy size={24} />
                                Ссылка
                            </button>
                            <button
                                type="button"
                                className="teacher-lesson-create__qr-action-button"
                                onClick={() => {
                                    handleIncreaseTime(); // Выполняем функцию увеличения времени
                                    window.location.reload(); // Обновляем страницу
                                }}
                            >
                                Продлить QR код на 10 минут
                            </button>
                        </div>
                    </div>

                    <div className="teacher-lesson-create__form-actions">
                        <button
                            type="submit"
                            className="teacher-lesson-create__submit-button"
                        >
                            Применить
                        </button>
                        <button
                            type="button"
                            className="teacher-lesson-create__delete-button"
                            onClick={handleDelete}
                        >
                            <Trash2 size={24} />
                        </button>
                    </div>
                </form>
            </div>
            <ToastContainer />
        </main>
    );
};

export default TeacherLessonEditMain;

