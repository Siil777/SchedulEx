import React, { useState, useEffect } from 'react';
import SecondaryBtn from './btnAdd';

const Modal = ({ celldata, onClose, onSave }) => {
    const [day, setDay] = useState(celldata.day || '');
    const [date, setDate] = useState(celldata.date || '');
    const [time, setTime] = useState(celldata.time || '');
    const [place, setPlace] = useState(celldata.place || '');
    const [examiner, setExaminer] = useState(celldata.examiner || '');


    if (!celldata) return null;

    const handleSave = (e) => {
        e.preventDefault();
        const savedData = { day: celldata.day, date, time, place, examiner }
        console.log('Saved data', savedData);
        onSave(savedData);
    }



    return (
        <div className='modal-overlay custom-modal custom-modal-position'>
            <div className='modal-content custom-modal-height'>
                <button className='close-button' onClick={onClose}>
                    ×
                </button>
                <h4>Edit information</h4>
                <input
                    type='date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <input
                    className='mt-1'
                    type='time'
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
                <input
                    className='mt-1'
                    type='text'
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
                <input
                    className='mt-1'
                    type='text'
                    value={examiner}
                    onChange={(e) => setExaminer(e.target.value)}
                />
                <div className='d-flex justify-content-center'>
                    <SecondaryBtn onClick={handleSave} />
                </div>
            </div>
        </div>
    );
};

export default Modal;

