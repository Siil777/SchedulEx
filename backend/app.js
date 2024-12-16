const express = require('express');
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.urlencoded({extended: true}));








app.listen(port, ()=>console.log(`app running on port ${port}`));