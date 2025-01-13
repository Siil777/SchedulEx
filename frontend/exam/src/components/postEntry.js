import React, { useState, useEffect } from "react";
import Calendar from "./calendars";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileTimePicker } from '@mui/x-date-pickers';

export const PostExam = async (newExam) => {
    try {
        const response = await fetch('https://tough-plain-thing.glitch.me/api/exams/post/exam', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExam)
        });
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`)
        };
        const result = await response.json();
        console.log('exam has been added', result);

    } catch (e) {
        console.error(e);
    }

}
const PostEntry = () => {
    const [day, setDay] = useState(null);
    const [time, setTime] = useState(null);
    const [date,setDate] = useState(new Date());
    const [place, setPlace] = useState('');
    const [examiner, setExaminer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(day && date && time && place && examiner){
            const formtedDate = date.toISOString().split('T')[0];
            const newExam = {date: formtedDate, time: time.format('HH:mm'), place, examiner }
            await PostExam(newExam);
            setDay(null);
            setTime(null);
            setDate('');
            setPlace('');
            setExaminer('');
        }else{
            console.log('all fields are requiered to fill');
        }
    };
    const inputStyle = {
        width: '300px',
        padding: '8px',
        margin: '8px 0',
        boxSizing: 'border-box'
    }
    return (
        <div className="d-flex justify-content-center mt-5">
            <form>
            <div className="form-group">
                    <Calendar
                        onChange={setDate}
                        value={date}
                    />
                </div>
            </form>
        </div >
    )
}
export default PostEntry;