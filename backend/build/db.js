const {resolve} = require('path');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('examone.db',(err)=>{
    if(err){
        throw new Error('Database error: ' + err.message);

    }else{
        console.log('connection estabilished');
        db.run(`CREATE TABLE IF NOT EXISTS examone(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            date TEXT,
            time TEXT,
            place TEXT,
            examiner TEXT)`)
    }
});

async function insert(date,time,place,examiner) {
    return new Promise((resolve,reject)=>{
        db.run('INSERT INTO examone (date,time,place,examiner) VALUES (?,?,?,?)', [date,time,place,examiner], 
            function(err){
            if(err) return reject(err);
            console.log(`data is ${date},${time},${place},${examiner} data id is: ${this.lastID}`);
            resolve({id:this.lastID,data:{date,time,place,examiner}})
        });
    });
};

async function getData(data) {
    return new Promise((resolve,reject)=>{
        db.all('SELECT*FROM examone', (err,rows)=>{
            if(err) return reject(err);
            resolve(rows);
        })
    })
    
}

module.exports = {insert, getData};