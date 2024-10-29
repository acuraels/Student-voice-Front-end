import React, { useState } from 'react';
import '../../styles/TeacherDisciplineCreate/teacherDisciplineCreateMain.css';
import { ChevronLeft, Trash2, ChevronDown } from 'lucide-react';

const TeacherDisciplineCreateMain = () => {
    const [discipline, setDiscipline] = useState('');
    const [isShaking, setIsShaking] = useState(false);
    const [disciplines, setDisciplines] = useState(['Математика', 'Физика', 'Информатика']);
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        setIsShaking(true);
        setTimeout(() => setIsShaking(false), 820);
    };

    const handleInputChange = (e) => {
        setDiscipline(e.target.value);
    };

    const handleSelectOption = (option) => {
        setDiscipline(option);
        setIsOpen(false);
    };

    const handleAddDiscipline = () => {
        if (discipline && !disciplines.includes(discipline)) {
            setDisciplines([...disciplines, discipline]);
        }
    };

    return (
        <main className="teacher-discipline-create__main">
            <div className="teacher-discipline-create__main-container">
                <button className="teacher-discipline-create__back-btn">
                    <ChevronLeft size={24} />
                </button>
                <div className="teacher-discipline-create__content">
                    <div className="teacher-discipline-create__input-group">
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
                                    {disciplines.map((option, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleSelectOption(option)}
                                            className="teacher-discipline-create__option"
                                        >
                                            {option}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                    <div className="teacher-discipline-create__actions">
                        <button className="teacher-discipline-create__apply-btn" onClick={handleAddDiscipline}>Применить</button>
                        <button
                            className={`teacher-discipline-create__delete-btn ${isShaking ? 'shake' : ''}`}
                            onClick={handleDelete}
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