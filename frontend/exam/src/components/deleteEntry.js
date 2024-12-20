import React, { useEffect, useState } from 'react';


const DeleteEntry = ({id,onDeleteSuccess}) => {
        const handleDelete = async () => {
            try{
                const response = await fetch('http://localhost:5000/api/exams/delete/exam',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({id})
                });
                if(!response.ok){
                    throw new Error(`failed to delete ${response.status}`)
                }
                const result = await response.json();
                console.log('Delete result', result);

                if(onDeleteSuccess){
                    onDeleteSuccess(id);
                }

            }catch(e){
                console.error(e);
            }
        };
        return(
            <div className='ms-3'>        
                  <button className='btn btn-outline-danger ms-1' onClick={handleDelete}>Delete</button> 
            </div>
        )
    
}
export default DeleteEntry;