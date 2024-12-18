import React, { useState, useEffect } from "react";

const PostExam = async (newExam) => {
    try {
        const response = await fetch('http://localhost:5000/post/exam', {
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
    const [time, setTime] = useState('');
    const [date,setDate] = useState('');
    const [place, setPlace] = useState('');
    const [examiner, setExaminer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(date && time && place && examiner){
            const newExam = {date, time, place, examiner }
            await PostExam(newExam);
            setTime('');
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
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
        
                    />
                </div>
                <div className="form-group">
                    <input className="mt-2"
                        type="time"
                        id="time"
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
        
                    />
                </div>
                <div className="form-group">
                    <input className="mt-2"
                        placeholder="class"
                        type="text"
                        id="place"
                        value={place}
                        onChange={(e) => setPlace(e.target.value)}
  
                    />
                </div>
                <div className="form-group">
                    <input className="mt-2"
                        placeholder="examiner"
                        type="text"
                        id="examiner"
                        value={examiner}
                        onChange={(e) => setExaminer(e.target.value)}
        
                    />
                </div>
                <button className="btn btn-outline-primary mt-2">Add</button>
            </form>
        </div >
    )
}
export default PostEntry;