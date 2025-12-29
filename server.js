require('dotenv').config()
const app = require('./index.js');
const mongoose = require('mongoose');
const {PORT, DB_HOST} = process.env;

mongoose.connect(DB_HOST).then(()=>{
    app.listen(PORT || 3000);
    console.log(`Server works in Port ${PORT}`);
}).catch((error)=>console.log(error));
