import * as React from 'react';


const Modal = ({ celldata, onClose }) => {
    if (!celldata) return null;

    const { date, time, place, examiner } = celldata;

    return (
        <div className='modal-overlay custom-modal'>
            <div className='modal-content'>
                <button className='close-button' onClick={onClose}>
                    ×
                </button>
                <h4>Edit information</h4>
                <p>
                    <strong>Date:</strong> {date}
                </p>
                <p>
                    <strong>Time:</strong> {time}
                </p>
                <p>
                    <strong>Place:</strong> {place}
                </p>
                <p>
                    <strong>Examiner:</strong> {examiner}
                </p>
                <button className='btn btn-outline-green' onClick={onClose}>
                    Save changes
                </button>
            </div>
        </div>
    );
};

export default Modal;

