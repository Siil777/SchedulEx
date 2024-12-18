import React, { useState, useEffect } from 'react';
const GetList = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const getEntry = async () => {
            try {
                const response = await fetch('http://localhost:5000/get/data', {
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

    return (
        <div>
            <ul>
                {data.map((item, index) => (
                    <li key={index}>{Object.entries(item)
                        .map(([key, value]) => `${key}:${value}`)
                        .join(', ')}</li>
                ))}
            </ul>
        </div>
    )
}
export default GetList;