import React, {useState,useEffect} from 'react';
import { PostExam } from './postEntry';

const Modal = ({ celldata, onClose }) => {
    const [date, setDate] = useState(celldata.date || '');
    const [time, setTime] = useState(celldata.time || '');
    const [place, setPlace] = useState(celldata.place || '');
    const [examiner, setExaminer] = useState(celldata.examiner || '');


    if (!celldata) return null;

    const handleSave = (e) => {
        e.preventDefault();
        const savedData = {date,time,place,examiner}
        console.log('Saved data', savedData);
        PostExam(savedData);
    }


    return (
        <div className='modal-overlay custom-modal'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>
                    ×
                </button>
                <h4>Edit information</h4>
                <input 
                type='date'
                value={date}
                onChange={(e)=>setDate(e.target.value)}
                />
                 <input 
                type='time'
                value={time}
                onChange={(e)=>setTime(e.target.value)}
                />
                 <input 
                type='text'
                value={place}
                onChange={(e)=>setPlace(e.target.value)}
                />
                 <input 
                type='text'
                value={examiner}
                onChange={(e)=>setExaminer(e.target.value)}
                />
                <button className='btn btn-outline-green' onClick={handleSave}>
                    Save changes
                </button>
            </div>
        </div>
    );
};

export default Modal;

