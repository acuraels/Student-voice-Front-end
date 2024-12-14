import React, { useState, useEffect } from 'react';
import '../../styles/AdminReport/adminReportMain.css';
import { ChevronDown, X, Search, Download, ChevronLeft, Info } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const AdminReportMain = () => {
    const [institutes, setInstitutes] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [selectedInstitute, setSelectedInstitute] = useState('');
    const [selectedTeacher, setSelectedTeacher] = useState('');
    const [selectedSubject, setSelectedSubject] = useState('');

    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [ratingsData, setRatingsData] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [feedbackCount, setFeedbackCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedFeedback, setSelectedFeedback] = useState(null);

    const navigate = useNavigate();

    const pageSize = 5;
    const totalPages = Math.ceil(feedbackCount / pageSize);

    const clearFilter = (setter) => {
        setter('');
    };

    const fetchInstitutes = async () => {
        try {
            const response = await axiosInstance.get('/api/institutes/');
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении институтов:', error);
            return [];
        }
    };

    const fetchTeachersByInstitute = async (instituteId) => {
        try {
            const response = await axiosInstance.get(`/api/accounts/${instituteId}/list`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении преподавателей:', error);
            return [];
        }
    };

    const fetchSubjectsByTeacher = async (teacherId) => {
        try {
            const response = await axiosInstance.get(`/api/subjects/${teacherId}/list`);
            return response.data;
        } catch (error) {
            console.error('Ошибка при получении предметов:', error);
            return [];
        }
    };

    const fetchRatings = async (instituteId, teacherId, subjectId) => {
        const params = {};
        if (instituteId) params.institute_id = instituteId;
        if (teacherId) params.teacher_id = teacherId;
        if (subjectId) params.subject_id = subjectId;

        const response = await axiosInstance.get('/api/rating/search/', { params });
        return response.data;
    };

    const fetchFeedbacks = async (page = 1) => {
        const params = {};
        if (selectedInstitute) params.institute_id = selectedInstitute;
        if (selectedTeacher) params.teacher_id = selectedTeacher;
        if (selectedSubject) params.subject_id = selectedSubject;
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;
        params.page = page;

        const response = await axiosInstance.get('/api/feedback/list/', { params });
        setFeedbacks(response.data.results || []);
        setFeedbackCount(response.data.count || 0);
        setCurrentPage(page);
    };

    useEffect(() => {
        const loadInstitutes = async () => {
            const data = await fetchInstitutes();
            setInstitutes(data);
        };
        loadInstitutes();
    }, []);

    useEffect(() => {
        const loadTeachers = async () => {
            if (selectedInstitute) {
                const data = await fetchTeachersByInstitute(selectedInstitute);
                setTeachers(data);
                setSelectedTeacher('');
                setSubjects([]);
            }
        };
        loadTeachers();
    }, [selectedInstitute]);

    useEffect(() => {
        const loadSubjects = async () => {
            if (selectedTeacher) {
                const data = await fetchSubjectsByTeacher(selectedTeacher);
                setSubjects(data);
                setSelectedSubject('');
            }
        };
        loadSubjects();
    }, [selectedTeacher]);

    const handleBackClick = () => {
        navigate('/admin-users');
    };

    const handleSearch = async () => {
        const data = await fetchRatings(selectedInstitute, selectedTeacher, selectedSubject);
        setRatingsData(data);
        await fetchFeedbacks(1);
    };

    const renderStars = (rating) => {
        return Array(5).fill(0).map((_, index) => (
            <img
                key={index}
                src="/Star.svg"
                alt="Звезда"
                className={`admin-report__star ${index < rating ? 'admin-report__star--filled' : ''}`}
            />
        ));
    };

    const openFeedbackPopup = (feedback) => {
        setSelectedFeedback(feedback);
    };

    const closeFeedbackPopup = () => {
        setSelectedFeedback(null);
    };

    const handlePageClick = (pageNumber) => {
        fetchFeedbacks(pageNumber);
    };

    const handleDownload = async () => {
        const params = {};
        if (selectedInstitute) params.institute_id = selectedInstitute;
        if (selectedTeacher) params.teacher_id = selectedTeacher;
        if (selectedSubject) params.subject_id = selectedSubject;
        if (startDate) params.start_date = startDate;
        if (endDate) params.end_date = endDate;

        const response = await axiosInstance.get('/api/report/excel/', { params, responseType: 'blob' });
        const blob = new Blob([response.data], { type: response.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'report.xlsx';
        link.click();
    };

    return (
        <main className="admin-report__main">
            <h1 className="admin-report__title">Отчёт</h1>

            <div className="admin-report__container">
                <button className="admin-report__back-button" onClick={handleBackClick}>
                    <ChevronLeft size={24} />
                </button>

                <div className="admin-report__filters">
                    <div className="admin-report__filter-group">
                        {/* Институты */}
                        <div className="admin-report__filter">
                            {selectedInstitute && (
                                <button onClick={() => clearFilter(setSelectedInstitute)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={selectedInstitute}
                                onChange={(e) => setSelectedInstitute(e.target.value)}
                                className="admin-report__select"
                            >
                                <option value="">Выберите институт</option>
                                {institutes.map((institute) => (
                                    <option key={institute.id} value={institute.id}>
                                        {institute.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>

                        {/* Преподаватели */}
                        <div className="admin-report__filter">
                            {selectedTeacher && (
                                <button onClick={() => clearFilter(setSelectedTeacher)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={selectedTeacher}
                                onChange={(e) => setSelectedTeacher(e.target.value)}
                                className="admin-report__select"
                                disabled={!selectedInstitute}
                            >
                                <option value="">Выберите преподавателя</option>
                                {teachers.map((teacher) => (
                                    <option key={teacher.id} value={teacher.id}>
                                        {`${teacher.first_name} ${teacher.last_name}`}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>

                        {/* Предметы */}
                        <div className="admin-report__filter">
                            {selectedSubject && (
                                <button onClick={() => clearFilter(setSelectedSubject)} className="admin-report__clear-filter">
                                    <X size={18} />
                                </button>
                            )}
                            <select
                                value={selectedSubject}
                                onChange={(e) => setSelectedSubject(e.target.value)}
                                className="admin-report__select"
                                disabled={!selectedTeacher}
                            >
                                <option value="">Выберите предмет</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.id}>
                                        {subject.name}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="admin-report__select-icon" />
                        </div>
                    </div>

                    <div className="admin-report__date-filters">
                        <div className="admin-report__date-filter">
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="admin-report__date-input"
                            />
                        </div>
                        <div className="admin-report__date-filter">
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="admin-report__date-input"
                            />
                        </div>
                    </div>
                </div>

                <div className="admin-report__actions">
                    <button className="admin-report__action-btn admin-report__action-btn--search" onClick={handleSearch}>
                        <Search size={20} />
                        Поиск
                    </button>
                    <button className="admin-report__action-btn admin-report__action-btn--download" onClick={handleDownload}>
                        <Download size={20} />
                        Скачать отчёт
                    </button>
                </div>

                {ratingsData && (
                    <div className="admin-report__rates">
                        <h2 className="admin-report__section-title">Рейтинг</h2>
                        <div className="admin-report__rating-header">
                            <div className="admin-report__rating-score">
                                <img src="/Star.svg" alt="Рейтинг" className="admin-report__rating-star" />
                                <span className="admin-report__rating-number">
                                    {ratingsData.rating !== null ? ratingsData.rating.toFixed(1) : '-'}
                                </span>
                            </div>
                        </div>
                        <div className="admin-report__rating-table">
                            <div className="admin-report__rating-column admin-report__rating-column--high">
                                <div className="admin-report__rating-column-header">С наивысшей оценкой</div>
                                {ratingsData.top3 && ratingsData.top3.map((item, i) => (
                                    <div key={i} className="admin-report__rating-item">
                                        {item ? `${item.name} (${item.rating})` : 'Null'}
                                    </div>
                                ))}
                            </div>
                            <div className="admin-report__rating-column admin-report__rating-column--low">
                                <div className="admin-report__rating-column-header">С наименьшей оценкой</div>
                                {ratingsData.bottom3 && ratingsData.bottom3.map((item, i) => (
                                    <div key={i} className="admin-report__rating-item">
                                        {item ? `${item.name} (${item.rating})` : 'Null'}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <h2 className="admin-report__heading">Данные для выгрузки отчёта</h2>

                <div className="admin-report__table">
                    {feedbacks.map((fb) => (
                        <div key={fb.id} className="admin-report__table-row">
                            <div className="admin-report__table-cell">
                                <div className="admin-report__rating">{renderStars(Math.round(fb.rating || 0))}</div>
                                <div className="admin-report__lesson-name">{fb.lesson.topic}</div>
                                <div className="admin-report__teacher-name">{`${fb.lesson.teacher.first_name} ${fb.lesson.teacher.surname}`}</div>
                            </div>
                            <div className="admin-report__table-cell">{fb.lesson.institute.name}</div>
                            <div className="admin-report__table-cell">{fb.lesson.location}</div>
                            <div className="admin-report__table-cell">
                                <span className="admin-report__date">{new Date(fb.created_at).toLocaleDateString('ru-RU')}</span>
                                <span className="admin-report__time">{new Date(fb.created_at).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}</span>
                            </div>
                            <div className="admin-report__table-cell">
                                <button onClick={() => openFeedbackPopup(fb)} className="admin-report__info-btn">
                                    <Info size={20} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className="admin-report__pagination">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
                            <button
                                key={pageNumber}
                                className={`admin-report__pagination-btn ${pageNumber === currentPage ? 'active' : ''}`}
                                onClick={() => handlePageClick(pageNumber)}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                )}

                {selectedFeedback && (
                    <div className="admin-report__popup-overlay" onClick={closeFeedbackPopup}>
                        <div className="admin-report__popup" onClick={(e) => e.stopPropagation()}>
                            <button className="admin-report__popup-close" onClick={closeFeedbackPopup}><X size={20} /></button>
                            <h3>Отзыв</h3>
                            <p><strong>Студент:</strong> {selectedFeedback.student_name}</p>
                            <p><strong>Оценка:</strong> {selectedFeedback.rating}</p>
                            <p><strong>Комментарий:</strong> {selectedFeedback.comment || 'Нет комментария'}</p>
                            <p><strong>Praises:</strong> {selectedFeedback.praises && selectedFeedback.praises.join(', ')}</p>
                            <p><strong>Дата:</strong> {new Date(selectedFeedback.created_at).toLocaleString('ru-RU')}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
};

export default AdminReportMain;

