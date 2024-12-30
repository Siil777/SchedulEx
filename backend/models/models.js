const {resolve} = require('path');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('examthree.db',(err)=>{
    if(err){
        throw new Error('Database error: ' + err.message);

    }else{
        console.log('connection estabilished');
        db.run(`CREATE TABLE IF NOT EXISTS examthree(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            day TEXT,
            date TEXT,
            time TEXT,
            place TEXT,
            examiner TEXT)`)
    }
});

async function insert(day,date,time,place,examiner) {
    return new Promise((resolve,reject)=>{
        /* const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dayIndex = new Date(date).getDay();
        const day = days[dayIndex]; */

        db.run('INSERT INTO examthree (day,date,time,place,examiner) VALUES (?,?,?,?,?)', [day,date,time,place,examiner], 
            function(err){
            if(err) return reject(err);
            console.log(`data is ${day},${date},${time},${place},${examiner} data id is: ${this.lastID}`);
            resolve({id:this.lastID,data:{day,date,time,place,examiner}});
        });
    });
};
async function deleteData(id) {
    return new Promise((resolve,reject)=>{
        const query = 'DELETE FROM examthree WHERE id = ?';
        db.run(query,[id],function(err){
            if(err){
                return reject(err);
            }
            resolve({message:'Data has been deleted', changes: this.changes});
        })
    })
}

async function getData(data) {
    return new Promise((resolve,reject)=>{
        db.all('SELECT*FROM examthree', (err,rows)=>{
            if(err) return reject(err);
            resolve(rows);
        })
    })
    
}

module.exports = {insert, getData, deleteData};