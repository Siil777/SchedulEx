
const {insert, getData, deleteData} = require('../models/models.js');


exports.createExam = async(req,res)=>{
    const {date,time,place,examiner} = req.body;
    try{
     const insertTask = await insert(date,time,place,examiner);
     if(insertTask){
        res.status(201).json({message: 'data has been sent',insertTask})
     }else{
        res.status(405).json({message: 'Mthod not allowed'})
     }

    }catch(error){
        console.error(error);
        res.status(500).json({message: 'Internal server error'});
    };
};
exports.getExam = async (req,res)=>{
    const {data} = req.body;
    const all = await getData(data);
    if(all){
        res.status(200).json(all);
    }else{
        res.status(400).json({message: 'data not found'});
    }
};
exports.deleteExam = async (req,res)=>{
    const {id} = req.body;
    try{
        const result = await deleteData(id);
        if(!result){
            res.status(404).json({message: 'Not found'});
        }else{
            res.status(200).json({message: 'Data deleted successfully!'});
        }
    }catch(e){
        console.error(e);
        res.status(500).json({message:'Internal server error'});
    }
};
