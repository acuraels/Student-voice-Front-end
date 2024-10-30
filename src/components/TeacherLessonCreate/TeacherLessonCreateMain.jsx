import React, { useState } from 'react';
import '../../styles/TeacherLessonCreate/teacherLessonCreateMain.css';
import { ChevronLeft, Copy, Download, Trash2 } from 'lucide-react';

const TeacherLessonCreateMain = () => {
    const [qrCode, setQrCode] = useState(null);

    const generateQR = (e) => {
        e.preventDefault();
        // Placeholder for QR code generation
        setQrCode('QR Code placeholder');
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

                <form className="teacher-lesson-create__form">
                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="institute">Институт</label>
                        <select id="institute" name="institute">
                            <option value="">Выберите институт</option>
                            {/* Add institute options here */}
                        </select>
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="teacherName">ФИО преподавателя</label>
                        <input type="text" id="teacherName" name="teacherName" value="Иван Иванов" readOnly />
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="discipline">Дисциплина</label>
                        <select id="discipline" name="discipline">
                            <option value="">Выберите дисциплину</option>
                            {/* Add discipline options here */}
                        </select>
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="topic">Тема</label>
                        <input type="text" id="topic" name="topic" placeholder="Тема пары" />
                    </div>

                    <div className="teacher-lesson-create__form-group">
                        <label htmlFor="location">Место проведения</label>
                        <input type="text" id="location" name="location" placeholder="Место" />
                    </div>

                    <div className="teacher-lesson-create__form-group teacher-lesson-create__time-group">
                        <div>
                            <label htmlFor="startTime">Начало</label>
                            <input type="time" id="startTime" name="startTime" />
                        </div>
                        <div>
                            <label htmlFor="endTime">Конец</label>
                            <input type="time" id="endTime" name="endTime" />
                        </div>
                    </div>

                    <div className="teacher-lesson-create__qr-section">
                        <div className="teacher-lesson-create__qr-container">
                            <button className="teacher-lesson-create__generate-qr" onClick={generateQR}>
                                Генерировать QR
                            </button>
                            {qrCode && <div className="teacher-lesson-create__qr-code">{qrCode}</div>}
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
                        <button type="submit" className="teacher-lesson-create__submit-button">Применить</button>
                        <button type="button" className="teacher-lesson-create__delete-button">
                            <Trash2 size={24} />
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
};

export default TeacherLessonCreateMain;