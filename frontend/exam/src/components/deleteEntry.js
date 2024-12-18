import React, { useEffect, useState } from 'react';


const DeleteEntry = ({onDeleteSuccess}) => {
    const [del, setDel] = useState('');
        const handleDelete = async () => {
            if(!del){
                console.error('No such id');
                return;
            }
            try{
                const response = await fetch('http://localhost:5000/api/exams/delete/exam',{
                    method: 'DELETE',
                    headers: {
                        'Content-Type':'application/json'
                    },
                    body: JSON.stringify({id:del})
                });
                if(!response.ok){
                    throw new Error(`failed to delete ${response.status}`)
                }
                const result = await response.json();
                console.log('Delete result', result);

                if(onDeleteSuccess){
                    onDeleteSuccess(del);
                }

                setDel('');
            }catch(e){
                console.error(e);
            }
        };
        return(
            <div className='ms-3'>
                <input
                type='text'
                placeholder='enter id to delete'
                value={del}
                onChange={(e)=>setDel(e.target.value)} 
                />
                  <button className='btn btn-outline-danger ms-1' onClick={handleDelete}>Delete</button> 
            </div>
        )
    
}
export default DeleteEntry;