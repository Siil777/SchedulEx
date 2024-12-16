const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.urlencoded({extended: true}));

const allowedOrigin = ['http://localhost:3000']

app.use((req,res,next)=>{
    const origin = req.headers.origin;
    if(allowedOrigin.includes(origin)){
        res.setHeader('Access-Control-Allow-Origin',origin);
    }
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    res.header(
        'Access-Control-Allow-Methods',
        'GET, POST, DELETE, PUT, OPTIONS'
    )
    if(req.method==='OPTIONS'){
        return res.sendStatus(204);
    }
    next();
})








app.listen(port, ()=>console.log(`app running on port ${port}`));