import React, { useState, useEffect } from 'react';
import DeleteEntry from './deleteEntry';
const GetList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getEntry = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/exams/get/exam', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                if (!response.ok) {
                    throw new Error(`fetch error: ${response.status}`)
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error(error)
            }
        }
        getEntry();
    }, []);

    const handleDeleteSuccess = (deletedId) => {
        setData((prevData)=>prevData.filter((item)=>item.id !==deletedId))
    }
    const listStyle = {
        listStyleType: "none",
        padding: "10px",
        margin: "10px 30px 0 0",
        border: "1px solid #ccc",
        borderRadius: "5px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 5px rgba(0,0,0, 0.1)",
        fontFamily: 'cursive'
    }

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index} style={listStyle}>{Object.entries(item)
                        .map(([key, value]) => `${key}:${value}`)
                        .join(', ')}</li>
                ))}
            </ul>
        </div>
    )
}
export default GetList;