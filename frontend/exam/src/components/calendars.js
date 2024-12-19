import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CalendarForm = () => {
    const [selectDate, setSelecDate] = useState(new Date());
    const [formData, setFormData] = useState({
        time: '',
        place: '',
        examiner: '',
    });

    const handleDateChange = (date) => {
        setSelecDate(date);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]: value,
        }));
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            date: selectDate,
            ...formData,
        };
        console.log('Submitted data', data);
    }
    return(
        <div>
            <Calendar onChange={handleDateChange} value={selectDate} />
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Time:
                        <input
                        type='time'
                        name='time'
                        value={formData.time}
                        onChange={handleDateChange} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Place:
                        <input
                        type='text'
                        name='place'
                        value={formData.place}
                        onChange={handleDateChange} 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Examiner:
                        <input
                        type='text'
                        name='examiner'
                        value={formData.examiner}
                        onChange={handleDateChange} 
                        />
                    </label>
                </div>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}
export default CalendarForm;