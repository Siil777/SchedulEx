const {resolve} = require('path');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('exam.db',(err)=>{
    if(err){
        throw new Error('Database error: ' + err.message);

    }else{
        console.log('connection estabilished');
        db.run(`CREATE TABLE IF NOT EXISTS exam(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time TEXT,
            place TEXT,
            examiner TEXT)`)
    }
});

async function insert(data) {
    return new Promise((resolve,reject)=>{
        db.run('INSERT INTO exam (time,place,examiner) VALUES (?,?,?)', [...data], 
            function(err){
            if(err) return reject(err);
            console.log(`data is ${data} data id is: ${this.lastID}`);
            resolve({id:this.lastID,data})
        });
    });
};

module.exports = {insert};