import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import '../../styles/TeacherLessonCreate/teacherLessonCreateMain.css';
import { ChevronLeft, Copy, Download, Trash2 } from 'lucide-react';

const TeacherLessonCreateMain = () => {
  const [qrCode, setQrCode] = useState(null);
  const [institutes, setInstitutes] = useState([]);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    topic: '',
    location: '',
    startTime: '',
    endTime: '',
    discipline: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch current user data
        const userResponse = await axiosInstance.get('/api/current-user/');
        const user = userResponse.data;
        setUserData(user);

        // Fetch institutes
        const institutesResponse = await axiosInstance.get('/api/institutes/');
        setInstitutes(institutesResponse.data);

        // Set default selected institute
        if (user.institute && user.institute.id) {
          setSelectedInstitute(user.institute.id);
        }

        // Fetch teacher's subjects
        const subjectsResponse = await axiosInstance.get('/api/teacher-subjects/');
        setSubjects(subjectsResponse.data);
      } catch (error) {
        console.error('Ошибка при загрузке данных:', error);
        // Handle error appropriately
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

  const generateQR = (e) => {
    e.preventDefault();
    // Implement QR code generation logic here
    setQrCode('QR Code placeholder');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post('/api/lessons/', {
        institute: selectedInstitute,
        discipline: formData.discipline,
        topic: formData.topic,
        location: formData.location,
        start_time: formData.startTime,
        end_time: formData.endTime,
      });
      // Handle success (e.g., redirect or show a success message)
    } catch (error) {
      console.error('Ошибка при отправке формы:', error);
      // Handle error appropriately
    }
  };

  return (
    <main className="teacher-lesson-create__main">
      <h1 className="teacher-lesson-create__title">Информация о паре</h1>

      <div className="teacher-lesson-create__container">
        <div className="teacher-lesson-create__header">
          <button className="teacher-lesson-create__back-button">
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
              <button
                className="teacher-lesson-create__generate-qr"
                onClick={generateQR}
              >
                Генерировать QR
              </button>
              {qrCode && (
                <div className="teacher-lesson-create__qr-code">
                  {qrCode}
                </div>
              )}
            </div>
            <div className="teacher-lesson-create__qr-actions">
              <button className="teacher-lesson-create__qr-action-button">
                <Download size={24} />
                Скачать
              </button>
              <button className="teacher-lesson-create__qr-action-button">
                <Copy size={24} />
                Ссылка
              </button>
              <button className="teacher-lesson-create__qr-action-button">
                Включить на 10 минут
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
            >
              <Trash2 size={24} />
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default TeacherLessonCreateMain;
