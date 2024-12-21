import React, { useState, useEffect } from "react";
import Modal from "./modals";
import { PostExam } from './postEntry';

const Call = () => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calendarData, setCalendarData] = useState(() => {
        const savedData = localStorage.getItem('calendarData');
        return savedData ? JSON.parse(savedData) : {};
    });

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const times = ["10 am", "11 am", "03 pm", "05 pm", "07 pm"];

    const handleCellClick = (day, time) => {
        setSelectedCell({ day, time });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCell(null);
    };

    const saveData = async (activity) => {
        const cellKey = `${selectedCell.day}-${selectedCell.time}`;
        setCalendarData(prev => ({
            ...prev,
            [cellKey]: activity
        }));
        localStorage.setItem('calendarData', JSON.stringify({
            ...calendarData,
            [cellKey]: activity
        }));
        await PostExam(activity);
        closeModal();
    };

    return (
        <div>
            <div className="container">
                <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
                    <h2>Timetable</h2>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="schedule-table">
                            <table className="table bg-white">
                                <thead>
                                    <tr>
                                        <th>Routine</th>
                                        {times.map((time) => (
                                            <th key={time}>{time}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {days.map((day) => (
                                        <tr key={day}>
                                            <td className="day">{day}</td>
                                            {times.map((time) => {
                                                const cellKey = `${day}-${time}`;
                                                const activity = calendarData[cellKey];
                                                return (
                                                    <td
                                                        key={cellKey}
                                                        className="day custom-pointer"
                                                        onClick={() => handleCellClick(day, time)}
                                                    >
                                                        {activity ? (
                                                            <ul style={{ listStyleType: "none", padding: 0 }}>
                                                                {Object.entries(activity).map(([key, value]) => (
                                                                    <li key={key} style={{ margin: "4px 0" }}>
                                                                        <strong>{key}:</strong> {value}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        ) : (
                                                            <h4>Add Activity</h4>
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isModalOpen && selectedCell && (
                <Modal
                    celldata={selectedCell}
                    onSave={saveData}
                    onClose={closeModal}
                />
            )}
        </div>
    );
};

export default Call;





