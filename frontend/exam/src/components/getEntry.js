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

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{Object.entries(item)
                        .map(([key, value]) => `${key}:${value}`)
                        .join(', ')}</li>
                ))}
            </ul>
  {/*           <DeleteEntry onDeleteSuccess={handleDeleteSuccess}/> */}
        </div>
    )
}
export default GetList;