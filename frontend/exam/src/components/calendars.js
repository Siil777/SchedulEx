import React, { useState } from "react";
import Modal from "./modals.js"; 

const Call = () => {
    const [selectedCell, setSelectedCell] = useState(null); 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [calendarData, setCalendarData] = useState({});

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

    const saveData = (activity) => {
        setCalendarData((prev) => ({
            ...prev,
            [`${selectedCell.day}-${selectedCell.time}`]: activity,
        }));
        closeModal();
    };

    return (
        <div>
            <div className="container">
                <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
                    <div className="subtitle alt-font">
                        <span className="text-primary">#04</span>
                        <span className="title">Timetable</span>
                    </div>
                    <h2 className="display-18 display-md-16 display-lg-14 mb-0">
                        Create and manage your own <span className="text-primary">#Timetable</span>
                    </h2>
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
                                            {times.map((time) => (
                                                <td
                                                    key={`${day}-${time}`}
                                                    className="day custom-pointer"
                                                    onClick={() => handleCellClick(day, time)}
                                                >
                                                    <h4>{calendarData[`${day}-${time}`] || "Add Activity"}</h4>
                                                </td>
                                            ))}
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


