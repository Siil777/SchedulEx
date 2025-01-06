import React, { useState, useEffect } from "react";
import Modal from "./modals";
import { PostExam } from './postEntry';
import BtnDelete from './btnDelete';

const Call = () => {
    const [selectedCell, setSelectedCell] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [calendarData, setCalendarData] = useState(() => {
        const savedData = localStorage.getItem('calendarData');
        console.log('Initial localStorage Data:', savedData);
        return savedData ? JSON.parse(savedData) : {};
    });

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const times = ["Node.js", "React.js", "HTML5", "SASS", "Gulp"];

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/api/exams/get/exam', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            if (!response.ok) {
                throw new Error(`fetch data error ${response.status}`)
            }
            const data = await response.json();
            const formattedData = {}

            data.forEach((activity) => {
                if (!activity.day) {
                    console.log('missing day in activity', activity);
                }
                const cellKey = `${activity.day}-${activity.time}`;
                formattedData[cellKey] = activity;
            });
            setCalendarData(formattedData);
        };
        fetchData();
    }, []);

    const prevCalendarData = React.useRef(calendarData)

    useEffect(() => {
        const savedData = localStorage.getItem('calendarData');
        if (savedData) {
            const parseData = JSON.parse(savedData);
            if (JSON.stringify(parseData) !== JSON.stringify(prevCalendarData.current)) {
                setCalendarData(parseData)
            }
        }
        prevCalendarData.current = calendarData;
    }, [calendarData]);

    const handleCellClick = (day, time) => {
        setSelectedCell({ day, time });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedCell(null);
    };

    const saveData = async (activity) => {
        console.log('Saving data', activity);
        const cellKey = `${selectedCell.day}-${selectedCell.time}`;
        const activityWithDay = { ...activity, day: selectedCell.day };

        setCalendarData(prev => ({
            ...prev,
            [cellKey]: activity
        }));

        const updatedData = {
            ...calendarData,
            [cellKey]: activity
        };

        console.log('Updating localStorage with:', updatedData);
        localStorage.setItem('calendarData', JSON.stringify(updatedData));

        const savedData = localStorage.getItem('calendarData');
        console.log('LocalStorage Data after save:', savedData);

        await PostExam(activityWithDay);
        closeModal();
    };
    /*     const handleDelete = (id) => {
            setCalendarData((prevData) => prevData.filter((item) => item.id !== id))
        } */
    const handleDelete = (keyToDelete) => {
        setCalendarData(prevData => {
            const newData = { ...prevData }
            delete newData[keyToDelete];
            localStorage.setItem('calendarData', JSON.stringify(newData));
            return newData;
        });
        alert(`${keyToDelete} removed`)
    }
    return (
        <div>
            <body className="is-grid">
                <div className="container">
                    <div className="w-95 w-md-75 w-lg-60 w-xl-55 mx-auto mb-6 text-center">
                        <h2>Exam table</h2>
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
                                                    return (
                                                        <td key={cellKey} onClick={() => handleCellClick(day, time)}>
                                                            <BtnDelete
                                                                onClick={() => handleDelete(cellKey)}
                                                            />
                                                            {calendarData[cellKey] ? (
                                                                <ul style={{ listStyleType: "none", padding: 0 }}>
                                                                    {Object.entries(calendarData[cellKey]).map(([key, value]) => (
                                                                        <li key={key} style={{ margin: "4px 0" }}>
                                                                            <strong>{key}:</strong> {value}

                                                                        </li>

                                                                    ))}

                                                                </ul>

                                                            ) : (
                                                                <p>Add activity</p>
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
            </body>
        </div>
    );
};

export default Call;